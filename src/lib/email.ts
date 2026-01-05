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
 * Structured logging helper for email tracking
 */
interface EmailLogData {
  eventType: 'email_attempt' | 'email_success' | 'email_error' | 'config_check'
  emailType: 'reservation_request' | 'confirmation'
  timestamp: string
  environment: string
  reservationContext?: {
    customerEmail?: string
    date?: string
    time?: string
    partySize?: string | number
    mealType?: string
  }
  configState?: {
    apiKeyPresent: boolean
    recipientsCount?: number
    recipientsSource?: 'database' | 'env_var' | 'none' | 'customer'
    templateId?: number | null
    senderEmail?: string
    senderName?: string
  }
  error?: {
    message: string
    stack?: string
    brevoResponse?: {
      status?: number
      body?: unknown
    }
  }
  success?: {
    messageId?: string
  }
  businessId?: string
}

function logEmailEvent(data: EmailLogData): void {
  const logEntry = JSON.stringify(data)
  
  if (data.eventType === 'email_error') {
    console.error(`[EMAIL_TRACKING] ${logEntry}`)
  } else if (data.eventType === 'config_check' && data.configState && 
             (!data.configState.apiKeyPresent || data.configState.recipientsCount === 0)) {
    console.warn(`[EMAIL_TRACKING] ${logEntry}`)
  } else {
    console.log(`[EMAIL_TRACKING] ${logEntry}`)
  }
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
      console.log(`[EMAIL_TRACKING] Fetching reservation settings for businessId: ${businessId}`)
      const { data, error } = await supabaseAdmin
        .from('reservation_settings')
        .select('email_recipients')
        .eq('business_id', businessId)
        .single()

      if (error) {
        console.warn(`[EMAIL_TRACKING] Error fetching reservation settings:`, JSON.stringify({
          businessId,
          error: error.message,
          code: error.code,
          details: error.details,
        }))
        // Fall through to env var fallback
      } else if (data && data.email_recipients && data.email_recipients.length > 0) {
        console.log(`[EMAIL_TRACKING] Found ${data.email_recipients.length} recipient(s) from reservation_settings:`, JSON.stringify({
          businessId,
          recipients: data.email_recipients,
          source: 'database',
        }))
        return data.email_recipients
      } else {
        console.warn(`[EMAIL_TRACKING] No recipients found in reservation_settings for businessId: ${businessId}`, JSON.stringify({
          businessId,
          dataExists: !!data,
          recipientsCount: data?.email_recipients?.length || 0,
        }))
        // Fall through to env var fallback
      }
    } catch (error) {
      console.error(`[EMAIL_TRACKING] Exception fetching reservation settings:`, JSON.stringify({
        businessId,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      }))
      // Fall through to env var fallback
    }
  } else {
    console.warn(`[EMAIL_TRACKING] No businessId provided, cannot query reservation_settings`)
  }

  // Fall back to RECIPIENT_EMAIL env var if provided (for backward compatibility)
  if (process.env.RECIPIENT_EMAIL) {
    console.log(`[EMAIL_TRACKING] Using RECIPIENT_EMAIL env var fallback:`, JSON.stringify({
      recipient: process.env.RECIPIENT_EMAIL,
      source: 'env_var',
    }))
    return [process.env.RECIPIENT_EMAIL]
  }

  // No recipients found - return empty array
  // Email won't be sent, but reservation will still be saved
  console.warn(`[EMAIL_TRACKING] No recipients found from database or env var`, JSON.stringify({
    businessId: businessId || 'none',
    hasRecipientEmailEnv: !!process.env.RECIPIENT_EMAIL,
  }))
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
      <p style="margin: 10px 0;"><strong>What for:</strong> ${formattedMealType}</p>
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
What for: ${formattedMealType}
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
  const startTime = Date.now()
  
  try {
    const { partySize, mealType, date, time, email, phone } = params
    
    // Log email attempt
    logEmailEvent({
      eventType: 'email_attempt',
      emailType: 'reservation_request',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      reservationContext: {
        customerEmail: email,
        date,
        time,
        partySize,
        mealType,
      },
      businessId: businessId || undefined,
    })
    
    // Validate required parameters
    if (!partySize || !mealType || !date || !time || !email || !phone) {
      const errorMsg = 'All reservation fields are required'
      logEmailEvent({
        eventType: 'email_error',
        emailType: 'reservation_request',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'unknown',
        reservationContext: {
          customerEmail: email,
          date,
          time,
          partySize,
          mealType,
        },
        error: {
          message: errorMsg,
        },
        businessId: businessId || undefined,
      })
      return {
        success: false,
        error: errorMsg
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      const errorMsg = 'Invalid email address provided'
      logEmailEvent({
        eventType: 'email_error',
        emailType: 'reservation_request',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'unknown',
        reservationContext: {
          customerEmail: email,
          date,
          time,
          partySize,
          mealType,
        },
        error: {
          message: errorMsg,
        },
        businessId: businessId || undefined,
      })
      return {
        success: false,
        error: errorMsg
      }
    }
    
    // Get Brevo API key from environment variables
    const apiKey = process.env.BREVO_API_KEY
    
    // Log configuration check
    logEmailEvent({
      eventType: 'config_check',
      emailType: 'reservation_request',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      configState: {
        apiKeyPresent: !!apiKey,
      },
      reservationContext: {
        customerEmail: email,
        date,
        time,
        partySize,
        mealType,
      },
      businessId: businessId || undefined,
    })
    
    // If Brevo is not configured, return success in development mode
    if (!apiKey) {
      if (process.env.NODE_ENV === 'development') {
        logEmailEvent({
          eventType: 'email_success',
          emailType: 'reservation_request',
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV || 'unknown',
          reservationContext: {
            customerEmail: email,
            date,
            time,
            partySize,
            mealType,
          },
          configState: {
            apiKeyPresent: false,
          },
          success: {
            messageId: 'dev_mode_skip',
          },
          businessId: businessId || undefined,
        })
        return { success: true } // Return success in dev mode even without Brevo
      } else {
        const errorMsg = 'Email service not configured. Please set BREVO_API_KEY environment variable.'
        logEmailEvent({
          eventType: 'email_error',
          emailType: 'reservation_request',
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV || 'unknown',
          reservationContext: {
            customerEmail: email,
            date,
            time,
            partySize,
            mealType,
          },
          configState: {
            apiKeyPresent: false,
          },
          error: {
            message: errorMsg,
          },
          businessId: businessId || undefined,
        })
        return {
          success: false,
          error: errorMsg
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
      const errorMsg = `Failed to initialize email service: ${initError instanceof Error ? initError.message : 'Unknown error'}`
      logEmailEvent({
        eventType: 'email_error',
        emailType: 'reservation_request',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'unknown',
        reservationContext: {
          customerEmail: email,
          date,
          time,
          partySize,
          mealType,
        },
        configState: {
          apiKeyPresent: true,
        },
        error: {
          message: errorMsg,
          stack: initError instanceof Error ? initError.stack : undefined,
        },
        businessId: businessId || undefined,
      })
      return {
        success: false,
        error: errorMsg
      }
    }
    
    // Get sender email and name
    const senderEmail = getSenderEmail()
    const senderName = getSenderName()
    
    // Get recipient emails from reservation_settings or fallback
    const recipientEmails = await getRecipientEmails(businessId)
    
    // Determine recipient source for logging
    let recipientsSource: 'database' | 'env_var' | 'none' = 'none'
    if (businessId && recipientEmails.length > 0) {
      // Check if we got recipients from database (we can't know for sure, but if businessId exists and we have recipients, likely from DB)
      recipientsSource = 'database'
    } else if (process.env.RECIPIENT_EMAIL && recipientEmails.length > 0) {
      recipientsSource = 'env_var'
    }
    
    // Get the template ID
    const templateId = getReservationEmailTemplateId()
    
    // Log configuration state
    logEmailEvent({
      eventType: 'config_check',
      emailType: 'reservation_request',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      configState: {
        apiKeyPresent: true,
        recipientsCount: recipientEmails.length,
        recipientsSource,
        templateId,
        senderEmail,
        senderName,
      },
      reservationContext: {
        customerEmail: email,
        date,
        time,
        partySize,
        mealType,
      },
      businessId: businessId || undefined,
    })
    
    // If no recipients found, log warning but don't fail
    if (recipientEmails.length === 0) {
      console.warn('No email recipients found for reservation. Email will not be sent, but reservation will be saved.')
      logEmailEvent({
        eventType: 'email_error',
        emailType: 'reservation_request',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'unknown',
        reservationContext: {
          customerEmail: email,
          date,
          time,
          partySize,
          mealType,
        },
        configState: {
          apiKeyPresent: true,
          recipientsCount: 0,
          recipientsSource: 'none',
          templateId,
          senderEmail,
          senderName,
        },
        error: {
          message: 'No email recipients found. Email will not be sent, but reservation will be saved.',
        },
        businessId: businessId || undefined,
      })
      // Return success since reservation will still be saved
      return { success: true }
    }
    
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
        const errorMsg = `Failed to generate email template: ${templateError instanceof Error ? templateError.message : 'Unknown error'}`
        logEmailEvent({
          eventType: 'email_error',
          emailType: 'reservation_request',
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV || 'unknown',
          reservationContext: {
            customerEmail: email,
            date,
            time,
            partySize,
            mealType,
          },
          configState: {
            apiKeyPresent: true,
            recipientsCount: recipientEmails.length,
            recipientsSource,
            templateId: null,
            senderEmail,
            senderName,
          },
          error: {
            message: errorMsg,
            stack: templateError instanceof Error ? templateError.stack : undefined,
          },
          businessId: businessId || undefined,
        })
        return {
          success: false,
          error: errorMsg
        }
      }
      sendSmtpEmail.htmlContent = htmlContent
      sendSmtpEmail.textContent = textContent
    }
    
    // Send email via Brevo
    console.log(`[EMAIL_TRACKING] About to send reservation_request email via Brevo API`, JSON.stringify({
      emailType: 'reservation_request',
      recipients: recipientEmails,
      templateId,
      hasHtmlContent: !!sendSmtpEmail.htmlContent,
      hasTemplateId: !!sendSmtpEmail.templateId,
      timestamp: new Date().toISOString(),
    }))
    
    try {
      const response = await apiInstance.sendTransacEmail(sendSmtpEmail)
      const duration = Date.now() - startTime
      
      // Extract message ID if available (from response body)
      const messageId = (response as any)?.body?.messageId || undefined
      
      logEmailEvent({
        eventType: 'email_success',
        emailType: 'reservation_request',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'unknown',
        reservationContext: {
          customerEmail: email,
          date,
          time,
          partySize,
          mealType,
        },
        configState: {
          apiKeyPresent: true,
          recipientsCount: recipientEmails.length,
          recipientsSource,
          templateId,
          senderEmail,
          senderName,
        },
        success: {
          messageId: messageId?.toString(),
        },
        businessId: businessId || undefined,
      })
      
      return { success: true }
    } catch (brevoError: unknown) {
      const duration = Date.now() - startTime
      
      // Provide more specific error messages
      let errorMessage = 'Failed to send email'
      let brevoStatus: number | undefined
      let brevoBody: unknown | undefined
      
      if (brevoError && typeof brevoError === 'object' && 'response' in brevoError) {
        const error = brevoError as { response?: { status?: number; statusCode?: number; body?: { message?: string; error?: string }; data?: { message?: string; error?: string } }; message?: string }
        if (error.response?.status || error.response?.statusCode) {
          brevoStatus = error.response.status || error.response.statusCode
          brevoBody = error.response.body || error.response.data || {}
          const body = brevoBody as { message?: string; error?: string }
          const bodyMessage = body.message || body.error || error.message
          errorMessage = `Brevo error (status ${brevoStatus}): ${bodyMessage || 'Unknown error'}`
        } else if (error.message) {
          errorMessage = `Brevo error: ${error.message}`
        }
      } else if (brevoError instanceof Error) {
        errorMessage = `Brevo error: ${brevoError.message}`
      }
      
      logEmailEvent({
        eventType: 'email_error',
        emailType: 'reservation_request',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'unknown',
        reservationContext: {
          customerEmail: email,
          date,
          time,
          partySize,
          mealType,
        },
        configState: {
          apiKeyPresent: true,
          recipientsCount: recipientEmails.length,
          recipientsSource,
          templateId,
          senderEmail,
          senderName,
        },
        error: {
          message: errorMessage,
          stack: brevoError instanceof Error ? brevoError.stack : undefined,
          brevoResponse: brevoStatus ? {
            status: brevoStatus,
            body: brevoBody,
          } : undefined,
        },
        businessId: businessId || undefined,
      })
      
      return {
        success: false,
        error: errorMessage
      }
    }
  } catch (error) {
    const duration = Date.now() - startTime
    const errorMsg = error instanceof Error ? error.message : 'Failed to send email'
    
    logEmailEvent({
      eventType: 'email_error',
      emailType: 'reservation_request',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      reservationContext: {
        customerEmail: params.email,
        date: params.date,
        time: params.time,
        partySize: params.partySize,
        mealType: params.mealType,
      },
      error: {
        message: errorMsg,
        stack: error instanceof Error ? error.stack : undefined,
      },
      businessId: businessId || undefined,
    })
    
    return {
      success: false,
      error: errorMsg
    }
  }
}

