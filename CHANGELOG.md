# BuildBot AI — Changelog

## v2.0.0 — July 12, 2026

### Major Upgrades
- **July 2026 Nigerian Market Prices** — updated all material costs:
  - Cement (42.5N): ₦11,300/bag
  - 9-inch blocks: ₦800/unit
  - 6-inch blocks: ₦600/unit
  - Iron rods 12mm: ₦8,500/length
  - Iron rods 16mm: ₦12,000/length
  - Sharp sand: ₦35,000/tonne
  - Granite 3/4: ₦55,000/tonne
  - Standard build rate: ₦350,000/sqm
- **SVG Floor Plan Generator** — instant visual layout:
  - Labelled rooms (Living Room, Bedrooms, Kitchen, Dining, WC, Hall)
  - Compass rose with N indicator
  - Dimension markers (L × W in metres)
  - Scale bar
  - Gold door indicators
- **Itemized Materials Breakdown** — per-line ₦ totals for every material
- **Garage, Balcony, Boys Quarters** — auto-added to floor plan when selected
- **Extended project cost summary** — 7-line breakdown by construction phase
- **Monospace output** — cleaner professional spec display
- **Quick Cost Estimator** — hero section instant estimate with 4 project types

### Technical
- Base44 backend function: /functions/buildbotAI (live)
- Save endpoint: /functions/buildbotSave
- Payment: /functions/buildbotPaymentWebhook (Paystack)
- Admin: /functions/buildbotAdmin

## v1.0.0 — June 27, 2026
Initial release — AI construction planning for Nigeria
