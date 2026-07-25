import nodemailer from 'nodemailer'

export async function POST(request) {
    try {
        const { name, email, subject, message, website } = await request.json()

        // Honeypot : les bots remplissent le champ caché, on répond OK sans envoyer
        if (website) {
            return Response.json({ success: true })
        }

        // Validate input (subject optionnel, défaut ci-dessous)
        if (!name || !email || !message) {
            return Response.json({ error: 'Tous les champs sont requis' }, { status: 400 })
        }
        const finalSubject = subject || 'Contact via danpm.com'

        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            throw new Error('SMTP_USER / SMTP_PASS manquants (variables d\'environnement non configurées)')
        }

        // Create transporter with SMTP settings for danpm.com
        // Default host/port match the OVH MX Plan SMTP relay (the mailbox behind danpm.com's MX records)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'ssl0.ovh.net',
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })

        // Email content
        const mailOptions = {
            from: `"CV Contact Form" <${process.env.SMTP_USER}>`,
            // Destinataires multiples via CONTACT_TO (séparés par des virgules),
            // ex : "dan@danpm.com, adresse-perso@..." — configuré en env, pas en dur (repo public)
            to: process.env.CONTACT_TO || 'dan@danpm.com',
            replyTo: email,
            subject: `[CV Contact] ${finalSubject}`,
            text: `
Nouveau message depuis le CV:

Nom: ${name}
Email: ${email}
Sujet: ${finalSubject}

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
      <td style="padding: 8px 0; color: #1e293b;">${finalSubject}</td>
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