interface SendReservationConfirmationEmailParams {
  customerEmail: string
  customerName: string
  reservationDate: string
  reservationTime: string
  partySize: number
  mealType: string
}

/**
 * Get the Brevo template ID for reservation confirmation emails
 */
function getReservationConfirmationTemplateId(): number | null {
  const templateId = process.env.BREVO_RESERVATION_CONFIRMATION_TEMPLATE_ID
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
 * Generate HTML email template for reservation confirmation
 */
function generateReservationConfirmationEmailHTML(params: SendReservationConfirmationEmailParams): string {
  const { customerName, reservationDate, reservationTime, partySize, mealType } = params
  
  // Format date for display
  const formattedDate = reservationDate ? new Date(reservationDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }) : reservationDate
  
  // Format meal type for display
  const formattedMealType = mealType === 'brunch' ? 'Brunch' : mealType === 'dinner' ? 'Dinner' : 'Jazz'
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reservation Confirmed</title>
</head>
<body style="font-family: system-ui, sans-serif, Arial; font-size: 14px; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="font-family: system-ui, sans-serif, Arial; font-size: 14px">
    <h1 style="color: #334D2D; margin: 0 0 20px 0;">Reservation Confirmed</h1>
    
    <p style="padding-top: 14px; border-top: 1px solid #eaeaea">
      Thanks for booking with Johnny G's!
    </p>
    
    <p>
      We've received your reservation and can't wait to host you.
    </p>
    
    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0 0 10px 0;"><strong>Date:</strong> ${formattedDate}</p>
      <p style="margin: 0 0 10px 0;"><strong>Time:</strong> ${reservationTime}</p>
      <p style="margin: 0 0 10px 0;"><strong>What for:</strong> ${formattedMealType}</p>
      <p style="margin: 0;"><strong>Party Size:</strong> ${partySize} ${partySize === 1 ? 'guest' : 'guests'}</p>
    </div>
    
    <p>
      If your booking is for a large group or during live jazz hours, someone from our team may contact you to confirm a few details.
    </p>
    
    <p>See you soon for great food, cocktails, and live music 🎷</p>
    
    <p style="color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea">
      — Johnny G's
    </p>
  </div>
</body>
</html>
  `.trim()
}

/**
 * Generate plain text email template for reservation confirmation
 */
function generateReservationConfirmationEmailText(params: SendReservationConfirmationEmailParams): string {
  const { customerName, reservationDate, reservationTime, partySize, mealType } = params
  
  // Format date for display
  const formattedDate = reservationDate ? new Date(reservationDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }) : reservationDate
  
  // Format meal type for display
  const formattedMealType = mealType === 'brunch' ? 'Brunch' : mealType === 'dinner' ? 'Dinner' : 'Jazz'
  
  return `
Thanks for booking with Johnny G's!

We've received your reservation and can't wait to host you.

Date: ${formattedDate}
Time: ${reservationTime}
What for: ${formattedMealType}
Party Size: ${partySize} ${partySize === 1 ? 'guest' : 'guests'}

If your booking is for a large group or during live jazz hours, someone from our team may contact you to confirm a few details.

See you soon for great food, cocktails, and live music 🎷

— Johnny G's
  `.trim()
}

/**
 * Send reservation confirmation email to customer using Brevo
 */
export async function sendReservationConfirmationEmail(params: SendReservationConfirmationEmailParams): Promise<{ success: boolean; error?: string }> {
  const startTime = Date.now()
  
  try {
    const { customerEmail, customerName, reservationDate, reservationTime, partySize, mealType } = params
    
    // Log email attempt
    logEmailEvent({
      eventType: 'email_attempt',
      emailType: 'confirmation',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      reservationContext: {
        customerEmail,
        date: reservationDate,
        time: reservationTime,
        partySize,
        mealType,
      },
    })
    
    // Validate required parameters
    if (!customerEmail || typeof customerEmail !== 'string' || !customerEmail.includes('@')) {
      const errorMsg = 'Invalid email address provided'
      logEmailEvent({
        eventType: 'email_error',
        emailType: 'confirmation',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'unknown',
        reservationContext: {
          customerEmail,
          date: reservationDate,
          time: reservationTime,
          partySize,
          mealType,
        },
        error: {
          message: errorMsg,
        },
      })
      return {
        success: false,
        error: errorMsg
      }
    }
    
    // Get Brevo API key from environment variables
    const apiKey = process.env.BREVO_API_KEY
    
    // Log configuration check
    logEmailEvent({
      eventType: 'config_check',
      emailType: 'confirmation',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      configState: {
        apiKeyPresent: !!apiKey,
      },
      reservationContext: {
        customerEmail,
        date: reservationDate,
        time: reservationTime,
        partySize,
        mealType,
      },
    })
    
    // If Brevo is not configured, return success in development mode
    if (!apiKey) {
      if (process.env.NODE_ENV === 'development') {
        logEmailEvent({
          eventType: 'email_success',
          emailType: 'confirmation',
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV || 'unknown',
          reservationContext: {
            customerEmail,
            date: reservationDate,
            time: reservationTime,
            partySize,
            mealType,
          },
          configState: {
            apiKeyPresent: false,
          },
          success: {
            messageId: 'dev_mode_skip',
          },
        })
        return { success: true } // Return success in dev mode even without Brevo
      } else {
        const errorMsg = 'Email service not configured. Please set BREVO_API_KEY environment variable.'
        logEmailEvent({
          eventType: 'email_error',
          emailType: 'confirmation',
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV || 'unknown',
          reservationContext: {
            customerEmail,
            date: reservationDate,
            time: reservationTime,
            partySize,
            mealType,
          },
          configState: {
            apiKeyPresent: false,
          },
          error: {
            message: errorMsg,
          },
        })
        return {
          success: false,
          error: errorMsg
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
      const errorMsg = `Failed to initialize email service: ${initError instanceof Error ? initError.message : 'Unknown error'}`
      logEmailEvent({
        eventType: 'email_error',
        emailType: 'confirmation',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'unknown',
        reservationContext: {
          customerEmail,
          date: reservationDate,
          time: reservationTime,
          partySize,
          mealType,
        },
        configState: {
          apiKeyPresent: true,
        },
        error: {
          message: errorMsg,
          stack: initError instanceof Error ? initError.stack : undefined,
        },
      })
      return {
        success: false,
        error: errorMsg
      }
    }
    
    // Get sender email and name
    const senderEmail = getSenderEmail()
    const senderName = getSenderName()
    
    // Get the template ID
    const templateId = getReservationConfirmationTemplateId()
    
    // Log configuration state
    logEmailEvent({
      eventType: 'config_check',
      emailType: 'confirmation',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      configState: {
        apiKeyPresent: true,
        recipientsCount: 1, // Always 1 for confirmation (customer)
        recipientsSource: 'customer',
        templateId,
        senderEmail,
        senderName,
      },
      reservationContext: {
        customerEmail,
        date: reservationDate,
        time: reservationTime,
        partySize,
        mealType,
      },
    })
    
    // Format date for template
    const formattedDate = reservationDate ? new Date(reservationDate).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }) : reservationDate
    
    // Format meal type for template
    const formattedMealType = mealType === 'brunch' ? 'Brunch' : mealType === 'dinner' ? 'Dinner' : 'Jazz'
    
    // Create email object
    const sendSmtpEmail = new SendSmtpEmail()
    sendSmtpEmail.subject = 'Reservation Confirmed'
    sendSmtpEmail.sender = {
      name: senderName,
      email: senderEmail,
    }
    sendSmtpEmail.to = [
      {
        email: customerEmail,
        name: customerName,
      },
    ]
    
    // Use Brevo template if template ID is configured
    if (templateId) {
      sendSmtpEmail.templateId = templateId
      
      // Set template parameters for confirmation email
      sendSmtpEmail.params = {
        customerName: customerName,
        reservationDate: formattedDate,
        reservationTime: reservationTime,
        mealType: formattedMealType,
        partySize: partySize.toString(),
        rawDate: reservationDate,
      }
    } else {
      // Fall back to hard-coded templates if template ID is not set
      let htmlContent: string
      let textContent: string
      try {
        htmlContent = generateReservationConfirmationEmailHTML(params)
        textContent = generateReservationConfirmationEmailText(params)
      } catch (templateError) {
        const errorMsg = `Failed to generate email template: ${templateError instanceof Error ? templateError.message : 'Unknown error'}`
        logEmailEvent({
          eventType: 'email_error',
          emailType: 'confirmation',
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV || 'unknown',
          reservationContext: {
            customerEmail,
            date: reservationDate,
            time: reservationTime,
            partySize,
            mealType,
          },
          configState: {
            apiKeyPresent: true,
            recipientsCount: 1,
            recipientsSource: 'customer',
            templateId: null,
            senderEmail,
            senderName,
          },
          error: {
            message: errorMsg,
            stack: templateError instanceof Error ? templateError.stack : undefined,
          },
        })
        return {
          success: false,
          error: errorMsg
        }
      }
      sendSmtpEmail.htmlContent = htmlContent
      sendSmtpEmail.textContent = textContent
    }
    
    // Send email via Brevo
    console.log(`[EMAIL_TRACKING] About to send confirmation email via Brevo API`, JSON.stringify({
      emailType: 'confirmation',
      recipient: customerEmail,
      templateId,
      hasHtmlContent: !!sendSmtpEmail.htmlContent,
      hasTemplateId: !!sendSmtpEmail.templateId,
      timestamp: new Date().toISOString(),
    }))
    
    try {
      const response = await apiInstance.sendTransacEmail(sendSmtpEmail)
      const duration = Date.now() - startTime
      
      // Extract message ID if available (from response body)
      const messageId = (response as any)?.body?.messageId || undefined
      
      logEmailEvent({
        eventType: 'email_success',
        emailType: 'confirmation',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'unknown',
        reservationContext: {
          customerEmail,
          date: reservationDate,
          time: reservationTime,
          partySize,
          mealType,
        },
        configState: {
          apiKeyPresent: true,
          recipientsCount: 1,
          recipientsSource: 'customer',
          templateId,
          senderEmail,
          senderName,
        },
        success: {
          messageId: messageId?.toString(),
        },
      })
      
      return { success: true }
    } catch (brevoError: unknown) {
      const duration = Date.now() - startTime
      
      // Provide more specific error messages
      let errorMessage = 'Failed to send email'
      let brevoStatus: number | undefined
      let brevoBody: unknown | undefined
      
      if (brevoError && typeof brevoError === 'object' && 'response' in brevoError) {
        const error = brevoError as { response?: { status?: number; statusCode?: number; body?: { message?: string; error?: string }; data?: { message?: string; error?: string } }; message?: string }
        if (error.response?.status || error.response?.statusCode) {
          brevoStatus = error.response.status || error.response.statusCode
          brevoBody = error.response.body || error.response.data || {}
          const body = brevoBody as { message?: string; error?: string }
          const bodyMessage = body.message || body.error || error.message
          errorMessage = `Brevo error (status ${brevoStatus}): ${bodyMessage || 'Unknown error'}`
        } else if (error.message) {
          errorMessage = `Brevo error: ${error.message}`
        }
      } else if (brevoError instanceof Error) {
        errorMessage = `Brevo error: ${brevoError.message}`
      }
      
      logEmailEvent({
        eventType: 'email_error',
        emailType: 'confirmation',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'unknown',
        reservationContext: {
          customerEmail,
          date: reservationDate,
          time: reservationTime,
          partySize,
          mealType,
        },
        configState: {
          apiKeyPresent: true,
          recipientsCount: 1,
          recipientsSource: 'customer',
          templateId,
          senderEmail,
          senderName,
        },
        error: {
          message: errorMessage,
          stack: brevoError instanceof Error ? brevoError.stack : undefined,
          brevoResponse: brevoStatus ? {
            status: brevoStatus,
            body: brevoBody,
          } : undefined,
        },
      })
      
      return {
        success: false,
        error: errorMessage
      }
    }
  } catch (error) {
    const duration = Date.now() - startTime
    const errorMsg = error instanceof Error ? error.message : 'Failed to send email'
    
    logEmailEvent({
      eventType: 'email_error',
      emailType: 'confirmation',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      reservationContext: {
        customerEmail: params.customerEmail,
        date: params.reservationDate,
        time: params.reservationTime,
        partySize: params.partySize,
        mealType: params.mealType,
      },
      error: {
        message: errorMsg,
        stack: error instanceof Error ? error.stack : undefined,
      },
    })
    
    return {
      success: false,
      error: errorMsg
    }
  }
}

