// utils/mailTemplates.js
 const forgotPasswordTemplate = (name, resetLink) => `
  <h2>Hello ${name || "User"},</h2>
  <p>You requested a password reset. Click the link below to reset:</p>
    <p>
      <a href="${resetLink}" target="_blank" style="
        display: inline-block;
        padding: 12px 24px;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      ">
        Reset Password
      </a>
    </p>
  <p>This link will expire in 1 hour.</p>
  <p>If you didn’t request this, please ignore.</p>
`;

export default forgotPasswordTemplate;