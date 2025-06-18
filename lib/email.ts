import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

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
    from: "SLANGO <admin@wemesgen.live>",
    to,
    subject,
    html: `<p>You have requested a password reset.</p>
              <p>${text}</p>
              <p>If you did not request this, please ignore this email.</p>`,
  });
};
