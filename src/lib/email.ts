/**
 * Email service for sending reservation emails
 * Uses Brevo (formerly Sendinblue) for email delivery
 */

import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo'
import { supabaseAdmin } from './supabase'

interface ReservationEmailParams {
  partySize: string
  mealType: string
  date: string
  time: string
  email: string
  phone: string
}

/**
 * Get the sender email address
 */
function getSenderEmail(): string {
  return process.env.BREVO_FROM_EMAIL || process.env.BREVO_SENDER_EMAIL || '[email protected]'
}

/**
 * Get the sender name
 */
function getSenderName(): string {
  return process.env.BREVO_FROM_NAME || process.env.BREVO_SENDER_NAME || 'Johnny Cafe'
}

/**
 * Get the recipient email addresses from reservation_settings table
 * Falls back to RECIPIENT_EMAIL env var if no settings found
 */
async function getRecipientEmails(businessId?: string): Promise<string[]> {
  // If businessId is provided, query reservation_settings table
  if (businessId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('reservation_settings')
        .select('email_recipients')
        .eq('business_id', businessId)
        .single()

      if (!error && data && data.email_recipients && data.email_recipients.length > 0) {
        return data.email_recipients
      }
    } catch (error) {
      console.error('Error fetching reservation settings:', error)
      // Fall through to env var fallback
    }
  }

  // Fall back to RECIPIENT_EMAIL env var if provided (for backward compatibility)
  if (process.env.RECIPIENT_EMAIL) {
    return [process.env.RECIPIENT_EMAIL]
  }

  // No recipients found - return empty array
  // Email won't be sent, but reservation will still be saved
  return []
}

/**
 * Get the Brevo template ID for reservation emails
 */
function getReservationEmailTemplateId(): number | null {
  const templateId = process.env.BREVO_RESERVATION_EMAIL_TEMPLATE_ID
  if (!templateId) {
    return null
  }
  const parsedId = parseInt(templateId, 10)
  if (isNaN(parsedId)) {
    return null
  }
  return parsedId
}

/**
 * Generate HTML email template for reservation
 */
