Just a test

# 🟡 Amber - Personal Finance Landing Page

A beautiful, secure waitlist landing page for Amber personal finance app, built with Next.js 15, TypeScript, and Tailwind CSS.

**🌐 Live Site**: [ambermoney.co](https://ambermoney.co)

![Amber Landing Page](public/amber_mockup.png)

## ✨ Features

- 🎨 **Modern Design** - Clean, responsive design with custom Gambarino serif font
- 🔒 **Enterprise Security** - Cloudflare Turnstile CAPTCHA, honeypot fields, server-side validation
- 📊 **Built-in Analytics** - Vercel Analytics integration for conversion tracking
- 🚀 **Optimized Performance** - Next.js 15 with image optimization and font loading
- 📱 **Mobile-First** - Responsive design that works on all devices
- 🎯 **Conversion Focused** - Dedicated thank you page with social links

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Security**: Cloudflare Turnstile
- **Form Handling**: Formspark
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- Cloudflare account (for Turnstile)
- Formspark account (for form handling)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd amber-landing-page
pnpm install
```

### 2. Environment Setup

Create `.env.local` in the project root:

```bash
# Required - Your form handler
FORMSPARK_FORM_ID=your_formspark_form_id

# Required - Cloudflare Turnstile keys
TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
```

### 3. Security Configuration

#### Set up Cloudflare Turnstile:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to "Turnstile" → "Add Site"
3. Enter your domains:
   - `localhost` (for development)
   - `ambermoney.co` (production)
4. Choose **"Invisible"** widget type
5. Copy Site Key and Secret Key to `.env.local`

#### Set up Formspark:

1. Create account at [formspark.io](https://formspark.io)
2. Create a new form
3. Copy Form ID to `.env.local`
4. Configure email notifications in dashboard

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## 🌐 Custom Domain Setup

### Step-by-Step Domain Configuration

1. **Add Domain in Vercel**:
   - Go to your Vercel project dashboard
   - Navigate to Settings → Domains
   - Add both `ambermoney.co` and `www.ambermoney.co`

2. **Configure DNS at Your Registrar**:

   ```dns
   # For apex domain (ambermoney.co)
   Type: A
   Name: @ (or leave blank)
   Value: 76.76.19.19
   TTL: 300 (or Auto)

   # For www subdomain
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 300 (or Auto)
   ```

3. **Update Cloudflare Turnstile**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Turnstile
   - Edit your existing widget or create a new one
   - Add these domains to the hostname list:
     - `localhost` (for development)
     - `ambermoney.co` (covers www.ambermoney.co automatically)
     - `*.vercel.app` (for preview deployments)

4. **SSL Certificate**:
   - Vercel automatically provisions SSL certificates
   - Your site will be accessible at `https://ambermoney.co`
   - Certificate renewal is handled automatically

### Domain Verification

After DNS propagation (can take up to 48 hours):

- ✅ `https://ambermoney.co` should load your site
- ✅ `https://www.ambermoney.co` should redirect to apex domain
- ✅ Form submissions should work with Turnstile
- ✅ SSL certificate should be valid and auto-renewing

## 🔐 Security Features

- ✅ **Cloudflare Turnstile** - Invisible CAPTCHA protection
- ✅ **Honeypot Fields** - Hidden spam traps
- ✅ **Server-side Validation** - Email format and required fields
- ✅ **Rate Limiting** - Built into Formspark
- ✅ **CSRF Protection** - Via Turnstile tokens
- ✅ **Input Sanitization** - Automatic with Formspark

## 📊 Analytics & Tracking

### Vercel Analytics (Included)

- Real-time visitor tracking
- Page views and unique visitors
- Referral sources and conversion rates
- 50,000 events/month on free tier

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `FORMSPARK_FORM_ID`
     - `TURNSTILE_SITE_KEY`
     - `TURNSTILE_SECRET_KEY`

3. **Set Up Custom Domain**:
   - In Vercel project settings → Domains
   - Add `ambermoney.co` and `www.ambermoney.co`
   - Configure DNS records at your domain registrar:

     ```dns
     # For apex domain (ambermoney.co)
     Type: A
     Name: @
     Value: 76.76.19.19

     # For www subdomain
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

4. **Update Turnstile Domain**:
   - Add production domain to Cloudflare Turnstile settings:
     - `ambermoney.co` (this covers www.ambermoney.co automatically)

### Alternative Deployment

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform

## 🎨 Customization

### Brand Colors

- Primary: `#FEB204` (Amber)
- Background: `#1C1917` (Dark stone)
- Text: `#FEFEFD` (Off-white)
- Secondary: `stone-400/500/600` (Grays)

### Typography

- Brand: Gambarino (serif) - loaded from `/public/fonts/`
- Body: Inter (sans-serif) - loaded via Google Fonts

### Social Links

Update social media links in `src/app/thank-you/page.tsx`:

```typescript
// Lines 47-66 - Currently set to:
<a href="https://twitter.com/ambermoney_co" ...>
<a href="https://linkedin.com/company/ambermoney" ...>

// Update these to your actual social media handles
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/waitlist/          # Secure form submission endpoint
│   ├── thank-you/             # Post-submission thank you page
│   ├── globals.css            # Global styles and custom fonts
│   ├── layout.tsx             # Root layout with analytics
│   └── page.tsx               # Main landing page
├── components/ui/             # Reusable UI components
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   └── notification.tsx       # Toast notifications
└── lib/
    └── utils.ts               # Utility functions
```

## 🐛 Troubleshooting

### Common Issues

**Form not submitting:**

- Check browser console for errors
- Verify environment variables are set
- Ensure Turnstile script loads

**Turnstile not loading:**

- Verify domain is added to Cloudflare settings
- Check site key is correct
- Disable ad blockers for testing

**Analytics not working:**

- Ensure deployed on Vercel
- Wait 24 hours for data to appear
- Check Vercel dashboard

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) - Privacy-first CAPTCHA
- [Formspark](https://formspark.io/) - Form backend service
- [Vercel](https://vercel.com/) - Deployment and analytics

---

Built with ❤️ for the Amber personal finance app.
