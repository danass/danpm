import nodemailer from 'nodemailer'

export async function POST(request) {
    try {
        const { name, email, subject, message } = await request.json()

        // Validate input
        if (!name || !email || !subject || !message) {
            return Response.json({ error: 'Tous les champs sont requis' }, { status: 400 })
        }

        // Create transporter with SMTP settings for danpm.com
        // Using common SMTP ports: 587 (TLS), 465 (SSL), or 25
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'mail.danpm.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        // Email content
        const mailOptions = {
            from: `"CV Contact Form" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER,
            replyTo: email,
            subject: `[CV Contact] ${subject}`,
            text: `
Nouveau message depuis le CV:

Nom: ${name}
Email: ${email}
Sujet: ${subject}

Message:
${message}
      `,
            html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Nouveau message depuis le CV</h2>
  <table style="width: 100%; margin-top: 20px;">
    <tr>
      <td style="padding: 8px 0; color: #64748b; width: 80px;"><strong>Nom:</strong></td>
      <td style="padding: 8px 0; color: #1e293b;">${name}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #64748b;"><strong>Email:</strong></td>
      <td style="padding: 8px 0; color: #1e293b;"><a href="mailto:${email}">${email}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #64748b;"><strong>Sujet:</strong></td>
      <td style="padding: 8px 0; color: #1e293b;">${subject}</td>
    </tr>
  </table>
  <div style="margin-top: 20px; padding: 20px; background: #f8fafc; border-radius: 8px;">
    <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
    <p style="margin: 10px 0 0; color: #1e293b; white-space: pre-wrap;">${message}</p>
  </div>
</div>
      `
        }

        // Send email
        await transporter.sendMail(mailOptions)

        return Response.json({ success: true, message: 'Email envoyé avec succès' })
    } catch (error) {
        console.error('Error sending email:', error)
        return Response.json({
            error: 'Erreur lors de l\'envoi de l\'email',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, { status: 500 })
    }
}