function generateReservationEmailHTML(params: ReservationEmailParams): string {
  const { partySize, mealType, date, time, email, phone } = params
  
  // Format date for display
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : date
  
  // Format meal type for display
  const formattedMealType = mealType === 'brunch' ? 'Brunch' : mealType === 'dinner' ? 'Dinner' : 'Jazz'
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Reservation Request</title>
</head>
<body style="font-family: system-ui, sans-serif, Arial; font-size: 14px; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="font-family: system-ui, sans-serif, Arial; font-size: 14px">
    <h1 style="color: #334D2D; margin: 0 0 20px 0;">New Reservation Request</h1>
    
    <p style="padding-top: 14px; border-top: 1px solid #eaeaea">
      You have received a new reservation request:
    </p>
    
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin: 20px 0;">
      <p style="margin: 10px 0;"><strong>Party Size:</strong> ${partySize}</p>
      <p style="margin: 10px 0;"><strong>Meal Type:</strong> ${formattedMealType}</p>
      <p style="margin: 10px 0;"><strong>Date:</strong> ${formattedDate}</p>
      <p style="margin: 10px 0;"><strong>Time:</strong> ${time}</p>
      <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #334D2D; text-decoration: none;">${email}</a></p>
      <p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #334D2D; text-decoration: none;">${phone}</a></p>
    </div>
    
    <p style="color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea;">
      This is an automated message from Johnny Cafe reservation system.
    </p>
  </div>
</body>
</html>
  `.trim()
}

/**
 * Generate plain text email template for reservation
 */
function generateReservationEmailText(params: ReservationEmailParams): string {
  const { partySize, mealType, date, time, email, phone } = params
  
  // Format date for display
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : date
  
  // Format meal type for display
  const formattedMealType = mealType === 'brunch' ? 'Brunch' : mealType === 'dinner' ? 'Dinner' : 'Jazz'
  
  return `
New Reservation Request

You have received a new reservation request:

Party Size: ${partySize}
Meal Type: ${formattedMealType}
Date: ${formattedDate}
Time: ${time}
Email: ${email}
Phone: ${phone}

This is an automated message from Johnny Cafe reservation system.
  `.trim()
}

/**
 * Send reservation email using Brevo
 */
export async function sendReservationEmail(params: ReservationEmailParams, businessId?: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { partySize, mealType, date, time, email, phone } = params
    
    // Validate required parameters
    if (!partySize || !mealType || !date || !time || !email || !phone) {
      return {
        success: false,
        error: 'All reservation fields are required'
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: 'Invalid email address provided'
      }
    }
    
    // Get Brevo API key from environment variables
    const apiKey = process.env.BREVO_API_KEY
    
    // If Brevo is not configured, return success in development mode
    if (!apiKey) {
      if (process.env.NODE_ENV === 'development') {
        return { success: true } // Return success in dev mode even without Brevo
      } else {
        return {
          success: false,
          error: 'Email service not configured. Please set BREVO_API_KEY environment variable.'
        }
      }
    }
    
    // Initialize Brevo API client
    let apiInstance: TransactionalEmailsApi
    try {
      apiInstance = new TransactionalEmailsApi()
      // Set API key using the authentications property
      ;(apiInstance as unknown as { authentications: { apiKey: { apiKey: string } } }).authentications.apiKey.apiKey = apiKey
    } catch (initError) {
      return {
        success: false,
        error: `Failed to initialize email service: ${initError instanceof Error ? initError.message : 'Unknown error'}`
      }
    }
    
    // Get sender email and name
    const senderEmail = getSenderEmail()
    const senderName = getSenderName()
    
    // Get recipient emails from reservation_settings or fallback
    const recipientEmails = await getRecipientEmails(businessId)
    
    // If no recipients found, log warning but don't fail
    if (recipientEmails.length === 0) {
      console.warn('No email recipients found for reservation. Email will not be sent, but reservation will be saved.')
      // Return success since reservation will still be saved
      return { success: true }
    }
    
    // Get the template ID
    const templateId = getReservationEmailTemplateId()
    
    // Format date for template
    const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : date
    
    // Create email object
    const sendSmtpEmail = new SendSmtpEmail()
    sendSmtpEmail.subject = 'New Reservation Request - Johnny Cafe'
    sendSmtpEmail.sender = {
      name: senderName,
      email: senderEmail,
    }
    sendSmtpEmail.to = recipientEmails.map(email => ({
      email: email,
      name: 'Johnny Cafe',
    }))
    
    // Format meal type for display
    const formattedMealType = params.mealType === 'brunch' ? 'Brunch' : params.mealType === 'dinner' ? 'Dinner' : 'Jazz'
    
    // Use Brevo template if template ID is configured
    if (templateId) {
      sendSmtpEmail.templateId = templateId
      
      // Set template parameters for reservation email
      sendSmtpEmail.params = {
        partySize: partySize,
        mealType: formattedMealType,
        date: formattedDate,
        time: time,
        email: email,
        phone: phone,
        rawDate: date,
      }
    } else {
      // Fall back to hard-coded templates if template ID is not set
      let htmlContent: string
      let textContent: string
      try {
        htmlContent = generateReservationEmailHTML(params)
        textContent = generateReservationEmailText(params)
      } catch (templateError) {
        return {
          success: false,
          error: `Failed to generate email template: ${templateError instanceof Error ? templateError.message : 'Unknown error'}`
        }
      }
      sendSmtpEmail.htmlContent = htmlContent
      sendSmtpEmail.textContent = textContent
    }
    
    // Send email via Brevo
    try {
      await apiInstance.sendTransacEmail(sendSmtpEmail)
      
      return { success: true }
    } catch (brevoError: unknown) {
      // Provide more specific error messages
      let errorMessage = 'Failed to send email'
      if (brevoError && typeof brevoError === 'object' && 'response' in brevoError) {
        const error = brevoError as { response?: { status?: number; statusCode?: number; body?: { message?: string; error?: string }; data?: { message?: string; error?: string } }; message?: string }
        if (error.response?.status || error.response?.statusCode) {
          const status = error.response.status || error.response.statusCode
          const body = error.response.body || error.response.data || {}
          const bodyMessage = body.message || body.error || error.message
          errorMessage = `Brevo error (status ${status}): ${bodyMessage || 'Unknown error'}`
        } else if (error.message) {
          errorMessage = `Brevo error: ${error.message}`
        }
      } else if (brevoError instanceof Error) {
        errorMessage = `Brevo error: ${brevoError.message}`
      }
      
      return {
        success: false,
        error: errorMessage
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    }
  }
}

