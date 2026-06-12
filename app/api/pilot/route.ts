import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, company, email, role, bottleneck } = await req.json();

    if (!name || !company || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "noreply@hirenove.com",
      to: "anisa@hirenove.com",
      replyTo: email,
      subject: `Pilot Programme Application — ${company}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
          <div style="background:#071C2E;padding:32px 40px;">
            <p style="color:#a78bfa;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 8px;">Pilot Programme Application</p>
            <h1 style="color:#ffffff;font-size:22px;font-weight:700;margin:0;">${company}</h1>
          </div>
          <div style="padding:32px 40px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151;">
              <tr><td style="padding:8px 0;font-weight:600;color:#6b7280;width:130px;">Name</td><td style="padding:8px 0;">${name}</td></tr>
              <tr><td style="padding:8px 0;font-weight:600;color:#6b7280;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#0E7490;">${email}</a></td></tr>
              <tr><td style="padding:8px 0;font-weight:600;color:#6b7280;">Role</td><td style="padding:8px 0;">${role || "—"}</td></tr>
            </table>
            ${bottleneck ? `
            <div style="margin-top:20px;padding:16px;background:#f8f5ff;border-radius:8px;border-left:3px solid #0E7490;">
              <p style="font-size:11px;font-weight:700;color:#0E7490;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 6px;">Biggest bottleneck</p>
              <p style="font-size:14px;color:#374151;margin:0;line-height:1.6;">${bottleneck}</p>
            </div>` : ""}
            <div style="margin-top:28px;">
              <a href="mailto:${email}" style="display:inline-block;padding:12px 24px;background:#0E7490;color:#ffffff;font-weight:600;font-size:14px;border-radius:8px;text-decoration:none;">Reply to ${name}</a>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
