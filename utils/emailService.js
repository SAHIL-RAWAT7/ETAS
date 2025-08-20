import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmailNotification = async (requestData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'hr@company.com',
      subject: `New Allowance Request from ${requestData.userName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Travel Allowance Request
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Employee Details</h3>
            <p><strong>Name:</strong> ${requestData.userName}</p>
            <p><strong>Email:</strong> ${requestData.userEmail}</p>
            <p><strong>Department:</strong> ${requestData.userDepartment}</p>
          </div>
          
          <div style="background-color: #e7f3ff; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Request Details</h3>
            <p><strong>Amount Requested:</strong> $${requestData.amount}</p>
            <p><strong>Description:</strong> ${requestData.description || 'No description provided'}</p>
            <p><strong>Date Submitted:</strong> ${new Date(requestData.date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> <span style="color: #ff9800; font-weight: bold;">Pending</span></p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #007bff; color: white; border-radius: 5px; text-align: center;">
            <p style="margin: 0;">Please review this request in the system dashboard.</p>
          </div>
          
          <div style="margin-top: 20px; text-align: center; color: #666; font-size: 12px;">
            <p>This is an automated notification from Employee Travel Allowance System</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

export const testEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log('Email server connection verified');
    return true;
  } catch (error) {
    console.error('Email server connection failed:', error);
    return false;
  }
};