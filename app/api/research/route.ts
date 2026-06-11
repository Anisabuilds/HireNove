import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "research.json");

function readDatabase(): Record<string, unknown>[] {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeDatabase(data: Record<string, unknown>[]) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

const questionLabels: Record<string, string> = {
  q1: "Most time-consuming tasks every week",
  q2: "What feels repetitive",
  q3: "What they wish someone else handled",
  q4: "Tasks that keep piling up",
  q5: "What recruiters complain about most",
  q6: "Where mistakes happen most",
  q7: "Processes that depend on memory",
  q8: "What happens at full capacity",
  q9: "What falls through the cracks",
  q10: "What keeps getting postponed",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, size, role, ...answers } = body;

    if (!email || !company) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const entry = {
      id: `res_${Date.now()}`,
      submittedAt: new Date().toISOString(),
      name, email, phone, company, size, role,
      answers,
    };

    // Save to local JSON file (works locally; on Vercel use KV or Supabase)
    try {
      const db = readDatabase();
      db.push(entry);
      writeDatabase(db);
    } catch {
      // On Vercel, filesystem writes fail silently — email is the source of truth
    }

    // Build the answers HTML block
    const answersHtml = Object.entries(answers)
      .filter(([, v]) => v && String(v).trim())
      .map(([k, v]) => `
        <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.06);">
          <p style="color: #A78BFA; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; margin: 0 0 6px;">${questionLabels[k] || k}</p>
          <p style="color: #ffffff; font-size: 14px; line-height: 1.6; margin: 0;">${String(v)}</p>
        </div>
      `).join("");

    const { error } = await resend.emails.send({
      from: "HireNove Research <noreply@hirenove.com>",
      to: "anisa@hirenove.com",
      replyTo: email,
      subject: `Research Response — ${name} @ ${company}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 620px; margin: 0 auto; background: #0B1628; color: #F8FAFC; padding: 40px; border-radius: 12px;">
          <div style="margin-bottom: 32px;">
            <h2 style="font-size: 22px; font-weight: 700; margin: 0 0 4px; color: #ffffff;">New Research Submission</h2>
            <p style="color: #A78BFA; font-size: 13px; margin: 0;">Help Us Learn · hirenove.com</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 24px; margin-bottom: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 7px 0; color: #ffffff60; font-size: 13px; width: 120px;">Name</td><td style="padding: 7px 0; color: #ffffff; font-size: 13px; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 7px 0; color: #ffffff60; font-size: 13px;">Role</td><td style="padding: 7px 0; color: #ffffff; font-size: 13px;">${role || "—"}</td></tr>
              <tr><td style="padding: 7px 0; color: #ffffff60; font-size: 13px;">Email</td><td style="padding: 7px 0; font-size: 13px;"><a href="mailto:${email}" style="color: #A78BFA;">${email}</a></td></tr>
              <tr><td style="padding: 7px 0; color: #ffffff60; font-size: 13px;">Phone</td><td style="padding: 7px 0; color: #ffffff; font-size: 13px;">${phone || "—"}</td></tr>
              <tr><td style="padding: 7px 0; color: #ffffff60; font-size: 13px;">Company</td><td style="padding: 7px 0; color: #ffffff; font-size: 13px; font-weight: 600;">${company}</td></tr>
              <tr><td style="padding: 7px 0; color: #ffffff60; font-size: 13px;">Team Size</td><td style="padding: 7px 0; color: #ffffff; font-size: 13px;">${size || "—"}</td></tr>
            </table>
          </div>

          ${answersHtml || '<p style="color: #ffffff40; font-size: 13px;">No answers provided.</p>'}

          <p style="color: #ffffff20; font-size: 11px; margin-top: 32px; text-align: center;">Submission ID: ${entry.id} · HireNove</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error (research):", error);
      // Still return success — entry is saved locally
    }

    return NextResponse.json({ success: true, id: entry.id });
  } catch (err) {
    console.error("Research route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const db = readDatabase();
  return NextResponse.json({ count: db.length, submissions: db });
}
