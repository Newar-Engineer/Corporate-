import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@newatech.com";

  await transporter.sendMail({
    from: `"Newa Tech Contact" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `New Contact Message: ${data.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, "<br>")}</p>
    `,
  });
}

export async function sendJobApplicationNotification(data: {
  name: string;
  email: string;
  phone?: string;
  jobTitle: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@newatech.com";

  await transporter.sendMail({
    from: `"Newa Tech Careers" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `New Job Application: ${data.jobTitle}`,
    html: `
      <h2>New Job Application Received</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
      <p><strong>Position:</strong> ${data.jobTitle}</p>
    `,
  });
}