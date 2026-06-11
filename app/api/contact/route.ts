import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, size, problem, preferredContact } = body;

    if (!name || !email || !company) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "HireNove <noreply@hirenove.com>",
      to: "anisa@hirenove.com",
      replyTo: email,
      subject: `Discovery Call Request — ${name} @ ${company}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0B1628; color: #F8FAFC; padding: 40px; border-radius: 12px;">
          <div style="margin-bottom: 32px;">
            <h2 style="font-size: 22px; font-weight: 700; margin: 0 0 4px; color: #ffffff;">New Discovery Call Request</h2>
            <p style="color: #A78BFA; font-size: 13px; margin: 0;">Submitted via hirenove.com</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 24px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #ffffff80; font-size: 13px; width: 140px;">Name</td><td style="padding: 8px 0; color: #ffffff; font-size: 13px; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #ffffff80; font-size: 13px;">Email</td><td style="padding: 8px 0; color: #ffffff; font-size: 13px;"><a href="mailto:${email}" style="color: #A78BFA;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #ffffff80; font-size: 13px;">Phone</td><td style="padding: 8px 0; color: #ffffff; font-size: 13px;">${phone || "—"}</td></tr>
              <tr><td style="padding: 8px 0; color: #ffffff80; font-size: 13px;">Company</td><td style="padding: 8px 0; color: #ffffff; font-size: 13px; font-weight: 600;">${company}</td></tr>
              <tr><td style="padding: 8px 0; color: #ffffff80; font-size: 13px;">Team Size</td><td style="padding: 8px 0; color: #ffffff; font-size: 13px;">${size || "—"}</td></tr>
              <tr><td style="padding: 8px 0; color: #ffffff80; font-size: 13px;">Contact Via</td><td style="padding: 8px 0; color: #ffffff; font-size: 13px;">${preferredContact || "—"}</td></tr>
            </table>
          </div>

          ${problem ? `
          <div style="background: rgba(124,58,237,0.1); border: 1px solid rgba(167,139,250,0.2); border-radius: 8px; padding: 20px;">
            <p style="color: #A78BFA; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 8px;">Main Challenge</p>
            <p style="color: #ffffff; font-size: 14px; line-height: 1.6; margin: 0;">${problem}</p>
          </div>
          ` : ""}

          <p style="color: #ffffff30; font-size: 11px; margin-top: 32px; text-align: center;">HireNove · anisa@hirenove.com</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error (contact):", error);
      return NextResponse.json({ error: "Email failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
