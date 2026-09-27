/**
 * Input validation utilities for Sundarban Luxury Packages
 */

export interface ContactValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export function validateName(name?: string): string | null {
  if (!name || !name.trim()) {
    return "Please enter your full name.";
  }
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return "Full name must be at least 2 characters long.";
  }
  if (trimmed.length > 70) {
    return "Full name cannot exceed 70 characters.";
  }
  // Allow Unicode letters (for international and Indian regional names), spaces, dots, hyphens, and apostrophes
  if (!/^[\p{L}\s.'\-]+$/u.test(trimmed)) {
    return "Name should only contain letters, spaces, hyphens, or apostrophes.";
  }
  return null;
}

export function validateEmail(email?: string): string | null {
  if (!email || !email.trim()) {
    return "Please enter your email address.";
  }
  const trimmed = email.trim();
  if (/\s/.test(trimmed)) {
    return "Email address cannot contain spaces.";
  }
  // RFC 5322 standard email regex with 2+ char top-level domain
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) {
    return "Please enter a valid email address (e.g. name@example.com).";
  }

  const parts = trimmed.split("@");
  if (parts.length !== 2) {
    return "Please enter a valid email address.";
  }
  const domain = parts[1];
  const domainParts = domain.split(".");
  const tld = domainParts[domainParts.length - 1];
  if (!tld || tld.length < 2 || !/^[a-zA-Z]+$/.test(tld)) {
    return "Please enter a valid domain extension (e.g. .com, .in, .org).";
  }

  return null;
}

export function validatePhone(phone?: string): string | null {
  if (!phone || !phone.trim()) {
    return "Please enter your phone or WhatsApp number.";
  }
  const trimmed = phone.trim();

  // Allow only digits, leading +, spaces, hyphens, and parentheses
  if (!/^[+]?[\d\s\-()]{10,20}$/.test(trimmed)) {
    return "Phone number can only contain digits, '+', spaces, and hyphens.";
  }

  const digits = trimmed.replace(/\D/g, "");

  if (digits.length < 10) {
    return `Phone number must have at least 10 digits (currently ${digits.length}).`;
  }
  if (digits.length > 15) {
    return "Phone number cannot exceed 15 digits.";
  }

  // Reject obvious dummy repetitive sequences
  if (/^(\d)\1+$/.test(digits)) {
    return "Please enter a real, valid phone number.";
  }
  if (digits === "1234567890" || digits === "0123456789" || digits === "9876543210") {
    return "Please enter your actual contact number.";
  }

  // Check 10-digit Indian mobile numbers (must start with 6, 7, 8, or 9)
  if (digits.length === 10 && !/^[6-9]/.test(digits)) {
    return "10-digit Indian mobile numbers must start with 6, 7, 8, or 9.";
  }
  // Check Indian mobile with country code 91 + 10 digits
  if (digits.length === 12 && digits.startsWith("91") && !/^91[6-9]/.test(digits)) {
    return "Indian mobile numbers must start with 6, 7, 8, or 9.";
  }
  // Check Indian mobile with leading 0 + 10 digits
  if (digits.length === 11 && digits.startsWith("0") && !/^0[6-9]/.test(digits)) {
    return "Indian mobile numbers must start with 6, 7, 8, or 9.";
  }

  return null;
}

export function validateSubject(subject?: string): string | null {
  if (!subject) return null; // Subject is optional
  const trimmed = subject.trim();
  if (trimmed.length > 120) {
    return "Subject cannot exceed 120 characters.";
  }
  return null;
}

export function validateMessage(message?: string): string | null {
  if (!message || !message.trim()) {
    return "Please write your message or inquiry.";
  }
  const trimmed = message.trim();
  if (trimmed.length < 10) {
    return `Message is too short (${trimmed.length}/10 chars minimum). Please provide more details so we can assist you.`;
  }
  if (trimmed.length > 2000) {
    return "Message cannot exceed 2000 characters.";
  }
  return null;
}

export function validateContactInquiry(data: {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}): { isValid: boolean; errors: ContactValidationErrors } {
  const errors: ContactValidationErrors = {};

  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.phone = phoneError;

  const subjectError = validateSubject(data.subject);
  if (subjectError) errors.subject = subjectError;

  const messageError = validateMessage(data.message);
  if (messageError) errors.message = messageError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
