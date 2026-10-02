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

  if (host === "smtp.gmail.com" || user.toLowerCase().endsWith("@gmail.com")) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
  });
}

/**
 * Helper to format date strings like "Sunday, August 11, 2026"
 */
function formatDateWithDay(dateStr?: string, defaultDaysOffset = 0): string {
  if (!dateStr) {
    const d = new Date();
    d.setDate(d.getDate() + defaultDaysOffset);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  try {
    if (dateStr.includes("-")) {
      const parts = dateStr.split("-").map(Number);
      if (parts.length === 3) {
        const [y, m, d] = parts;
        const dateObj = new Date(y, m - 1, d + defaultDaysOffset);
        return dateObj.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}

/**
 * Helper to format date in DD-MM-YYYY
 */
function formatShortDate(dateStr?: string): string {
  const d = dateStr ? new Date(dateStr) : new Date();
  if (isNaN(d.getTime())) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    return `${day}-${month}-${today.getFullYear()}`;
  }
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${day}-${month}-${d.getFullYear()}`;
}

/**
 * Sends professional email notifications to Admin and Guest for tour package bookings.
 * Features a dark header banner with crisp white text, zero icons/emojis, and clean structure.
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
        "[Nodemailer] SMTP credentials missing. Skipping email dispatch for booking:",
        booking.bookingCode
      );
      return {
        success: true,
        adminSent: false,
        guestSent: false,
        warning: "SMTP credentials not configured in environment.",
      };
    }

    const websiteName = "Sundarban Luxury Expeditions";
    const websiteDomain = process.env.NEXT_PUBLIC_APP_URL || "https://sundarbanluxury.com";
    const fromAddress =
      process.env.SMTP_FROM || `"${websiteName}" <${process.env.SMTP_USER}>`;
    const adminRecipient =
      process.env.ADMIN_EMAIL ||
      process.env.ADMIN_NOTIFICATION_EMAIL ||
      process.env.SMTP_USER;

    const formattedAmount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(booking.totalAmount || 4999);

    const checkInFormatted = formatDateWithDay(booking.travelDate, 0);
    const bookingDateFormatted = formatShortDate(booking.createdAt);
    const cleanPhoneDigits = booking.phone.replace(/[^0-9]/g, "");
    const guestWhatsappUrl = `https://wa.me/${cleanPhoneDigits.length === 10 ? "91" + cleanPhoneDigits : cleanPhoneDigits
      }?text=${encodeURIComponent(
        `Hello ${booking.guestName}, regarding your safari booking with ${websiteName}.`
      )}`;

    // -------------------------------------------------------------
    // 1. ADMIN NOTIFICATION EMAIL (Dark Header, White Text, No Icons)
    // -------------------------------------------------------------
    let adminSent = false;
    try {
      const adminHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Booking Alert: ${booking.bookingCode}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: Arial, Helvetica, sans-serif; color: #0f172a;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 15px 10px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #cbd5e1; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
          <!-- Top Dark Header Banner with White Text -->
          <tr>
            <td style="background-color: #0b3b24; border-top: 4px solid #d4af37; padding: 15px 20px; text-align: center;">
              <div style="font-size: 9px; font-weight: bold; color: #d4af37; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">
                ADMIN NOTIFICATION &bull; ${websiteName}
              </div>
              <h1 style="margin: 0; font-size: 15px; font-weight: bold; color: #ffffff; letter-spacing: 1px;">
                NEW GUEST SAFARI BOOKING
              </h1>
              <div style="font-size: 9px; color: #e2e8f0; margin-top: 6px;">
                Booking Code: ${booking.bookingCode}
              </div>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 15px 20px;">
              <!-- Reference Box -->
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 10px 15px; margin-bottom: 22px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <div style="font-size: 9px; font-weight: bold; color: #166534; text-transform: uppercase; letter-spacing: 1px;">
                        BOOKING REFERENCE NUMBER
                      </div>
                      <div style="font-size: 15px; font-weight: bold; color: #14532d; font-family: monospace; margin-top: 2px;">
                        ${booking.bookingCode}
                      </div>
                    </td>
                    <td align="right">
                      <span style="display: inline-block; background-color: #14532d; color: #ffffff; font-size: 9px; font-weight: bold; padding: 6px 14px; border-radius: 4px;">
                        NEW REQUEST
                      </span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Reservation Overview Table -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 12px 0; font-size: 9px; font-weight: bold; color: #0f172a; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                  Reservation Details
                </h3>
                <table width="100%" border="0" cellspacing="0" cellpadding="4" style="font-size: 9px;">
                  <tr><td style="color: #64748b; width: 38%; font-weight: bold;">Tour Package:</td><td style="color: #0f172a; font-weight: bold;">${booking.packageOrRoom}</td></tr>
                  <tr><td style="color: #64748b; font-weight: bold;">Expedition Date:</td><td style="color: #0f172a; font-weight: bold;">${checkInFormatted}</td></tr>
                  <tr><td style="color: #64748b; font-weight: bold;">Guest Name:</td><td style="color: #0f172a; font-weight: bold;">${booking.guestName}</td></tr>
                  <tr><td style="color: #64748b; font-weight: bold;">Phone Number:</td><td style="color: #0f172a; font-weight: bold;">${booking.phone}</td></tr>
                  <tr><td style="color: #64748b; font-weight: bold;">Email Address:</td><td><a href="mailto:${booking.email}" style="color: #2563eb; text-decoration: none;">${booking.email}</a></td></tr>
                  <tr><td style="color: #64748b; font-weight: bold;">Number of Guests:</td><td style="color: #0f172a; font-weight: bold;">${booking.guestsCount} Traveler(s)</td></tr>
                  <tr><td style="color: #64748b; font-weight: bold;">Total Package Fare:</td><td style="color: #14532d; font-weight: bold; font-size: 9px;">${formattedAmount}</td></tr>
                  <tr><td style="color: #64748b; font-weight: bold;">Booking Date:</td><td style="color: #334155;">${bookingDateFormatted}</td></tr>
                </table>
              </div>

              <!-- Admin Action CTA -->
              <div style="text-align: center;">
                <a href="${websiteDomain}/admin/bookings" style="display: inline-block; background-color: #0b3b24; color: #ffffff; text-decoration: none; padding: 12px 26px; font-weight: bold; font-size: 9px; border-radius: 4px; text-transform: uppercase;">
                  Open Admin Dashboard
                </a>
              </div>
            </td>
          </tr>

          <!-- Dark Footer Banner with White Text -->
          <tr>
            <td style="background-color: #0b3b24; padding: 15px 20px; text-align: center; color: #ffffff; font-size: 9px;">
              <div style="font-weight: bold; color: #ffffff;">${websiteName}</div>
              <div style="margin-top: 4px; color: #cbd5e1;">System Generated Admin Notification &bull; ${websiteDomain}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;

      await transporter.sendMail({
        from: fromAddress,
        to: adminRecipient,
        subject: `New Booking: ${booking.bookingCode} - ${booking.guestName} (${booking.packageOrRoom})`,
        text: `New booking ${booking.bookingCode} received from ${booking.guestName} (${booking.phone}).`,
        html: adminHtml,
      });
      adminSent = true;
    } catch (adminErr) {
      console.error("[Nodemailer] Failed to send admin notification email:", adminErr);
    }

    // -------------------------------------------------------------
    // 2. CLIENT CONFIRMATION RECEIPT EMAIL (Dark Header, White Text, No Icons)
    // -------------------------------------------------------------
    let guestSent = false;
    try {
      const guestHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Booking Confirmation - ${websiteName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: Arial, Helvetica, sans-serif; color: #0f172a;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 15px 10px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #cbd5e1; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
          
          <!-- Dark Header Banner with White Text -->
          <tr>
            <td style="background-color: #0b3b24;  padding: 15px 20px; text-align: center;">
              <div style="font-size: 9px; font-weight: bold; color: #d4af37; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">
                ROYAL BENGAL TIGER RESERVE &bull; DELTA SAFARI
              </div>
              <h1 style="margin: 0; font-size: 15px; font-weight: bold; color: #ffffff; letter-spacing: 1px;">
                SUNDARBAN LUXURY EXPEDITIONS
              </h1>
              <div style="font-size: 9px; color: #e2e8f0; margin-top: 6px; line-height: 1.4;">
                Five-Star Cruise Comfort, Forest Naturalist Guides &amp; Authentic Bengali Delta Cuisine
              </div>
            </td>
          </tr>

          <!-- Main Body Container -->
          <tr>
            <td style="padding: 15px 20px;">

              <!-- Greeting & Thank You -->
              <h2 style="margin: 0 0 10px 0; font-size: 15px; font-weight: bold; color: #0f172a;">
                Hi, ${booking.guestName}!
              </h2>
              <p style="margin: 0 0 20px 0; font-size: 9px; color: #475569; line-height: 1.6;">
                Thank you for selecting <strong style="color: #0f172a;">Sundarban Luxury Expeditions</strong>. We have received your safari reservation request. Our dedicated expedition desk has logged your tour preferences, and is preparing your delta voyage itinerary.
              </p>


              <!-- Main Details Box -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px 15px; margin-bottom: 22px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="4" style="font-size: 9px;">
                  <tr>
                    <td style="color: #64748b; width: 38%; font-weight: bold;">Tour Package:</td>
                    <td style="color: #0f172a; font-weight: bold;">${booking.packageOrRoom}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-weight: bold;">Expedition Date:</td>
                    <td style="color: #0f172a; font-weight: bold;">${checkInFormatted}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-weight: bold;">Number of Guests:</td>
                    <td style="color: #0f172a; font-weight: bold;">${booking.guestsCount} Traveler(s)</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-weight: bold;">Total Package Fare:</td>
                    <td style="color: #14532d; font-weight: bold; font-size: 9px;">${formattedAmount}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-weight: bold;">Payment Terms:</td>
                    <td style="color: #15803d; font-weight: bold;">Zero Upfront : Pay during pickup or boarding</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-weight: bold;">Your Notes:</td>
                    <td style="color: #334155; font-style: italic;">
                      ${booking.specialRequests ? booking.specialRequests : `Direct safari reservation request for ${booking.packageOrRoom}.`}
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Included In Package Box (No Icons, Plain Text Bullets) -->
              <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 6px; padding: 12px 15px; margin-bottom: 22px;">
                <div style="font-size: 9px; font-weight: bold; color: #6b21a8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
                  WHAT IS INCLUDED IN YOUR PACKAGE:
                </div>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; color: #581c87; line-height: 1.8;">
                  <tr>
                    <td width="50%" valign="top">
                      - Deluxe AC Boat Cruise with Upper Viewing Deck<br>
                      - Authentic Bengali 7-Course Gourmet Delta Feast<br>
                      - Dedicated Govt. Certified Wildlife Naturalist
                    </td>
                    <td width="50%" valign="top">
                      - Kolkata / Godkhali AC Pick &amp; Drop Transfer<br>
                      - Forest Dept. Entry Permits &amp; Camera Fees<br>
                      - 24x7 Doctor on Call &amp; Emergency First Aid
                    </td>
                  </tr>
                </table>
              </div>

              <!-- What Happens Next Box (Yellow/Amber Theme, No Icons) -->
              <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px; padding: 10px 15px; margin-bottom: 24px;">
                <div style="font-size: 9px; font-weight: bold; color: #92400e; margin-bottom: 4px;">
                  What Happens Next?
                </div>
                <div style="font-size: 9px; color: #78350f; line-height: 1.5;">
                  Our chief safari coordinator will call or WhatsApp you at <strong style="color: #92400e;">${booking.phone}</strong> within 24 hours to confirm your pickup spot (Science City Kolkata or Godkhali), guide allocation, and dietary preferences.
                </div>
              </div>

              <!-- Action Buttons (No Icons) -->
              <div style="text-align: center; margin-bottom: 10px;">
                <div style="font-size: 9px; color: #475569; margin-bottom: 14px;">
                  Have questions or want to customize your dates right now?
                </div>
                <table border="0" cellspacing="0" cellpadding="0" align="center">
                  <tr>
                    <td style="padding-right: 8px;">
                      <a href="https://wa.me/917001403498" style="display: inline-block; background-color: #16a34a; color: #ffffff; text-decoration: none; padding: 11px 20px; font-weight: bold; font-size: 9px; border-radius: 4px;">
                        Chat on WhatsApp
                      </a>
                    </td>
                    <td style="padding-left: 8px;">
                      <a href="tel:+917001403498" style="display: inline-block; background-color: #0b3b24; color: #ffffff; text-decoration: none; padding: 11px 20px; font-weight: bold; font-size: 9px; border-radius: 4px;">
                        Call Helpline: +91 70014 03498
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

            </td>
          </tr>

          <!-- Dark Footer Banner with White Text -->
          <tr>
            <td style="background-color: #0b3b24; padding: 15px 20px; text-align: center; color: #ffffff;">
              <div style="font-size: 9px; font-weight: bold; letter-spacing: 1px; color: #ffffff;">
                SUNDARBAN LUXURY EXPEDITIONS
              </div>
              <div style="font-size: 9px; color: #e2e8f0; margin-top: 4px; letter-spacing: 0.5px;">
                WILD BENGAL HOSPITALITY &bull; PAKHIRALAY, GOSABA, SUNDARBAN, WB 743370
              </div>
              <div style="font-size: 9px; color: #cbd5e1; margin-top: 12px; border-top: 1px solid #14532d; padding-top: 12px;">
                Direct Safari Helpline: <a href="tel:+917001403498" style="color: #ffffff; text-decoration: none; font-weight: bold;">+91 70014 03498</a> | <a href="mailto:sundarbanluxurypackage@gmail.com" style="color: #ffffff; text-decoration: none; font-weight: bold;">sundarbanluxurypackage@gmail.com</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;

      await transporter.sendMail({
        from: fromAddress,
        to: booking.email,
        subject: `Booking Confirmed - ${websiteName}`,
        text: `Namaste ${booking.guestName}, your booking for ${booking.packageOrRoom} is confirmed!`,
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

/**
 * Sends hotel reservation request emails to Admin and Guest for Hotel Sonar Bangla.
 * Features dark header banner with crisp white text, zero icons/emojis, and clean structure.
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

    const websiteName = "Hotel Sonar Bangla & Resort";
    const websiteDomain = process.env.NEXT_PUBLIC_APP_URL || "https://sundarbanluxury.com";
    const fromAddress =
      process.env.SMTP_FROM || `"${websiteName}" <${process.env.SMTP_USER}>`;
    const adminRecipient =
      process.env.ADMIN_EMAIL ||
      process.env.ADMIN_NOTIFICATION_EMAIL ||
      process.env.SMTP_USER;

    const formattedAmount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(inquiry.totalAmount || 5999);

    const checkInFormatted = formatDateWithDay(inquiry.checkIn, 0);
    const checkOutFormatted = inquiry.checkOut
      ? formatDateWithDay(inquiry.checkOut, 0)
      : formatDateWithDay(inquiry.checkIn, inquiry.nights || 2);

    // -------------------------------------------------------------
    // 1. ADMIN ALERT EMAIL (Dark Header, White Text, No Icons)
    // -------------------------------------------------------------
    let adminSent = false;
    try {
      const adminHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Hotel Booking Alert: ${inquiry.refId}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: Arial, Helvetica, sans-serif; color: #0f172a;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 15px 10px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #cbd5e1; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
          <!-- Top Dark Header Banner with White Text -->
          <tr>
            <td style="background-color: #0b3b24; border-top: 4px solid #d4af37; padding: 15px 20px; text-align: center;">
              <div style="font-size: 9px; font-weight: bold; color: #d4af37; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">
                ADMIN ALERT &bull; HOTEL SONAR BANGLA
              </div>
              <h1 style="margin: 0; font-size: 15px; font-weight: bold; color: #ffffff; letter-spacing: 1px;">
                NEW RESORT RESERVATION
              </h1>
              <div style="font-size: 9px; color: #e2e8f0; margin-top: 6px;">
                Ref ID: ${inquiry.refId}
              </div>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 15px 20px;">
              <!-- Reference Box -->
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 10px 15px; margin-bottom: 22px;">
                <div style="font-size: 9px; font-weight: bold; color: #166534; text-transform: uppercase;">BOOKING REFERENCE</div>
                <div style="font-size: 15px; font-weight: bold; color: #14532d; font-family: monospace; margin-top: 2px;">${inquiry.refId}</div>
              </div>

              <!-- Reservation Details Table -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; margin-bottom: 24px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="4" style="font-size: 9px;">
                  <tr><td style="color: #64748b; width: 38%; font-weight: bold;">Guest Name:</td><td style="color: #0f172a; font-weight: bold;">${inquiry.guestName}</td></tr>
                  <tr><td style="color: #64748b; font-weight: bold;">Phone Number:</td><td style="color: #0f172a; font-weight: bold;">${inquiry.phone}</td></tr>
                  <tr><td style="color: #64748b; font-weight: bold;">Email:</td><td>${inquiry.email}</td></tr>
                  <tr><td style="color: #64748b; font-weight: bold;">Room / Suite:</td><td style="color: #0f172a; font-weight: bold;">${inquiry.roomName}</td></tr>
                  <tr><td style="color: #64748b; font-weight: bold;">Check-In &amp; Out:</td><td style="color: #0f172a; font-weight: bold;">${checkInFormatted} to ${checkOutFormatted} (${inquiry.nights} Nights)</td></tr>
                  <tr><td style="color: #64748b; font-weight: bold;">Guests &amp; Rooms:</td><td>${inquiry.guestsCount} (${inquiry.roomsCount} Room)</td></tr>
                  <tr><td style="color: #64748b; font-weight: bold;">Total Tariff:</td><td style="color: #14532d; font-weight: bold; font-size: 9px;">${formattedAmount}</td></tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Dark Footer Banner with White Text -->
          <tr>
            <td style="background-color: #0b3b24; padding: 15px 20px; text-align: center; color: #ffffff; font-size: 9px;">
              <div style="font-weight: bold; color: #ffffff;">Hotel Sonar Bangla &bull; Sundarban</div>
              <div style="margin-top: 4px; color: #cbd5e1;">${websiteDomain}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;
      await transporter.sendMail({
        from: fromAddress,
        to: adminRecipient,
        subject: `New Hotel Booking: ${inquiry.refId} - ${inquiry.guestName} (${inquiry.roomName})`,
        text: `New hotel booking ${inquiry.refId} from ${inquiry.guestName}.`,
        html: adminHtml,
      });
      adminSent = true;
    } catch (err) {
      console.error("[Nodemailer] Admin hotel alert error:", err);
    }

    // -------------------------------------------------------------
    // 2. GUEST CONFIRMATION RECEIPT EMAIL (Dark Header, White Text, No Icons)
    // -------------------------------------------------------------
    let guestSent = false;
    try {
      const guestHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Hotel Reservation Confirmation - ${websiteName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: Arial, Helvetica, sans-serif; color: #0f172a;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 15px 10px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #cbd5e1; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
          
          <!-- Dark Header Banner with White Text -->
          <tr>
            <td style="background-color: #0b3b24; border-top: 4px solid #d4af37; padding: 15px 20px; text-align: center;">
              <div style="font-size: 9px; font-weight: bold; color: #d4af37; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">
                LUXURY RESORT &bull; SUNDARBAN DELTA
              </div>
              <h1 style="margin: 0; font-size: 15px; font-weight: bold; color: #ffffff; letter-spacing: 1px;">
                HOTEL SONAR BANGLA &amp; RESORT
              </h1>
              <div style="font-size: 9px; color: #e2e8f0; margin-top: 6px; line-height: 1.4;">
                River-front Luxury Rooms, Swimming Pool &amp; World-class Bengali Hospitality
              </div>
            </td>
          </tr>

          <!-- Main Body Container -->
          <tr>
            <td style="padding: 15px 20px;">

              <!-- Greeting & Thank You -->
              <h2 style="margin: 0 0 10px 0; font-size: 15px; font-weight: bold; color: #0f172a;">
                Namaste, ${inquiry.guestName}!
              </h2>
              <p style="margin: 0 0 20px 0; font-size: 9px; color: #475569; line-height: 1.6;">
                Thank you for choosing <strong style="color: #0f172a;">Hotel Sonar Bangla &amp; Resort</strong>. We have received your resort room reservation request. Our front desk team is reviewing your travel dates and preparing your stay details.
              </p>

              <!-- Main Details Box -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px 15px; margin-bottom: 22px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="4" style="font-size: 9px;">
                  <tr>
                    <td style="color: #64748b; width: 38%; font-weight: bold;">Room / Suite Type:</td>
                    <td style="color: #0f172a; font-weight: bold;">${inquiry.roomName}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-weight: bold;">Check-In Date:</td>
                    <td style="color: #0f172a; font-weight: bold;">${checkInFormatted}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-weight: bold;">Check-Out Date:</td>
                    <td style="color: #0f172a; font-weight: bold;">${checkOutFormatted}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-weight: bold;">Guests &amp; Rooms:</td>
                    <td style="color: #0f172a; font-weight: bold;">${inquiry.guestsCount} (${inquiry.roomsCount} Room, ${inquiry.nights} Night(s))</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-weight: bold;">Estimated Tariff:</td>
                    <td style="color: #14532d; font-weight: bold; font-size: 9px;">${formattedAmount}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-weight: bold;">Payment Terms:</td>
                    <td style="color: #15803d; font-weight: bold;">Zero Upfront Fee : Pay at Resort Check-In</td>
                  </tr>
                </table>
              </div>

              <!-- Resort Inclusions Box (No Icons) -->
              <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 6px; padding: 12px 15px; margin-bottom: 22px;">
                <div style="font-size: 9px; font-weight: bold; color: #6b21a8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
                  RESORT AMENITIES &amp; INCLUSIONS:
                </div>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; color: #581c87; line-height: 1.8;">
                  <tr>
                    <td width="50%" valign="top">
                      - River-view / Garden-view Luxury Accommodation<br>
                      - Complimentary Gourmet Breakfast &amp; High Tea<br>
                      - Swimming Pool &amp; Sun Deck Access
                    </td>
                    <td width="50%" valign="top">
                      - High-speed Wi-Fi &amp; Free On-site Parking<br>
                      - In-house Multi-Cuisine Bengali Restaurant<br>
                      - 24x7 Room Service &amp; Concierge Desk
                    </td>
                  </tr>
                </table>
              </div>

              <!-- What Happens Next Box (No Icons) -->
              <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px; padding: 10px 15px; margin-bottom: 24px;">
                <div style="font-size: 9px; font-weight: bold; color: #92400e; margin-bottom: 4px;">
                  What Happens Next?
                </div>
                <div style="font-size: 9px; color: #78350f; line-height: 1.5;">
                  Our resort reservation desk will contact you at <strong style="color: #92400e;">${inquiry.phone}</strong> within 24 hours to confirm room availability, early check-in requests, and boat transfer arrangements.
                </div>
              </div>

              <!-- Action Buttons (No Icons) -->
              <div style="text-align: center; margin-bottom: 10px;">
                <div style="font-size: 9px; color: #475569; margin-bottom: 14px;">
                  Have questions or want to customize your dates right now?
                </div>
                <table border="0" cellspacing="0" cellpadding="0" align="center">
                  <tr>
                    <td style="padding-right: 8px;">
                      <a href="https://wa.me/917001403498" style="display: inline-block; background-color: #16a34a; color: #ffffff; text-decoration: none; padding: 11px 20px; font-weight: bold; font-size: 9px; border-radius: 4px;">
                        Chat on WhatsApp
                      </a>
                    </td>
                    <td style="padding-left: 8px;">
                      <a href="tel:+917001403498" style="display: inline-block; background-color: #0b3b24; color: #ffffff; text-decoration: none; padding: 11px 20px; font-weight: bold; font-size: 9px; border-radius: 4px;">
                        Call Helpline: +91 70014 03498
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

            </td>
          </tr>

          <!-- Dark Footer Banner with White Text -->
          <tr>
            <td style="background-color: #0b3b24; padding: 15px 20px; text-align: center; color: #ffffff;">
              <div style="font-size: 9px; font-weight: bold; letter-spacing: 1px; color: #ffffff;">
                HOTEL SONAR BANGLA &amp; RESORT
              </div>
              <div style="font-size: 9px; color: #e2e8f0; margin-top: 4px; letter-spacing: 0.5px;">
                WILD BENGAL HOSPITALITY &bull; PAKHIRALAY, GOSABA, SUNDARBAN, WB 743370
              </div>
              <div style="font-size: 9px; color: #cbd5e1; margin-top: 12px; border-top: 1px solid #14532d; padding-top: 12px;">
                Direct Resort Helpline: <a href="tel:+917001403498" style="color: #ffffff; text-decoration: none; font-weight: bold;">+91 70014 03498</a> | <a href="mailto:sundarbanluxurypackage@gmail.com" style="color: #ffffff; text-decoration: none; font-weight: bold;">sundarbanluxurypackage@gmail.com</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;

      await transporter.sendMail({
        from: fromAddress,
        to: inquiry.email,
        subject: `Reservation Confirmed - Hotel Sonar Bangla`,
        text: `Namaste ${inquiry.guestName}, your reservation request for ${inquiry.roomName} has been received!`,
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

export interface AdminAuthEmailParams {
  to: string;
  adminName: string;
  magicLinkUrl: string;
  resetUrl: string;
  expiresInMinutes?: number;
}

/**
 * Dispatches an administrative email containing both a 1-click magic login link
 * and a direct password reset link.
 */
export async function sendAdminAuthEmail(params: AdminAuthEmailParams) {
  const { to, adminName, magicLinkUrl, resetUrl, expiresInMinutes = 30 } = params;

  try {
    const transporter = getEmailTransporter();
    if (!transporter) {
      console.warn("[Nodemailer] Transporter not configured. Simulating auth email dispatch.");
      return {
        success: true,
        sent: false,
        warning: "SMTP not configured. Token link generated.",
      };
    }

    const fromAddress = `"Sundarban Luxury Security" <${process.env.SMTP_USER || "sundarbanluxurypackage@gmail.com"}>`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Reset Admin Password & Access</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 16px rgba(0,0,0,0.05);">
    <!-- Header -->
    <tr>
      <td style="background-color: #0b3b24; padding: 28px 24px; text-align: center; border-top: 4px solid #d4af37;">
        <h1 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 0; letter-spacing: 0.5px;">
          SUNDARBAN LUXURY PACKAGES
        </h1>
        <div style="color: #d4af37; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 6px;">
          Admin Password Reset &amp; Access Recovery
        </div>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 32px 28px;">
        <h2 style="font-size: 17px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 12px;">
          Hello ${adminName || "Administrator"},
        </h2>
        <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 24px;">
          We received a request to recover or reset your Sundarban Luxury Packages admin account. Choose the option that best suits your needs:
        </p>

        <!-- Option 1: Reset Password Button (Primary) -->
        <div style="background-color: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; padding: 22px; text-align: center; margin-bottom: 22px;">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #166534; margin-bottom: 6px;">
            Option 1 (Recommended): Set a New Password
          </div>
          <p style="font-size: 13px; color: #15803d; margin: 0 0 16px; line-height: 1.5;">
            <strong>No old password required.</strong> Click below to choose a brand new password for your admin account:
          </p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #057a28; color: #ffffff; font-weight: 700; font-size: 14px; padding: 13px 30px; text-decoration: none; border-radius: 6px; box-shadow: 0 3px 8px rgba(5,122,40,0.3);">
            Set New Password &rarr;
          </a>
        </div>

        <!-- Option 2: 1-Click Magic Link Button -->
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 24px;">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #475569; margin-bottom: 6px;">
            Option 2: 1-Click Instant Login (No Password Change)
          </div>
          <p style="font-size: 13px; color: #64748b; margin: 0 0 16px; line-height: 1.5;">
            If you just want to log into the dashboard right now without changing your password:
          </p>
          <a href="${magicLinkUrl}" style="display: inline-block; background-color: #1e293b; color: #ffffff; font-weight: 700; font-size: 13px; padding: 11px 24px; text-decoration: none; border-radius: 6px;">
            Sign In Instantly with Magic Link
          </a>
        </div>

        <!-- Expiry & Security Notice -->
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 12px; color: #64748b; line-height: 1.6;">
          <p style="margin: 0 0 8px;">
            <strong>Security Notice:</strong> Both links are single-use and will automatically expire in <strong>${expiresInMinutes} minutes</strong>.
          </p>
          <p style="margin: 0;">
            If you did not initiate this request, no action is needed. Your existing credentials remain completely safe and unchanged.
          </p>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #f1f5f9; padding: 18px 24px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
        &copy; ${new Date().getFullYear()} Sundarban Luxury Packages &bull; Wild Bengal Hospitality &bull; Automated Security Dispatch
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const textContent = `
Sundarban Luxury Packages - Admin Password Reset & Access

Hello ${adminName || "Administrator"},

We received a request to recover or reset your admin account.

Option 1: Set a New Password (No Old Password Needed)
${resetUrl}

Option 2: 1-Click Instant Login (Sign In Directly)
${magicLinkUrl}

Both links are single-use and expire in ${expiresInMinutes} minutes. If you did not request this, you can safely ignore this email.
    `;

    await transporter.sendMail({
      from: fromAddress,
      to,
      subject: `Reset Admin Password & Access - Sundarban Luxury Packages`,
      text: textContent,
      html: htmlContent,
    });

    return { success: true, sent: true };
  } catch (err: any) {
    console.error("[Nodemailer] Error sending admin auth email:", err);
    return {
      success: false,
      sent: false,
      warning: err?.message || "Failed to dispatch email",
    };
  }
}

