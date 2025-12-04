/**
 * Email service for sending reservation emails
 * Uses Brevo (formerly Sendinblue) for email delivery
 */

import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo'

interface ReservationEmailParams {
  partySize: string
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
 * Generate HTML email template for reservation
 */
function generateReservationEmailHTML(params: ReservationEmailParams): string {
  const { partySize, date, time, email, phone } = params
  
  // Format date for display
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : date
  
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
  const { partySize, date, time, email, phone } = params
  
  // Format date for display
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : date
  
  return `
New Reservation Request

You have received a new reservation request:

Party Size: ${partySize}
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
export async function sendReservationEmail(params: ReservationEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    const { partySize, date, time, email, phone } = params
    
    // Validate required parameters
    if (!partySize || !date || !time || !email || !phone) {
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
    
    // If Brevo is not configured, log in development mode
    if (!apiKey) {
      if (process.env.NODE_ENV === 'development') {
        console.log('='.repeat(60))
        console.log('RESERVATION EMAIL (Development Mode - Brevo not configured)')
        console.log('='.repeat(60))
        console.log('To: jacacanada@gmail.com')
        console.log('Subject: New Reservation Request')
        console.log('Reservation Details:')
        console.log('  Party Size:', partySize)
        console.log('  Date:', date)
        console.log('  Time:', time)
        console.log('  Email:', email)
        console.log('  Phone:', phone)
        console.log('HTML Email:')
        console.log(generateReservationEmailHTML(params))
        console.log('='.repeat(60))
        console.log('To enable email sending, set BREVO_API_KEY in your environment variables')
        console.log('='.repeat(60))
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
      ;(apiInstance as any).authentications.apiKey.apiKey = apiKey
    } catch (initError) {
      console.error('Error initializing Brevo client:', initError)
      return {
        success: false,
        error: `Failed to initialize email service: ${initError instanceof Error ? initError.message : 'Unknown error'}`
      }
    }
    
    // Get sender email and name
    const senderEmail = getSenderEmail()
    const senderName = getSenderName()
    
    // Create email object
    const sendSmtpEmail = new SendSmtpEmail()
    sendSmtpEmail.subject = 'New Reservation Request - Johnny Cafe'
    sendSmtpEmail.sender = {
      name: senderName,
      email: senderEmail,
    }
    sendSmtpEmail.to = [
      {
        email: 'jacacanada@gmail.com',
        name: 'Johnny Cafe',
      },
    ]
    
    // Generate email content
    let htmlContent: string
    let textContent: string
    try {
      htmlContent = generateReservationEmailHTML(params)
      textContent = generateReservationEmailText(params)
    } catch (templateError) {
      console.error('Error generating email templates:', templateError)
      return {
        success: false,
        error: `Failed to generate email template: ${templateError instanceof Error ? templateError.message : 'Unknown error'}`
      }
    }
    sendSmtpEmail.htmlContent = htmlContent
    sendSmtpEmail.textContent = textContent
    
    console.log('Sending reservation email with Brevo:', {
      from: `${senderName} <${senderEmail}>`,
      to: 'jacacanada@gmail.com',
      subject: sendSmtpEmail.subject,
    })
    
    // Send email via Brevo
    try {
      const response = await apiInstance.sendTransacEmail(sendSmtpEmail)
      
      console.log('Reservation email sent via Brevo successfully:', {
        messageId: response.body?.messageId,
        statusCode: response.response?.statusCode,
        statusMessage: response.response?.statusMessage,
      })
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Full Brevo response:', {
          messageId: response.body?.messageId,
          response: response.response,
        })
      }
      
      return { success: true }
    } catch (brevoError: any) {
      // Log detailed error information
      console.error('Brevo send error - Full details:', {
        message: brevoError?.message,
        status: brevoError?.response?.status,
        statusCode: brevoError?.response?.statusCode,
        statusText: brevoError?.response?.statusText,
        body: brevoError?.response?.body,
        text: brevoError?.response?.text,
        data: brevoError?.response?.data,
        fullError: JSON.stringify(brevoError, null, 2),
      })
      
      // Provide more specific error messages
      let errorMessage = 'Failed to send email'
      if (brevoError?.response?.status || brevoError?.response?.statusCode) {
        const status = brevoError.response.status || brevoError.response.statusCode
        const body = brevoError.response.body || brevoError.response.data || {}
        const bodyMessage = body.message || body.error || brevoError.message
        errorMessage = `Brevo error (status ${status}): ${bodyMessage || 'Unknown error'}`
      } else if (brevoError?.message) {
        errorMessage = `Brevo error: ${brevoError.message}`
      }
      
      return {
        success: false,
        error: errorMessage
      }
    }
  } catch (error) {
    console.error('Error in sendReservationEmail:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    }
  }
}

