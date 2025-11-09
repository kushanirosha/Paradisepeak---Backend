// ✅ User booking received template (Professional)
export const bookingReceivedTemplate = (booking) => `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; color:#333; padding:32px 24px; border:1px solid #e2e8f0; border-radius:12px; max-width:600px; margin:20px auto; background:#ffffff; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
    <h2 style="margin:0 0 16px; color:#1a202c; font-size:24px;">Dear ${booking.name},</h2>
    <p style="margin:0 0 24px; font-size:16px; line-height:1.5;">
      Thank you for your booking request for <strong>${booking.packageName}</strong>. We have successfully received your submission.
    </p>

    <div style="background:#f7fafc; padding:20px; border-radius:10px; margin:24px 0; border:1px solid #e2e8f0;">
      <table style="width:100%; font-size:15px; line-height:1.6;">
        <tr><td style="padding:6px 0; color:#4a5568;"><strong>Package</strong></td><td>${booking.packageName}</td></tr>
        <tr><td style="padding:6px 0; color:#4a5568;"><strong>Number of Travelers</strong></td><td>${booking.travelersCount}</td></tr>
        <tr><td style="padding:6px 0; color:#4a5568;"><strong>Travel Period</strong></td><td>${booking.dateFrom} – ${booking.dateTo}</td></tr>
        <tr><td style="padding:6px 0; color:#4a5568;"><strong>Status</strong></td><td><span style="color:#28a745; font-weight:600;">Received</span></td></tr>
        <tr><td style="padding:6px 0; color:#4a5568; vertical-align:top;"><strong>Special Requests</strong></td><td>${booking.specialRequests || "None"}</td></tr>
      </table>
    </div>

    <p style="margin:24px 0 0; font-size:15px; color:#555555; line-height:1.5;">
      Our team is reviewing your request and will contact you within the next 24 hours to confirm availability and next steps.
    </p>
    <p style="margin:16px 0 0; font-size:15px; color:#555555;">
      We look forward to welcoming you on this journey.
    </p>
  </div>
`;

// Admin notification template (Professional)
export const adminBookingTemplate = (booking) => `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; color:#333; padding:32px 24px; border:1px solid #e2e8f0; border-radius:12px; max-width:650px; margin:20px auto; background:#ffffff; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
    <h2 style="margin:0 0 20px; color:#1a202c; font-size:22px; border-bottom:2px solid #3182ce; padding-bottom:8px;">New Booking Submission</h2>
    <p style="margin:0 0 24px; font-size:16px;">
      A new booking has been received. Please review the details below.
    </p>

    <table style="width:100%; border-collapse:collapse; font-size:15px; background:#f7fafc; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden;">
      <tr style="background:#edf2f7;"><th style="text-align:left; padding:12px 16px; color:#2d3748;">Field</th><th style="text-align:left; padding:12px 16px; color:#2d3748;">Details</th></tr>
      <tr><td style="padding:12px 16px; color:#4a5568; border-top:1px solid #e2e8f0;"><strong>Name</strong></td><td style="padding:12px 16px; border-top:1px solid #e2e8f0;">${booking.name}</td></tr>
      <tr><td style="padding:12px 16px; color:#4a5568; border-top:1px solid #e2e8f0;"><strong>Email</strong></td><td style="padding:12px 16px; border-top:1px solid #e2e8f0;">${booking.email}</td></tr>
      <tr><td style="padding:12px 16px; color:#4a5568; border-top:1px solid #e2e8f0;"><strong>Phone</strong></td><td style="padding:12px 16px; border-top:1px solid #e2e8f0;">${booking.phone}</td></tr>
      <tr><td style="padding:12px 16px; color:#4a5568; border-top:1px solid #e2e8f0;"><strong>Package</strong></td><td style="padding:12px 16px; border-top:1px solid #e2e8f0;">${booking.packageName}</td></tr>
      <tr><td style="padding:12px 16px; color:#4a5568; border-top:1px solid #e2e8f0;"><strong>Travelers</strong></td><td style="padding:12px 16px; border-top:1px solid #e2e8f0;">${booking.travelersCount}</td></tr>
      <tr><td style="padding:12px 16px; color:#4a5568; border-top:1px solid #e2e8f0;"><strong>Date From</strong></td><td style="padding:12px 16px; border-top:1px solid #e2e8f0;">${booking.dateFrom}</td></tr>
      <tr><td style="padding:12px 16px; color:#4a5568; border-top:1px solid #e2e8f0;"><strong>Date To</strong></td><td style="padding:12px 16px; border-top:1px solid #e2e8f0;">${booking.dateTo}</td></tr>
      <tr><td style="padding:12px 16px; color:#4a5568; border-top:1px solid #e2e8f0; vertical-align:top;"><strong>Special Requests</strong></td><td style="padding:12px 16px; border-top:1px solid #e2e8f0;">${booking.specialRequests || "None"}</td></tr>
      <tr><td style="padding:12px 16px; color:#4a5568; border-top:1px solid #e2e8f0;"><strong>Status</strong></td><td style="padding:12px 16px; border-top:1px solid #e2e8f0;"><span style="color:#3182ce; font-weight:600;">New</span></td></tr>
    </table>
  </div>
`;

