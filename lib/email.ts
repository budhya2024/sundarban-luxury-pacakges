import nodemailer from "nodemailer";

export interface BookingEmailData {
  id: string;
  bookingCode: string;
  guestName: string;
  email: string;
  phone: string;
  packageOrRoom: string;
  type?: string;
  travelDate: string;
  guestsCount: number;
  totalAmount: number;
  paidAmount?: number;
  paymentStatus?: string;
  bookingStatus?: string;
  specialRequests?: string | null;
  createdAt?: string;
}

/**
 * Creates and returns a nodemailer transporter based on environment variables.
 * Returns null if required SMTP credentials are missing.
 */
function getEmailTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  // If using Gmail, nodemailer's built-in service definition handles all port/TLS configurations automatically
  if (host === "smtp.gmail.com" || user.toLowerCase().endsWith("@gmail.com")) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for port 465, false for 587 / other
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
  });
}

/**
 * Sends luxury-styled email notifications to both the Admin and the Guest upon booking request.
 */
export async function sendBookingNotificationEmails(booking: BookingEmailData): Promise<{
  success: boolean;
  adminSent: boolean;
  guestSent: boolean;
  warning?: string;
}> {
  try {
    const transporter = getEmailTransporter();

    if (!transporter) {
      console.warn(
        "[Nodemailer] SMTP credentials (SMTP_HOST, SMTP_USER, SMTP_PASS) not configured in env. Skipping email dispatch for booking:",
        booking.bookingCode
      );
      return {
        success: true,
        adminSent: false,
        guestSent: false,
        warning: "SMTP credentials not configured in environment.",
      };
    }

    const fromAddress =
      process.env.SMTP_FROM ||
      `"Sundarban Luxury Expeditions" <${process.env.SMTP_USER}>`;

    const adminRecipient =
      process.env.ADMIN_EMAIL ||
      process.env.ADMIN_NOTIFICATION_EMAIL ||
      process.env.SMTP_USER;

    const formattedAmount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(booking.totalAmount);

    const cleanPhoneDigits = booking.phone.replace(/[^0-9]/g, "");
    const guestWhatsappUrl = `https://wa.me/${cleanPhoneDigits.length === 10 ? "91" + cleanPhoneDigits : cleanPhoneDigits}?text=${encodeURIComponent(
      `Hello ${booking.guestName}, regarding your booking ${booking.bookingCode} with Sundarban Luxury Expeditions.`
    )}`;

    const conciergeHelpline = "+91 70014 03498";
    const conciergeWhatsappUrl = `https://wa.me/917001403498?text=${encodeURIComponent(
      `Hello Sundarban Concierge, I have a query regarding my booking reference: ${booking.bookingCode}`
    )}`;

    // -------------------------------------------------------------
    // 1. ADMIN NOTIFICATION EMAIL
    // -------------------------------------------------------------
    let adminSent = false;
    try {
      const adminHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking: ${booking.bookingCode}</title>
  <style>
    body, table, td, p, a, li, blockquote { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    @media only screen and (max-width: 620px) {
      .responsive-table { width: 100% !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .mobile-col { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <!-- Hidden inbox preview pre-header -->
  <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
    🚨 New Booking Alert: ${booking.guestName} has booked ${booking.packageOrRoom} for ${booking.travelDate}. Ref: ${booking.bookingCode}
  </div>

  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 35px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" class="responsive-table" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(11, 59, 36, 0.08); border: 1px solid #e2e8f0;">
          
          <!-- Top Accent Gold Bar -->
          <tr>
            <td style="background-color: #d4af37; height: 5px; line-height: 5px; font-size: 5px;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="background-color: #0b3b24; padding: 36px 40px 30px 40px; text-align: center;" class="mobile-padding">
              <div style="font-size: 10px; font-weight: 800; color: #fbbf24; text-transform: uppercase; letter-spacing: 2.5px; margin-bottom: 8px;">
                Operations Command Center &bull; Internal Alert
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 0.5px; line-height: 1.3;">
                SUNDARBAN LUXURY EXPEDITIONS
              </h1>
              <p style="color: #93c5fd; margin: 8px 0 0 0; font-size: 13px; font-weight: 500;">
                Direct Guest Reservation Alert
              </p>
            </td>
          </tr>

          <!-- Status & Reference Banner -->
          <tr>
            <td style="padding: 24px 40px 10px 40px;" class="mobile-padding">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #fefce8; border: 1px solid #fef08a; border-radius: 8px; padding: 16px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 800; color: #854d0e; text-transform: uppercase; letter-spacing: 1px;">
                      Reservation Reference
                    </div>
                    <div style="font-size: 24px; font-weight: 900; color: #713f12; font-family: 'Courier New', Courier, monospace; letter-spacing: 1px; margin-top: 4px;">
                      ${booking.bookingCode}
                    </div>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: #f59e0b; color: #ffffff; font-size: 11px; font-weight: 800; text-transform: uppercase; padding: 6px 12px; border-radius: 9999px; letter-spacing: 0.5px;">
                      PENDING CONFIRMATION
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Guest Details Section -->
          <tr>
            <td style="padding: 20px 40px 10px 40px;" class="mobile-padding">
              <h3 style="margin: 0 0 12px 0; font-size: 13px; font-weight: 800; text-transform: uppercase; color: #0b3b24; letter-spacing: 1px; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px;">
                Guest Contact Details
              </h3>
              <table width="100%" border="0" cellspacing="0" cellpadding="8" style="font-size: 13px; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="color: #64748b; width: 35%; font-weight: 600;">Primary Guest:</td>
                  <td style="color: #0f172a; font-weight: 800; font-size: 14px;">${booking.guestName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="color: #64748b; font-weight: 600;">Phone / WhatsApp:</td>
                  <td style="color: #0f172a; font-weight: 700;">
                    <a href="tel:${booking.phone}" style="color: #0284c7; text-decoration: none; font-weight: 700;">${booking.phone}</a>
                    &nbsp;&bull;&nbsp;
                    <a href="${guestWhatsappUrl}" target="_blank" style="color: #15803d; text-decoration: none; font-weight: 700;">Open WhatsApp &rarr;</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="color: #64748b; font-weight: 600;">Email Address:</td>
                  <td style="color: #0f172a;">
                    <a href="mailto:${booking.email}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${booking.email}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reservation Specs -->
          <tr>
            <td style="padding: 10px 40px 20px 40px;" class="mobile-padding">
              <h3 style="margin: 0 0 12px 0; font-size: 13px; font-weight: 800; text-transform: uppercase; color: #0b3b24; letter-spacing: 1px; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px;">
                Expedition Specifications
              </h3>
              <table width="100%" border="0" cellspacing="0" cellpadding="8" style="font-size: 13px; border-collapse: collapse; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="color: #64748b; width: 35%; font-weight: 600;">Package Reserved:</td>
                  <td style="color: #0b3b24; font-weight: 900; font-size: 14px;">${booking.packageOrRoom}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="color: #64748b; font-weight: 600;">Travel Date:</td>
                  <td style="color: #0f172a; font-weight: 800;">${booking.travelDate}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="color: #64748b; font-weight: 600;">Party Size:</td>
                  <td style="color: #0f172a; font-weight: 700;">${booking.guestsCount} Traveler(s)</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="color: #64748b; font-weight: 600;">Estimated Value:</td>
                  <td style="color: #16a34a; font-weight: 900; font-size: 16px;">${formattedAmount}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600; vertical-align: top;">Notes / Special:</td>
                  <td style="color: #475569; font-style: italic;">
                    ${booking.specialRequests || "No specific instructions provided."}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Action Buttons -->
          <tr>
            <td style="padding: 10px 40px 30px 40px; text-align: center;" class="mobile-padding">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || ""}/admin/bookings" 
                       style="display: inline-block; background-color: #0b3b24; color: #ffffff; text-decoration: none; padding: 13px 32px; border-radius: 6px; font-weight: 800; font-size: 13px; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(11, 59, 36, 0.25);">
                      Open Bookings Ledger
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #082818; padding: 22px 40px; text-align: center; color: #94a3b8; font-size: 11px; line-height: 1.6;" class="mobile-padding">
              <p style="margin: 0 0 4px 0; color: #cbd5e1; font-weight: 700;">
                Sundarban Luxury Packages Automated Ops Server
              </p>
              <p style="margin: 0;">
                This notification is sent automatically when a guest submits a reservation request on the website.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;

      const adminText = `
[SUNDARBAN LUXURY EXPEDITIONS - NEW BOOKING ALERT]
-----------------------------------------------------------
Booking Reference: ${booking.bookingCode}
Status: Pending Confirmation

GUEST DETAILS:
- Guest Name: ${booking.guestName}
- Phone: ${booking.phone}
- Email: ${booking.email}

RESERVATION DETAILS:
- Package: ${booking.packageOrRoom}
- Travel Date: ${booking.travelDate}
- Number of Guests: ${booking.guestsCount}
- Estimated Total: ${formattedAmount}
- Special Notes: ${booking.specialRequests || "None"}

Manage this booking in the Admin Ledger:
${process.env.NEXT_PUBLIC_APP_URL || ""}/admin/bookings
-----------------------------------------------------------
      `.trim();

      await transporter.sendMail({
        from: fromAddress,
        to: adminRecipient,
        subject: `🚨 New Reservation: ${booking.bookingCode} - ${booking.guestName} (${booking.packageOrRoom})`,
        text: adminText,
        html: adminHtml,
      });
      adminSent = true;
    } catch (adminErr) {
      console.error("[Nodemailer] Failed to send admin alert email:", adminErr);
    }

    // -------------------------------------------------------------
    // 2. GUEST CONFIRMATION EMAIL (High-End Luxury Template)
    // -------------------------------------------------------------
    let guestSent = false;
    try {
      const guestHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Reservation Request - Sundarban Luxury Expeditions</title>
  <style>
    body, table, td, p, a, li, blockquote { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    @media only screen and (max-width: 620px) {
      .responsive-table { width: 100% !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .mobile-col { display: block !important; width: 100% !important; }
      .button-stack { display: block !important; width: 100% !important; margin-bottom: 10px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <!-- Hidden inbox preview pre-header -->
  <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
    Namaste ${booking.guestName}, we have received your booking request for ${booking.packageOrRoom}. Reference: ${booking.bookingCode}.
  </div>

  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 35px 12px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" class="responsive-table" style="background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 12px 30px rgba(11, 59, 36, 0.08); border: 1px solid #e2e8f0;">
          
          <!-- Gold Luxury Trim -->
          <tr>
            <td style="background-color: #d4af37; height: 6px; line-height: 6px; font-size: 6px;">&nbsp;</td>
          </tr>

          <!-- Hero Brand Header -->
          <tr>
            <td style="background-color: #0b3b24; padding: 40px 40px 32px 40px; text-align: center;" class="mobile-padding">
              <div style="font-size: 11px; font-weight: 800; color: #d4af37; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 10px;">
                Royal Bengal Tiger Reserve &bull; Delta Safari
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 1px; line-height: 1.3;">
                SUNDARBAN LUXURY EXPEDITIONS
              </h1>
              <p style="color: #e2e8f0; margin: 10px auto 0 auto; font-size: 13px; max-width: 440px; line-height: 1.5;">
                Five-Star Cruise Comfort, Forest Naturalist Guides &amp; Authentic Bengali Delta Cuisine
              </p>
            </td>
          </tr>

          <!-- Welcome Salutation -->
          <tr>
            <td style="padding: 34px 40px 14px 40px;" class="mobile-padding">
              <h2 style="font-size: 20px; font-weight: 900; color: #0f172a; margin: 0 0 10px 0;">
                Namaste, ${booking.guestName}!
              </h2>
              <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0;">
                Thank you for selecting <strong>Sundarban Luxury Expeditions</strong>. We have received your safari reservation request. Our dedicated expedition desk has logged your tour preferences and is preparing your delta voyage itinerary.
              </p>
            </td>
          </tr>

          <!-- Booking Reference Card -->
          <tr>
            <td style="padding: 10px 40px 20px 40px;" class="mobile-padding">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f0fdf4; border: 1.5px solid #86efac; border-radius: 10px; padding: 18px 22px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 800; color: #166534; text-transform: uppercase; letter-spacing: 1.5px;">
                      Booking Reference Number
                    </div>
                    <div style="font-size: 26px; font-weight: 900; color: #0b3b24; font-family: 'Courier New', Courier, monospace; letter-spacing: 1.5px; margin-top: 4px;">
                      ${booking.bookingCode}
                    </div>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: #0b3b24; color: #d4af37; font-size: 11px; font-weight: 800; text-transform: uppercase; padding: 7px 14px; border-radius: 9999px; letter-spacing: 0.5px;">
                      ✓ REQUEST CONFIRMED
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reservation Details Table -->
          <tr>
            <td style="padding: 0 40px 24px 40px;" class="mobile-padding">
              <table width="100%" border="0" cellspacing="0" cellpadding="10" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 13px;">
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="color: #64748b; font-weight: 600; width: 36%;">Tour Package:</td>
                  <td style="color: #0b3b24; font-weight: 900; font-size: 14px;">${booking.packageOrRoom}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="color: #64748b; font-weight: 600;">Expedition Date:</td>
                  <td style="color: #0f172a; font-weight: 800;">${booking.travelDate}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="color: #64748b; font-weight: 600;">Number of Guests:</td>
                  <td style="color: #0f172a; font-weight: 700;">${booking.guestsCount} Traveler(s)</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="color: #64748b; font-weight: 600;">Total Package Fare:</td>
                  <td style="color: #0b3b24; font-weight: 900; font-size: 16px;">${formattedAmount}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="color: #64748b; font-weight: 600;">Payment Terms:</td>
                  <td style="color: #15803d; font-weight: 800;">
                    Zero Upfront &bull; Pay during pickup or boarding
                  </td>
                </tr>
                ${
                  booking.specialRequests
                    ? `
                <tr>
                  <td style="color: #64748b; font-weight: 600; vertical-align: top;">Your Notes:</td>
                  <td style="color: #334155; font-style: italic;">${booking.specialRequests}</td>
                </tr>`
                    : ""
                }
              </table>
            </td>
          </tr>

          <!-- Inclusions Highlights -->
          <tr>
            <td style="padding: 0 40px 24px 40px;" class="mobile-padding">
              <table width="100%" border="0" cellspacing="0" cellpadding="14" style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 10px;">
                <tr>
                  <td>
                    <div style="font-size: 12px; font-weight: 800; color: #6b21a8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                      ✦ What Is Included In Your Package:
                    </div>
                    <table width="100%" border="0" cellspacing="0" cellpadding="4" style="font-size: 12.5px; color: #4c1d95;">
                      <tr>
                        <td>&bull; Deluxe AC Boat Cruise with Upper Viewing Deck</td>
                        <td>&bull; Kolkata / Godkhali AC Pick &amp; Drop Transfer</td>
                      </tr>
                      <tr>
                        <td>&bull; Authentic Bengali 7-Course Gourmet Delta Feasts</td>
                        <td>&bull; Forest Dept. Entry Permits &amp; Camera Fees</td>
                      </tr>
                      <tr>
                        <td>&bull; Dedicated Govt. Certified Wildlife Naturalist</td>
                        <td>&bull; 24x7 Doctor on Call &amp; Emergency First Aid</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Next Steps Card -->
          <tr>
            <td style="padding: 0 40px 28px 40px;" class="mobile-padding">
              <div style="border-left: 4px solid #d4af37; background-color: #fffbeb; padding: 18px 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
                <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 800; color: #92400e;">
                  What Happens Next?
                </h4>
                <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #78350f;">
                  Our chief safari coordinator will call or WhatsApp you at <strong>${booking.phone}</strong> within 24 hours to confirm your pickup spot (Science City Kolkata or Godkhali), guide allocation, and dietary preferences.
                </p>
              </div>

              <!-- Assistance & Direct Actions -->
              <div style="text-align: center;">
                <p style="font-size: 13px; color: #64748b; margin: 0 0 16px 0; font-weight: 500;">
                  Have questions or want to customize your dates right now?
                </p>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center">
                      <a href="${conciergeWhatsappUrl}" target="_blank"
                         style="display: inline-block; background-color: #16a34a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 800; font-size: 13px; margin-right: 8px; margin-bottom: 8px;">
                        💬 Chat on WhatsApp
                      </a>
                      <a href="tel:+917001403498"
                         style="display: inline-block; background-color: #0b3b24; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 800; font-size: 13px; margin-bottom: 8px;">
                        📞 Call Helpline: +91 70014 03498
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0b3b24; padding: 28px 40px; text-align: center; color: #cbd5e1; font-size: 12px; line-height: 1.6;" class="mobile-padding">
              <p style="margin: 0 0 6px 0; color: #ffffff; font-weight: 800; font-size: 13px;">
                SUNDARBAN LUXURY EXPEDITIONS
              </p>
              <p style="margin: 0 0 10px 0; color: #d4af37; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700;">
                Wild Bengal Hospitality &bull; Pakhiralay, Gosaba, Sundarban, WB 743370
              </p>
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                Direct Safari Helpline: +91 70014 03498 &bull; reservations@sundarbanluxurypackages.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;

      const guestText = `
[SUNDARBAN LUXURY EXPEDITIONS - RESERVATION CONFIRMED]
-----------------------------------------------------------
Namaste ${booking.guestName},

Thank you for choosing Sundarban Luxury Expeditions!
We have received your reservation request.

RESERVATION DETAILS:
- Booking Reference: ${booking.bookingCode}
- Status: Confirmed & Pending Concierge Callback
- Package: ${booking.packageOrRoom}
- Travel Date: ${booking.travelDate}
- Number of Guests: ${booking.guestsCount} Traveler(s)
- Total Package Fare: ${formattedAmount}
- Payment Policy: Zero Upfront (Pay during pickup or boarding)
- Special Requests: ${booking.specialRequests || "None"}

WHAT HAPPENS NEXT:
Our chief expedition coordinator will call or WhatsApp you at ${booking.phone} within 24 hours to confirm pickup locations, guide allocations, and meal preferences.

24/7 SAFARI CONCIERGE HELPLINE:
Phone: +91 70014 03498
WhatsApp: https://wa.me/917001403498?text=BookingRef_${booking.bookingCode}

Sundarban Luxury Expeditions
Pakhiralay, Gosaba, Sundarban, West Bengal 743370
reservations@sundarbanluxurypackages.com
-----------------------------------------------------------
      `.trim();

      await transporter.sendMail({
        from: fromAddress,
        to: booking.email,
        subject: `🌿 Reservation Confirmed: ${booking.bookingCode} - Sundarban Luxury Expeditions`,
        text: guestText,
        html: guestHtml,
      });
      guestSent = true;
    } catch (guestErr) {
      console.error("[Nodemailer] Failed to send guest confirmation email:", guestErr);
    }

    return {
      success: true,
      adminSent,
      guestSent,
    };
  } catch (err: any) {
    console.error("[Nodemailer] Unexpected error in sendBookingNotificationEmails:", err);
    return {
      success: false,
      adminSent: false,
      guestSent: false,
      warning: err?.message || "Failed to dispatch email",
    };
  }
}

export interface HotelInquiryEmailData {
  id: string;
  refId: string;
  guestName: string;
  phone: string;
  email: string;
  packageName?: string;
  roomName: string;
  roomCode?: string;
  checkIn: string;
  checkOut?: string;
  nights: number;
  guestsCount: string;
  roomsCount: number;
  totalAmount: number;
  paidAmount?: number;
  paymentStatus?: string;
  status?: string;
  date?: string;
  specialRequests?: string | null;
}

/**
 * Sends hotel reservation request emails to Admin and Guest for Hotel Sonar Bangla.
 */
export async function sendHotelInquiryNotificationEmails(inquiry: HotelInquiryEmailData): Promise<{
  success: boolean;
  adminSent: boolean;
  guestSent: boolean;
  warning?: string;
}> {
  try {
    const transporter = getEmailTransporter();

    if (!transporter) {
      console.warn(
        "[Nodemailer] SMTP credentials missing. Skipping hotel email for ref:",
        inquiry.refId
      );
      return {
        success: true,
        adminSent: false,
        guestSent: false,
        warning: "SMTP credentials not configured in environment.",
      };
    }

    const fromAddress =
      process.env.SMTP_FROM ||
      `"Hotel Sonar Bangla &bull; Sundarban" <${process.env.SMTP_USER}>`;

    const adminRecipient =
      process.env.ADMIN_EMAIL ||
      process.env.ADMIN_NOTIFICATION_EMAIL ||
      process.env.SMTP_USER;

    const formattedAmount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(inquiry.totalAmount);

    const cleanPhoneDigits = inquiry.phone.replace(/[^0-9]/g, "");
    const guestWhatsappUrl = `https://wa.me/${cleanPhoneDigits.length === 10 ? "91" + cleanPhoneDigits : cleanPhoneDigits}?text=${encodeURIComponent(
      `Hello ${inquiry.guestName}, regarding your Hotel Sonar Bangla reservation inquiry ${inquiry.refId}.`
    )}`;

    const conciergeWhatsappUrl = `https://wa.me/917001403498?text=${encodeURIComponent(
      `Hello Hotel Sonar Bangla Concierge, I have a query regarding my booking reference: ${inquiry.refId}`
    )}`;

    // 1. ADMIN ALERT EMAIL
    let adminSent = false;
    try {
      const adminHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Hotel Booking: ${inquiry.refId}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 35px 12px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          <tr>
            <td style="background-color: #2563eb; height: 5px; line-height: 5px; font-size: 5px;">&nbsp;</td>
          </tr>
          <tr>
            <td style="background-color: #0f172a; padding: 32px 40px; text-align: center;">
              <div style="font-size: 10px; font-weight: 800; color: #60a5fa; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">
                Hotel Sonar Bangla &bull; Admin Booking Alert
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 0.5px;">
                NEW RESORT RESERVATION INQUIRY
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px 10px 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px 18px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 800; color: #1e40af; text-transform: uppercase; letter-spacing: 1px;">
                      Booking Reference
                    </div>
                    <div style="font-size: 22px; font-weight: 900; color: #1e3a8a; font-family: monospace; margin-top: 2px;">
                      ${inquiry.refId}
                    </div>
                  </td>
                  <td align="right">
                    <span style="background-color: #2563eb; color: #ffffff; font-size: 11px; font-weight: 800; text-transform: uppercase; padding: 6px 12px; border-radius: 9999px;">
                      ${inquiry.status || "PENDING"}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 40px;">
              <h3 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 800; text-transform: uppercase; color: #1e293b; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px;">
                Guest Information
              </h3>
              <table width="100%" border="0" cellspacing="0" cellpadding="6" style="font-size: 13px;">
                <tr><td style="color: #64748b; width: 35%; font-weight: 600;">Guest Name:</td><td style="color: #0f172a; font-weight: 700;">${inquiry.guestName}</td></tr>
                <tr><td style="color: #64748b; font-weight: 600;">Phone:</td><td><a href="tel:${inquiry.phone}" style="color: #0284c7; font-weight: 700;">${inquiry.phone}</a> &bull; <a href="${guestWhatsappUrl}" target="_blank" style="color: #16a34a; font-weight: 700;">WhatsApp &rarr;</a></td></tr>
                <tr><td style="color: #64748b; font-weight: 600;">Email:</td><td><a href="mailto:${inquiry.email}" style="color: #0284c7;">${inquiry.email}</a></td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 20px 40px;">
              <h3 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 800; text-transform: uppercase; color: #1e293b; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px;">
                Stay &amp; Package Specifications
              </h3>
              <table width="100%" border="0" cellspacing="0" cellpadding="8" style="font-size: 13px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                <tr><td style="color: #64748b; width: 35%; font-weight: 600;">Room / Suite:</td><td style="color: #0f172a; font-weight: 800;">${inquiry.roomName}</td></tr>
                ${inquiry.packageName ? `<tr><td style="color: #64748b; font-weight: 600;">Selected Package:</td><td style="color: #1e40af; font-weight: 700;">${inquiry.packageName}</td></tr>` : ""}
                <tr><td style="color: #64748b; font-weight: 600;">Stay Dates:</td><td style="color: #0f172a; font-weight: 700;">Check-in: ${inquiry.checkIn}${inquiry.checkOut ? ` &bull; Check-out: ${inquiry.checkOut}` : ""} (${inquiry.nights} Night${inquiry.nights > 1 ? "s" : ""})</td></tr>
                <tr><td style="color: #64748b; font-weight: 600;">Occupancy:</td><td style="color: #0f172a;">${inquiry.guestsCount} (${inquiry.roomsCount} Room${inquiry.roomsCount > 1 ? "s" : ""})</td></tr>
                <tr><td style="color: #64748b; font-weight: 600;">Estimated Tariff:</td><td style="color: #16a34a; font-weight: 900; font-size: 15px;">${formattedAmount}</td></tr>
                <tr><td style="color: #64748b; font-weight: 600;">Special Requests:</td><td style="color: #475569; font-style: italic;">${inquiry.specialRequests || "None provided"}</td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 40px 30px 40px; text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || ""}/admin/hotel" 
                 style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: 700; font-size: 13px;">
                Manage Inquiries in Admin Panel
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;

      const adminText = `
[HOTEL SONAR BANGLA - NEW INQUIRY ALERT]
Reference ID: ${inquiry.refId}
Guest: ${inquiry.guestName} (${inquiry.phone} / ${inquiry.email})
Room: ${inquiry.roomName}
Package: ${inquiry.packageName || "Standard Stay"}
Check-In: ${inquiry.checkIn} ${inquiry.checkOut ? `- Check-Out: ${inquiry.checkOut}` : ""}
Nights: ${inquiry.nights} | Guests: ${inquiry.guestsCount} | Rooms: ${inquiry.roomsCount}
Tariff: ${formattedAmount}
Special Requests: ${inquiry.specialRequests || "None"}

Manage in Admin: ${process.env.NEXT_PUBLIC_APP_URL || ""}/admin/hotel
      `.trim();

      await transporter.sendMail({
        from: fromAddress,
        to: adminRecipient,
        subject: `🏨 New Hotel Booking: ${inquiry.refId} - ${inquiry.guestName} (${inquiry.roomName})`,
        text: adminText,
        html: adminHtml,
      });
      adminSent = true;
    } catch (err) {
      console.error("[Nodemailer] Failed to send admin hotel alert:", err);
    }

    // 2. GUEST CONFIRMATION EMAIL
    let guestSent = false;
    try {
      const guestHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Hotel Sonar Bangla Reservation: ${inquiry.refId}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 35px 12px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          <tr>
            <td style="background-color: #d4af37; height: 5px; line-height: 5px; font-size: 5px;">&nbsp;</td>
          </tr>
          <tr>
            <td style="background-color: #0b3b24; padding: 36px 40px; text-align: center;">
              <div style="font-size: 11px; font-weight: 800; color: #d4af37; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">
                5-Star Luxury Delta Resort &bull; Sundarban
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 1px;">
                HOTEL SONAR BANGLA
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px 40px 10px 40px;">
              <h2 style="font-size: 18px; color: #0f172a; margin: 0 0 8px 0;">
                Namaste, ${inquiry.guestName}!
              </h2>
              <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0;">
                Thank you for choosing <strong>Hotel Sonar Bangla Sundarban</strong>. We have successfully received your luxury resort reservation inquiry.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 14px 18px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 800; color: #047857; text-transform: uppercase; letter-spacing: 1px;">
                      Booking Reference Number
                    </div>
                    <div style="font-size: 22px; font-weight: 900; color: #065f46; font-family: monospace; margin-top: 2px;">
                      ${inquiry.refId}
                    </div>
                  </td>
                  <td align="right">
                    <span style="background-color: #0b3b24; color: #d4af37; font-size: 11px; font-weight: 800; text-transform: uppercase; padding: 6px 12px; border-radius: 9999px;">
                      ✓ REQUEST RECEIVED
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 40px 20px 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="8" style="font-size: 13px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                <tr><td style="color: #64748b; width: 35%; font-weight: 600;">Room / Suite:</td><td style="color: #0b3b24; font-weight: 800;">${inquiry.roomName}</td></tr>
                ${inquiry.packageName ? `<tr><td style="color: #64748b; font-weight: 600;">Package Plan:</td><td style="color: #0f172a; font-weight: 700;">${inquiry.packageName}</td></tr>` : ""}
                <tr><td style="color: #64748b; font-weight: 600;">Check-In Date:</td><td style="color: #0f172a; font-weight: 700;">${inquiry.checkIn}${inquiry.checkOut ? ` to ${inquiry.checkOut}` : ""}</td></tr>
                <tr><td style="color: #64748b; font-weight: 600;">Travelers:</td><td style="color: #0f172a;">${inquiry.guestsCount} (${inquiry.roomsCount} Room${inquiry.roomsCount > 1 ? "s" : ""})</td></tr>
                <tr><td style="color: #64748b; font-weight: 600;">Estimated Tariff:</td><td style="color: #15803d; font-weight: 900; font-size: 15px;">${formattedAmount}</td></tr>
                <tr><td style="color: #64748b; font-weight: 600;">Payment Policy:</td><td style="color: #16a34a; font-weight: 700;">Zero Advance Required &bull; Pay at Check-In</td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 26px 40px;">
              <div style="background-color: #fffbeb; border-left: 3px solid #d4af37; padding: 14px 18px; margin-bottom: 20px;">
                <h4 style="margin: 0 0 4px 0; font-size: 13px; font-weight: 800; color: #92400e;">What Happens Next?</h4>
                <p style="margin: 0; font-size: 12.5px; line-height: 1.5; color: #78350f;">
                  Our resort reservation coordinator will call or WhatsApp you at <strong>${inquiry.phone}</strong> within 15 minutes to confirm room readiness and vehicle transfer options.
                </p>
              </div>
              <div style="text-align: center;">
                <a href="${conciergeWhatsappUrl}" target="_blank"
                   style="display: inline-block; background-color: #16a34a; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 6px; font-weight: 800; font-size: 12px; margin-right: 8px;">
                  💬 Chat on WhatsApp
                </a>
                <a href="tel:+917001403498"
                   style="display: inline-block; background-color: #0b3b24; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 6px; font-weight: 800; font-size: 12px;">
                  📞 24/7 Helpline: +91 70014 03498
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #0b3b24; padding: 20px 40px; text-align: center; color: #94a3b8; font-size: 11px;">
              <p style="margin: 0 0 4px 0; color: #ffffff; font-weight: 700;">Hotel Sonar Bangla &bull; Sundarban Luxury Packages</p>
              <p style="margin: 0;">Gosaba, Sundarban, West Bengal &bull; reservations@sundarbanluxurypackages.com</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;

      const guestText = `
[HOTEL SONAR BANGLA - RESERVATION RECEIVED]
Namaste ${inquiry.guestName},

Thank you for choosing Hotel Sonar Bangla Sundarban!
Reference Number: ${inquiry.refId}
Room: ${inquiry.roomName}
Dates: ${inquiry.checkIn} ${inquiry.checkOut ? `to ${inquiry.checkOut}` : ""}
Guests: ${inquiry.guestsCount} (${inquiry.roomsCount} Room)
Estimated Total: ${formattedAmount}
Payment: Zero Advance Required (Pay at check-in)

Our safari manager will contact you at ${inquiry.phone} within 15 minutes.
24/7 Helpline: +91 70014 03498
WhatsApp: https://wa.me/917001403498?text=HotelRef_${inquiry.refId}
      `.trim();

      await transporter.sendMail({
        from: fromAddress,
        to: inquiry.email,
        subject: `🏨 Reservation Received: ${inquiry.refId} - Hotel Sonar Bangla Sundarban`,
        text: guestText,
        html: guestHtml,
      });
      guestSent = true;
    } catch (err) {
      console.error("[Nodemailer] Failed to send guest hotel confirmation:", err);
    }

    return {
      success: true,
      adminSent,
      guestSent,
    };
  } catch (err: any) {
    console.error("[Nodemailer] Unexpected error in sendHotelInquiryNotificationEmails:", err);
    return {
      success: false,
      adminSent: false,
      guestSent: false,
      warning: err?.message || "Failed to dispatch email",
    };
  }
}

