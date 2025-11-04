 const SubscriberTemplate = (email, verifyUrl,unsubscribeUrl) => `
       <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
      <h2>Hello ${email},</h2>
      <p>Thank you for subscribing to our newsletter!</p>

      <p>Please verify your email by clicking the link below:</p>
      <p>
      <a href="${verifyUrl}" target="_blank" style="
        display: inline-block;
        padding: 12px 24px;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      ">
       Verify Email
      </a>
    </p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

      <p>If you do not want to receive emails from us in the future, you can unsubscribe anytime:</p>
     <p>
      <a href="${unsubscribeUrl}" target="_blank" style="
        display: inline-block;
        padding: 12px 24px;
        background-color: red;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      ">
      Unsubscribe
      </a>
    </p>

      <p style="font-size: 12px; color: #999;">This is an automated email, please do not reply.</p>
    </div>
`;

export default SubscriberTemplate;