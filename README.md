# 🏗️ BuildBot AI

> Intelligent Specifications. Professional Plans.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-black.svg)](https://expressjs.com/)
[![Paystack](https://img.shields.io/badge/Paystack-Integrated-blue.svg)](https://paystack.com/)
[![AI Powered](https://img.shields.io/badge/AI-Powered-ff6b6b.svg)](https://github.com/rabiuhamza11/buildbot-ai)
[![NBC Compliant](https://img.shields.io/badge/NBC-Compliant-success.svg)](https://github.com/rabiuhamza11/buildbot-ai)
[![Made in Nigeria](https://img.shields.io/badge/Made%20in-Nigeria-green.svg)](https://github.com/rabiuhamza11/buildbot-ai)

![GitHub last commit](https://img.shields.io/github/last-commit/rabiuhamza11/buildbot-ai)
![GitHub repo size](https://img.shields.io/github/repo-size/rabiuhamza11/buildbot-ai)
![GitHub issues](https://img.shields.io/github/issues/rabiuhamza11/buildbot-ai)

---

BuildBot AI is an AI-powered construction planning platform built for the Nigerian market. It generates professional construction plans, specifications, and cost estimates using artificial intelligence, with full Nigerian Building Code (NBC) compliance.

## ✨ Features

- **AI Plan Generation** — Generate detailed construction plans from project descriptions
- **Cost Estimation** — AI-powered material and labor cost estimates
- **PDF/Text Export** — Download professional plans as PDF or text
- **Voice Input** — Describe your project by voice
- **Mobile Responsive** — Works on all devices
- **NBC Compliant** — All plans follow Nigerian Building Code
- **Paystack Payments** — Subscription tiers with Paystack integration
- **Admin Dashboard** — Real-time project and revenue tracking

## 💰 Pricing Tiers

| Plan | Price | Features |
|------|-------|----------|
| Free | ₦0/mo | 3 plans/month, basic templates |
| Basic | ₦15,000/mo | 50 plans/month, PDF export, cost estimation |
| Professional | ₦45,000/mo | Unlimited plans, voice input, priority support |

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/rabiuhamza11/buildbot-ai.git
cd buildbot-ai

# Install
npm install

# Configure
cp .env.example .env
# Edit .env with your Paystack keys and MongoDB URI

# Run
npm run dev
```

## 🛠️ Tech Stack

- **Backend:** Node.js, Express, MongoDB/Mongoose
- **Frontend:** HTML5, CSS3, Vanilla JS (mobile-first)
- **Payments:** Paystack
- **AI:** OpenAI GPT integration
- **Hosting:** Base44 Functions

## 📁 Project Structure

```
buildbot-ai/
├── src/
│   ├── server.js          # Entry point
│   ├── config/            # Configuration
│   ├── middleware/        # Auth & error handling
│   ├── models/            # Payment, Plan, User models
│   ├── routes/            # API routes (auth, admin, payments, plans)
│   └── utils/             # Helper functions
├── public/                # Static frontend assets
├── scripts/               # Database seeding
├── docs-API.md            # API documentation
└── README.md
```

## 📡 Live URLs

- **App:** https://superagent-2286fb2f.base44.app/functions/buildbotAI
- **Admin:** https://superagent-2286fb2f.base44.app/functions/buildbotAdmin
- **Domain:** buildbot-ai.ng (planned)

## 👤 Author

**Rabiu Hamza Mohammed**
- Email: harzco.business@gmail.com
- Company: HARZ Construction
- GitHub: [@rabiuhamza11](https://github.com/rabiuhamza11)

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
