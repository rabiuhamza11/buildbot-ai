# 📘 BuildBot AI - AI Construction Planning Platform

BuildBot AI is a modern, AI-powered web application that generates professional construction plans, technical specifications, and project documents specifically for the Nigerian market. Designed for homeowners, contractors, developers, and real estate professionals, BuildBot AI simplifies construction planning by leveraging artificial intelligence to create accurate, standards-compliant documentation.

**Built by:** [HARZ Construction](https://harzco.business) | **Location:** Yelwan Shendam, Plateau State, Nigeria

---

## ✨ Features

✅ **AI-Powered Plan Generation** – Generate accurate construction documents from natural language descriptions  
✅ **Voice Input Support** – Speak your requirements using speech-to-text technology  
✅ **Multiple Project Types** – Residential homes, commercial buildings, schools, hospitals, industrial facilities  
✅ **Complete Technical Specs** – Dimensions, materials, construction methods, plumbing & electrical systems  
✅ **Nigerian Compliance** – Follows NBC (Nigerian Building Code) and local authority regulations  
✅ **Multiple Output Formats** – Download as PDF or editable text files  
✅ **Tiered Pricing** – Free, Basic, and Professional plans for every budget  
✅ **Mobile Responsive** – Optimized for phones, tablets, and desktop computers  
✅ **Secure Payments** – Card, bank transfer, mobile money, USSD support  
✅ **Project Management** – Save, edit, and manage multiple projects  
✅ **Admin Dashboard** – Monitor usage, manage users, view transactions

---

## 📁 Project Structure

```
buildbot-ai/
├── public/                    # Frontend assets
│   ├── index.html            # Main application page
│   ├── app.js                # Core app logic and state management
│   ├── styles.css            # Application styling (Tailwind CSS)
│   ├── admin/
│   │   ├── index.html        # Admin dashboard
│   │   ├── login.html        # Admin authentication
│   │   └── admin.js          # Admin panel logic
│   ├── pages/
│   │   ├── terms.html        # Terms of Service
│   │   ├── privacy.html      # Privacy Policy
│   │   ├── refund.html       # Refund Policy
│   │   └── about.html        # About BuildBot AI
│   ├── images/               # Brand assets and icons
│   └── assets/               # Fonts, SVGs, etc.
│
├── src/                       # Backend source code
│   ├── server.js             # Express server & routes
│   ├── config/
│   │   ├── database.js       # Database configuration
│   │   ├── payment.js        # Payment provider setup
│   │   └── ai.js             # AI service configuration
│   ├── routes/
│   │   ├── auth.js           # User authentication endpoints
│   │   ├── plans.js          # Plan generation endpoints
│   │   ├── payments.js       # Payment processing endpoints
│   │   └── admin.js          # Admin endpoints
│   ├── models/
│   │   ├── User.js           # User schema
│   │   ├── Plan.js           # Construction plan schema
│   │   └── Payment.js        # Payment transaction schema
│   ├── middleware/
│   │   ├── auth.js           # Authentication middleware
│   │   └── errorHandler.js   # Error handling
│   └── utils/
│       ├── aiClient.js       # AI API wrapper (OpenAI/Google AI)
│       ├── paymentClient.js  # Payment provider wrapper
│       └── logger.js         # Logging utility
│
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies
├── package-lock.json        # Dependency lock file
└── README.md                # This file
```

---

## 🚀 Installation & Setup

### 1. Prerequisites

- **Node.js** v18+ and npm v9+ ([Download](https://nodejs.org/))
- **Git** for version control
- **AI API Key** (OpenAI GPT-4, Google Gemini, or Claude API)
- **Payment Provider Account** (Paystack, Flutterwave, or local bank integration)
- **Database** (MongoDB Atlas free tier or local MongoDB)

### 2. Clone the Repository

```bash
git clone https://github.com/rabiuhamza11/buildbot-ai.git
cd buildbot-ai
```

### 3. Install Dependencies

```bash
npm install
```

This installs all required packages from `package.json`:
- Express.js (server framework)
- MongoDB/Mongoose (database)
- OpenAI SDK (AI integration)
- Stripe/Paystack SDK (payments)
- JWT (authentication)
- CORS and security middleware

### 4. Configure Environment Variables

Create a `.env` file in the root directory. Use `.env.example` as a template:

```bash
cp .env.example .env
```

Then edit `.env` with your actual values:

```env
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=localhost

# Database
MONGODB_URI=mongodb://localhost:27017/buildbot-ai
# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/buildbot-ai?retryWrites=true&w=majority

# AI Service (Choose one)
AI_PROVIDER=openai  # Options: openai, google, claude
AI_API_KEY=sk-proj-xxxxxxxxxxxx

# Payment Provider
PAYMENT_PROVIDER=paystack  # Options: paystack, flutterwave, stripe
PAYSTACK_SECRET_KEY=sk_live_xxxxxxxxxxxx
PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxxxx

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
SESSION_SECRET=your_session_secret_key

# Admin Credentials (Change in production!)
ADMIN_EMAIL=admin@buildbot.ng
ADMIN_PASSWORD=$2b$10$hashedpasswordhere

# Email Service (for notifications)
EMAIL_SERVICE=gmail
EMAIL_USER=notifications@buildbot-ai.ng
EMAIL_PASSWORD=your_app_password

# App Settings
APP_NAME=BuildBot AI
APP_URL=http://localhost:3000
PAYMENT_CALLBACK_URL=http://localhost:3000/api/payments/callback

# Logging
LOG_LEVEL=debug  # debug, info, warn, error
```

### 5. Set Up Database

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# macOS
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify connection
mongosh
```

**Option B: MongoDB Atlas (Recommended for production)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Add to `.env` as `MONGODB_URI`

Initialize database schema:
```bash
npm run seed:db
```

### 6. Set Up AI Service

**Using OpenAI (Recommended)**
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create API key
3. Add to `.env` as `AI_API_KEY`

**Using Google Gemini**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Get API key
3. Set `AI_PROVIDER=google` in `.env`

**Using Anthropic Claude**
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Get API key
3. Set `AI_PROVIDER=claude` in `.env`

### 7. Set Up Payment Provider

**Using Paystack (Best for Nigeria)**
1. Sign up at [Paystack](https://paystack.com)
2. Get Secret Key from Dashboard → Settings
3. Add to `.env` as `PAYSTACK_SECRET_KEY`

**Using Flutterwave (Alternative)**
1. Sign up at [Flutterwave](https://flutterwave.com)
2. Get API keys
3. Update payment config in `src/config/payment.js`

### 8. Run the Application

**Development Mode (with auto-reload)**
```bash
npm run dev
```

Runs on `http://localhost:3000` with nodemon watching for file changes.

**Production Mode**
```bash
npm run build
npm start
```

Optimized build with minified assets.

**Run Tests**
```bash
npm test
```
