# BuildBot AI API Documentation

**Base URL:** `https://api.buildbot-ai.ng/api`  
**Version:** v1  
**Last Updated:** June 27, 2026

---

## 📚 Table of Contents

- [Authentication](#authentication)
- [Users](#users)
- [Plans](#plans)
- [Payments](#payments)
- [Admin](#admin)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

---

## 🔐 Authentication

All endpoints (except `/auth/*`) require Bearer token authentication.

### Headers
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

### Get Token
Send credentials to receive JWT token:

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expires_in": 86400,
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

---

## 👥 Users

### Register New User

```
POST /auth/register
```

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "securePassword123",
  "fullName": "John Doe",
  "phone": "+234 801 234 5678"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "newuser@example.com",
    "fullName": "John Doe",
    "accountType": "free"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Status Codes:**
- `201` — User created
- `400` — Invalid input
- `409` — Email already registered

### Get User Profile

```
GET /users/profile
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "fullName": "John Doe",
    "phone": "+234 801 234 5678",
    "accountType": "basic",
    "createdAt": "2024-06-27T10:30:00Z",
    "preferences": {
      "language": "en",
      "currency": "NGN",
      "notifications": true
    }
  }
}
```

### Update User Profile

```
PUT /users/profile
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "fullName": "Jane Doe",
  "phone": "+234 802 987 6543",
  "preferences": {
    "notifications": false,
    "language": "en"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { /* updated user data */ }
}
```

### Logout

```
POST /auth/logout
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 📐 Plans

### Generate Construction Plan

```
POST /plans/generate
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "3-Bedroom Apartment",
  "projectType": "residential",
  "description": "Modern 3-bedroom apartment in Lagos with open-plan living, balcony, and rooftop parking",
  "specifications": {
    "rooms": 3,
    "bathrooms": 2,
    "length": 50,
    "width": 40,
    "height": 3.5,
    "features": ["garage", "balcony", "garden", "swimming_pool"]
  },
  "location": "Lekki, Lagos",
  "budget": 8500000
}
```

**Response:**
```json
{
  "success": true,
  "plan": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "user_id",
    "title": "3-Bedroom Apartment",
    "projectType": "residential",
    "specifications": {
      "rooms": 3,
      "bathrooms": 2,
      "length": 50,
      "width": 40,
      "height": 3.5,
      "features": ["garage", "balcony", "garden", "swimming_pool"]
    },
    "generatedContent": "Detailed construction specifications...",
    "materials": [
      {
        "name": "Cement",
        "quantity": 100,
        "unit": "bags",
        "unitCost": 3500,
        "totalCost": 350000
      }
    ],
    "estimatedCost": 8500000,
    "status": "completed",
    "createdAt": "2024-06-27T10:30:00Z",
    "updatedAt": "2024-06-27T10:35:00Z"
  }
}
```

**Status Codes:**
- `201` — Plan created
- `400` — Invalid input
- `401` — Unauthorized
- `402` — Subscription required
- `503` — AI service unavailable

### Get User's Plans

```
GET /plans
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` — Page number (default: 1)
- `limit` — Items per page (default: 10)
- `status` — Filter by status (draft, completed, archived)
- `sort` — Sort by field (createdAt, title)

**Response:**
```json
{
  "success": true,
  "data": {
    "plans": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "3-Bedroom Apartment",
        "status": "completed",
        "createdAt": "2024-06-27T10:30:00Z"
      }
    ],
    "pagination": {
      "current": 1,
      "total": 5,
      "pages": 1,
      "limit": 10
    }
  }
}
```

### Get Single Plan

```
GET /plans/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "plan": { /* full plan data */ }
}
```

**Status Codes:**
- `200` — Success
- `404` — Plan not found
- `401` — Unauthorized

### Update Plan

```
PUT /plans/:id
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "specifications": {
    "rooms": 4
  }
}
```

### Delete Plan

```
DELETE /plans/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Plan deleted successfully"
}
```

### Download Plan

```
GET /plans/:id/download
Authorization: Bearer <token>
```

**Query Parameters:**
- `format` — pdf or txt (default: pdf)

**Response:** File binary (PDF or TXT)

**Status Codes:**
- `200` — File ready
- `404` — Plan not found
- `402` — Subscription required

---

## 💳 Payments

### Create Payment

```
POST /payments/create
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "planId": "507f1f77bcf86cd799439011",
  "amount": 15000,
  "planType": "basic",
  "email": "user@example.com",
  "fullName": "John Doe",
  "phone": "+234 801 234 5678"
}
```

**Response:**
```json
{
  "success": true,
  "payment": {
    "_id": "payment_id",
    "status": "pending",
    "amount": 15000,
    "reference": "ogwuolfo78",
    "authorization_url": "https://checkout.paystack.com/...",
    "access_code": "1r51ov47oy"
  }
}
```

### Verify Payment

```
GET /payments/verify/:reference
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "payment": {
    "status": "completed",
    "amount": 15000,
    "reference": "ogwuolfo78",
    "transactionDate": "2024-06-27T10:40:00Z"
  }
}
```

### Get Payment History

```
GET /payments
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` — Page number
- `limit` — Items per page
- `status` — Filter by status

**Response:**
```json
{
  "success": true,
  "payments": [
    {
      "_id": "payment_id",
      "amount": 15000,
      "status": "completed",
      "createdAt": "2024-06-27T10:40:00Z"
    }
  ],
  "pagination": { /* pagination info */ }
}
```

---

## 🛠️ Admin

### Get Dashboard Stats

```
GET /admin/dashboard
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 1500,
    "totalPlans": 5200,
    "totalRevenue": 45000000,
    "monthlyRevenue": 5200000,
    "activeSubscriptions": 450,
    "newUsersThisMonth": 120,
    "revenueGrowth": 15.5
  }
}
```

### Get All Users

```
GET /admin/users
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `page` — Page number
- `limit` — Items per page
- `search` — Search by email or name
- `accountType` — Filter by plan type