// Booking Status Update Template (Professional)
export const bookingStatusUpdateTemplate = (booking, status, internalNotes) => `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; color:#333; padding:32px 24px; border:1px solid #e2e8f0; border-radius:12px; max-width:600px; margin:20px auto; background:#ffffff; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
    <h2 style="margin:0 0 16px; color:#1a202c; font-size:24px;">Booking Status Update</h2>
    <p style="margin:0 0 20px; font-size:16px; line-height:1.5;">
      Dear <strong>${booking.name}</strong>,
    </p>
    <p style="margin:0 0 24px; font-size:16px; line-height:1.5;">
      We are pleased to inform you that the status of your booking for <strong>${booking.packageName}</strong> has been updated.
    </p>

    <div style="background:#f7fafc; padding:20px; border-radius:10px; margin:24px 0; border:1px solid #e2e8f0;">
      <table style="width:100%; font-size:15px; line-height:1.6;">
        <tr><td style="padding:6px 0; color:#4a5568;"><strong>Travel Period</strong></td><td>${booking.dateFrom} – ${booking.dateTo}</td></tr>
        <tr><td style="padding:6px 0; color:#4a5568;"><strong>Travelers</strong></td><td>${booking.travelersCount}</td></tr>
        <tr><td style="padding:6px 0; color:#4a5568;"><strong>Current Status</strong></td><td><span style="color:#28a745; font-weight:600;">${status}</span></td></tr>
        ${internalNotes ? `<tr><td style="padding:6px 0; color:#4a5568; vertical-align:top;"><strong>Notes</strong></td><td>${internalNotes}</td></tr>` : ""}
      </table>
    </div>

    <p style="margin:24px 0 0; font-size:15px; color:#555555; line-height:1.5;">
      We will continue to keep you informed of any further updates. Thank you for choosing us.
    </p>
  </div>
`;

// Booking Confirmation Email Template (Professional)
export const bookingConfirmationTemplate = ({
  customerName,
  packageName,
  status,
  dateFrom,
  dateTo,
  travelersCount,
  specialRequests
}) => `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; color:#333; padding:32px 24px; border:1px solid #e2e8f0; border-radius:12px; max-width:600px; margin:20px auto; background:#ffffff; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
    <h2 style="margin:0 0 16px; color:#1a202c; font-size:24px;">Dear ${customerName},</h2>
    <p style="margin:0 0 24px; font-size:16px; line-height:1.5;">
      We are delighted to confirm your booking for <strong>${packageName}</strong>.
    </p>

    <div style="background:#f0fff4; padding:20px; border-radius:10px; margin:24px 0; border:1px solid #9ae6b4;">
      <table style="width:100%; font-size:15px; line-height:1.6;">
        <tr><td style="padding:6px 0; color:#2d3748;"><strong>Status</strong></td><td><span style="color:#28a745; font-weight:600;">${status}</span></td></tr>
        <tr><td style="padding:6px 0; color:#2d3748;"><strong>Travel Dates</strong></td><td>${dateFrom} – ${dateTo}</td></tr>
        <tr><td style="padding:6px 0; color:#2d3748;"><strong>Number of Travelers</strong></td><td>${travelersCount}</td></tr>
        <tr><td style="padding:6px 0; color:#2d3748; vertical-align:top;"><strong>Special Requests</strong></td><td>${specialRequests || "None"}</td></tr>
      </table>
    </div>

    <p style="margin:24px 0 0; font-size:15px; color:#555555; line-height:1.5;">
      Your reservation is now secured. You will receive a detailed itinerary and further instructions shortly.
    </p>
    <p style="margin:16px 0 0; font-size:15px; color:#555555;">
      We look forward to providing you with an exceptional travel experience.
    </p>
  </div>
`;