// ✅ User booking received template
export const bookingReceivedTemplate = (booking) => `
  <div style="font-family: Arial, sans-serif; color:#333; padding:20px; border:1px solid #ddd; border-radius:10px; max-width:600px; margin:auto;">
    <h2 style="color:#28a745;">Hi ${booking.name},</h2>
    <p>🎉 Thank you for booking <b>${booking.packageName}</b> with us.</p>

    <div style="background:#f9f9f9; padding:15px; border-radius:8px; margin:15px 0;">
      <p>📌 <b>Package:</b> ${booking.packageName}</p>
      <p>👥 <b>Travelers:</b> ${booking.travelersCount}</p>
      <p>📅 <b>Date From:</b> ${booking.dateFrom}</p>
      <p>📅 <b>Date To:</b> ${booking.dateTo}</p>
      <p>🟢 <b>Status:</b> New</p>
      <p>📝 <b>Special Requests:</b> ${booking.specialRequests || "None"}</p>
    </div>

    <p style="font-size:14px; color:#555;">We will review your request and get back to you shortly.</p>
  </div>
`;

// Admin notification template
export const adminBookingTemplate = (booking) => `
  <div style="font-family: Arial, sans-serif; color:#333; padding:20px; border:1px solid #ddd; border-radius:10px; max-width:650px; margin:auto;">
    <h2 style="color:#0056b3;">📢 New Booking Created</h2>
    <p>A new booking has been submitted. Details below:</p>
    <table style="width:100%; border-collapse: collapse; font-size:14px;">
      <tr><td><b>Name</b></td><td>${booking.name}</td></tr>
      <tr><td><b>Email</b></td><td>${booking.email}</td></tr>
      <tr><td><b>Phone</b></td><td>${booking.phone}</td></tr>
      <tr><td><b>Package</b></td><td>${booking.packageName}</td></tr>
      <tr><td><b>Travelers</b></td><td>${booking.travelersCount}</td></tr>
      <tr><td><b>Date From</b></td><td>${booking.dateFrom}</td></tr>
      <tr><td><b>Date To</b></td><td>${booking.dateTo}</td></tr>
      <tr><td><b>Special Requests</b></td><td>${booking.specialRequests || "None"}</td></tr>
      <tr><td><b>Status</b></td><td>New</td></tr>
    </table>
  </div>
`;

//  Booking Status Update Template
export const bookingStatusUpdateTemplate = (booking, status, internalNotes) => `
  <div style="font-family: Arial, sans-serif; padding:20px; border:1px solid #ddd; border-radius:10px; max-width:600px; margin:auto;">
    <h2 style="color:#0056b3;">Booking Status Update</h2>
    <p>Hi <b>${booking.name}</b>,</p>
    <p>Your booking for <b>${booking.packageName}</b> has been updated.</p>

    <div style="background:#f9f9f9; padding:15px; border-radius:8px; margin:15px 0;">
      <p style="margin:6px 0;">📅 <b>Date From:</b> ${booking.dateFrom}</p>
      <p style="margin:6px 0;">📅 <b>Date To:</b> ${booking.dateTo}</p>
      <p style="margin:6px 0;">👥 <b>Travelers:</b> ${booking.travelersCount}</p>
      <p style="margin:6px 0;">📌 <b>Status:</b> <span style="color:green; font-weight:bold;">${status}</span></p>
      ${internalNotes ? `<p style="margin:6px 0;">📝 <b>Internal Notes:</b> ${internalNotes}</p>` : ""}
    </div>

    <p style="font-size:14px; color:#555;">We’ll keep you updated on the progress. Thank you for booking with us 💙</p>
  </div>
`;
//  Booking Confirmation Email Template
export const bookingConfirmationTemplate = ({
  customerName,
  packageName,
  status,
  dateFrom,
  dateTo,
  travelersCount,
  specialRequests
}) => `
  <div style="font-family: Arial, sans-serif; color:#333; padding:20px; border:1px solid #ddd; border-radius:10px; max-width:600px; margin:auto;">
    <h2 style="color:#28a745;">Hi ${customerName},</h2>
    <p>Your booking for <b>${packageName}</b> is now confirmed 🎉</p>

    <div style="background:#f9f9f9; padding:15px; border-radius:8px; margin:15px 0;">
      <p><b>Status:</b> ${status}</p>
      <p><b>Date From:</b> ${dateFrom}</p>
      <p><b>Date To:</b> ${dateTo}</p>
      <p><b>Travelers:</b> ${travelersCount}</p>
      <p><b>Special Requests:</b> ${specialRequests || "None"}</p>
    </div>

    <p style="font-size:14px; color:#555;">We’ll keep you updated about your trip. Thanks for choosing us 💙</p>
  </div>
`;
