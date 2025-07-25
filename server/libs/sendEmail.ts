import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();
// Ensure that the SendGrid API key is set in the environment variables
if (!process.env.SENDGRID_API_KEY) {    
    throw new Error("SENDGRID_API_KEY is not defined in environment variables");
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const fromEmail = process.env.SENDGRID_FROM_EMAIL || '';

export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        const msg = {
            to,
            from: fromEmail,
            subject,
            html,
        };
        await sgMail.send(msg);
        console.log(`Email sent to ${to}`);
        return { success: true, message: `Email sent to ${to}` };
    } catch (error) {
        console.error(`Error sending email to ${to}:`, error);
        throw new Error(`Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};