import { Resend } from "resend";

const resend = new Resend("re_iEewfb2d_CRrfUcYgDAr7Khbu8rK2FE4W");

export const sendEmail = async ({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) => {
  await resend.emails.send({
    from: "SLANGO <onboarding@resend.dev>", 
    to,
    subject,
    html: `<p>You have requested a password reset.</p>
              <p>${text}</p>
              <p>If you did not request this, please ignore this email.</p>`,
  });
};
