# Fix "Images Hidden - Suspicious Message" Warning in Brevo Emails

This warning appears when email providers (like Gmail) detect that the email lacks proper authentication. Here's how to fix it:

## Quick Fix: Verify Sender Email in Brevo

### Step 1: Verify Your Sender Email Address

1. Go to [Brevo Dashboard](https://app.brevo.com/)
2. Navigate to **Settings** → **Senders & IP**
3. Click **Add a sender**
4. Enter the email address you want to use (e.g., `[email protected]` or `[email protected]`)
5. Click **Save**
6. Check your email inbox for a verification email from Brevo
7. Click the verification link in the email
8. Once verified, the sender will show as "Verified" in the Brevo dashboard

### Step 2: Update Your Environment Variable

Update your `.env.local` file to use the verified sender email:

```env
BREVO_FROM_EMAIL=[email protected]
BREVO_FROM_NAME=Johnny Cafe
```

**Important:** The email must match exactly what you verified in Brevo.

## Better Fix: Set Up Domain Authentication (Recommended for Production)

For better deliverability and to avoid spam filters, set up domain authentication:

### Step 1: Add Your Domain in Brevo

1. In Brevo Dashboard, go to **Settings** → **Senders & IP**
2. Click **Domains** tab
3. Click **Add a domain**
4. Enter your domain (e.g., `johnnycafe.com`)
5. Click **Add domain**

### Step 2: Add DNS Records

Brevo will provide you with DNS records to add. You'll need to add:

1. **SPF Record** - Authorizes Brevo to send emails from your domain
2. **DKIM Record** - Adds a digital signature to verify emails
3. **DMARC Record** (optional but recommended) - Provides additional security

#### Example DNS Records:

**SPF Record:**
```
Type: TXT
Name: @ (or your domain)
Value: v=spf1 include:spf.brevo.com ~all
TTL: 3600
```

**DKIM Record:**
```
Type: TXT
Name: brevo._domainkey (or similar, Brevo will provide exact name)
Value: [Brevo will provide this value]
TTL: 3600
```

**DMARC Record (Optional):**
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:[email protected]
TTL: 3600
```

### Step 3: Verify Domain in Brevo

1. After adding DNS records, go back to Brevo Dashboard
2. Click **Verify** next to your domain
3. Wait for verification (can take up to 48 hours, usually faster)
4. Once verified, you can use any email address from that domain

### Step 4: Update Environment Variable

Use an email from your verified domain:

```env
BREVO_FROM_EMAIL=[email protected]
BREVO_FROM_NAME=Johnny Cafe
```

## Why This Happens

Email providers (Gmail, Outlook, etc.) check for:
- **SPF (Sender Policy Framework)**: Verifies the sending server is authorized
- **DKIM (DomainKeys Identified Mail)**: Adds a cryptographic signature
- **DMARC (Domain-based Message Authentication)**: Policy for handling failed authentication

Without these, emails are marked as potentially suspicious.

## Testing

After setting up:

1. Send a test reservation email
2. Check the recipient's inbox
3. The warning should no longer appear
4. Check email headers (in Gmail: click the three dots → "Show original") to verify SPF/DKIM pass

## Troubleshooting

### Still Getting Warnings?

1. **Wait 24-48 hours** after adding DNS records for propagation
2. **Check DNS propagation**: Use [MXToolbox](https://mxtoolbox.com/spf.aspx) to verify SPF records
3. **Verify in Brevo**: Ensure sender/domain shows as "Verified" in Brevo dashboard
4. **Check email headers**: Look for "SPF: PASS" and "DKIM: PASS" in email headers
5. **Use a verified sender**: Make sure `BREVO_FROM_EMAIL` matches a verified email in Brevo

### Common Issues

- **"Sender not verified"**: Verify the email in Brevo Dashboard → Senders & IP
- **"Domain not verified"**: Add DNS records and wait for verification
- **"SPF fail"**: Check that SPF record includes `include:spf.brevo.com`
- **"DKIM fail"**: Verify DKIM record is correctly added to DNS

## Best Practices

1. ✅ Always verify sender emails in Brevo
2. ✅ Use domain authentication for production
3. ✅ Use a professional email address (not `noreply@brevo.com`)
4. ✅ Set up DMARC policy for better security
5. ✅ Monitor email deliverability in Brevo dashboard