### Get All Payments

```
GET /admin/payments
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `page` — Page number
- `status` — Filter by status
- `startDate` — Date range start
- `endDate` — Date range end

---

## ⚠️ Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Email is required",
    "details": {
      "field": "email",
      "reason": "Field is mandatory"
    }
  }
}
```

### Common Error Codes

| Code | Status | Meaning |
|------|--------|---------|
| `INVALID_INPUT` | 400 | Request validation failed |
| `UNAUTHORIZED` | 401 | Invalid or missing token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource already exists |
| `RATE_LIMITED` | 429 | Too many requests |
| `SERVER_ERROR` | 500 | Internal server error |

---

## 🚦 Rate Limiting

API requests are rate-limited to prevent abuse:

**Limits:**
- Free plan: 5 requests/minute
- Basic plan: 30 requests/minute
- Professional plan: 100 requests/minute

**Headers:**
```
X-RateLimit-Limit: 30
X-RateLimit-Remaining: 25
X-RateLimit-Reset: 1624790400
```

When rate limited, you'll receive:
```
HTTP 429 Too Many Requests
```

---

## 🔄 Pagination

List endpoints support pagination:

**Request:**
```
GET /plans?page=2&limit=20
```

**Response:**
```json
{
  "success": true,
  "data": [ /* items */ ],
  "pagination": {
    "current": 2,
    "total": 50,
    "pages": 3,
    "limit": 20,
    "hasNext": true,
    "hasPrev": true
  }
}
```

---

## 📊 Status Codes

| Code | Meaning |
|------|---------|
| `200` | OK — Request succeeded |
| `201` | Created — Resource created |
| `400` | Bad Request — Invalid input |
| `401` | Unauthorized — Missing/invalid token |
| `403` | Forbidden — Insufficient permissions |
| `404` | Not Found — Resource doesn't exist |
| `409` | Conflict — Resource already exists |
| `429` | Too Many Requests — Rate limited |
| `500` | Server Error — Internal error |
| `503` | Service Unavailable — Temporary outage |

---

## 🔗 Webhook Events

### Plan Generated

```
POST /webhook/plan-generated
```

**Payload:**
```json
{
  "event": "plan.generated",
  "timestamp": "2024-06-27T10:30:00Z",
  "data": {
    "planId": "plan_id",
    "userId": "user_id",
    "status": "completed"
  }
}
```

### Payment Completed

```
POST /webhook/payment-completed
```

**Payload:**
```json
{
  "event": "payment.completed",
  "timestamp": "2024-06-27T10:40:00Z",
  "data": {
    "paymentId": "payment_id",
    "userId": "user_id",
    "amount": 15000,
    "status": "completed"
  }
}
```

---

## 📝 Examples

### cURL

```bash
# Register
curl -X POST https://api.buildbot-ai.ng/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123",
    "fullName": "John Doe"
  }'

# Generate Plan
curl -X POST https://api.buildbot-ai.ng/api/plans/generate \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "3-Bedroom Apartment",
    "projectType": "residential",
    "description": "Modern apartment in Lagos",
    "specifications": {
      "rooms": 3,
      "bathrooms": 2,
      "length": 50,
      "width": 40
    }
  }'
```

### JavaScript/Node.js

```javascript
// Install axios: npm install axios

const axios = require('axios');

const client = axios.create({
  baseURL: 'https://api.buildbot-ai.ng/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`
  }
});

// Generate plan
async function generatePlan() {
  try {
    const response = await client.post('/plans/generate', {
      title: '3-Bedroom Apartment',
      projectType: 'residential',
      description: 'Modern apartment in Lagos',
      specifications: {
        rooms: 3,
        bathrooms: 2,
        length: 50,
        width: 40
      }
    });
    
    console.log(response.data.plan);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

generatePlan();
```

### Python

```python
import requests

BASE_URL = 'https://api.buildbot-ai.ng/api'
HEADERS = {
    'Authorization': f'Bearer {TOKEN}',
    'Content-Type': 'application/json'
}

# Generate plan
response = requests.post(
    f'{BASE_URL}/plans/generate',
    json={
        'title': '3-Bedroom Apartment',
        'projectType': 'residential',
        'description': 'Modern apartment in Lagos',
        'specifications': {
            'rooms': 3,
            'bathrooms': 2,
            'length': 50,
            'width': 40
        }
    },
    headers=HEADERS
)

print(response.json())
```

---

## 📞 Support

For API issues or questions:
- **Email:** hello@buildbot-ai.ng
- **Phone:** +234 802 868 7857
- **Documentation:** https://docs.buildbot-ai.ng

---

**Last Updated:** June 27, 2026  
**API Version:** 1.0
