# Guide on Phone

Production-ready full-stack platform that connects travelers with verified local phone guides.

## Architecture
- Frontend: Next.js 14 + TypeScript + Tailwind + Framer Motion
- Backend: Node.js + Express + TypeScript + MongoDB (Mongoose)
- Auth: JWT + role-based access (`USER`, `AGENT`, `ADMIN`)
- Payments: Razorpay order + signature verification flow
- Verification: automated Aadhaar OTP + selfie face match + GST registry checks (no manual admin approval)

## Key Features
- Traveler auth, search guides by city/state, bookings, payment history, reviews.
- Agent onboarding with 6-step automated verification flow and instant approve/reject decisioning.
- Admin panel for monitoring and platform analytics (manual verification is disabled).
- Commission split logic: default 10% platform, 90% agent.

## Project Structure
- `backend/` Express API, DB models, services, controllers, routes.
- `frontend/` Next.js application with landing, auth, dashboards, guide pages.

## Local Setup
1. Install dependencies from repo root:
   ```bash
   npm install
   ```
2. Backend env:
   - Copy `backend/.env.example` to `backend/.env` and fill values.
3. Frontend env:
   - Copy `frontend/.env.local.example` to `frontend/.env.local`.
4. Start backend:
   ```bash
   npm run dev:backend
   ```
5. Start frontend:
   ```bash
   npm run dev:frontend
   ```

## API Base
- Local backend: `http://localhost:5000`
- Versioned routes: `/api/v1`

## Automated Agent Verification API
- `POST /api/v1/agent/register`
- `POST /api/v1/agent/aadhaar/send-otp`
- `POST /api/v1/agent/aadhaar/verify-otp`
- `POST /api/v1/agent/upload-selfie`
- `POST /api/v1/agent/face-verify`
- `POST /api/v1/agent/gst-verify`
- `POST /api/v1/agent/complete-verification`

## Security
- JWT auth middleware
- Password hashing (bcrypt)
- Input validation with Zod
- Rate limiting
- Helmet + CORS
- Payment signature verification

## Deploy
### Frontend (Vercel)
- Set `NEXT_PUBLIC_API_BASE_URL` to Render backend URL + `/api/v1`.
- Deploy from `frontend/`.

### Backend (Render)
- Deploy from `backend/`.
- Set environment variables from `backend/.env.example`.
- Use MongoDB Atlas `MONGODB_URI`.

### MongoDB Atlas
- Create cluster and whitelist backend egress.
- Add credentials in `MONGODB_URI`.

## Notes
- `frontend/public/favicon.ico` is a placeholder. Replace with a valid icon.
- Razorpay checkout UI can be attached to the order creation endpoint in production.
