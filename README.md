# Register FUNDS (MVP2)

A React + Vite application for educational institutions to create, preview, and launch fundraising campaigns. It integrates Firebase for data storage, Stripe for payments, and OpenAI for AI-assisted content generation and chat guidance.

## Features

- Campaign creation flow with AI assistance:
  - Describe challenges and goals
  - AI chat support (`/api/ai-chat`)
  - AI content generation (`/api/ai-generate`)
  - Image upload and live preview
- Campaign browsing and detail views
- Donation flow with Stripe payments
- School profile and statistics management
- Clean UI with Tailwind CSS and Framer Motion animations
- Vercel serverless functions for Stripe and OpenAI endpoints

## Tech Stack

- Frontend: `React` (Vite), `TypeScript`, `Tailwind CSS`, `Framer Motion`
- Backend/Functions: `Vercel Serverless Functions`
- Payments: `Stripe` (`@stripe/react-stripe-js`, `@stripe/stripe-js`, `stripe`)
- Data: `Firebase` (Auth, Firestore with local persistence)
- AI: `OpenAI` (chat and content generation)
- Routing: `react-router-dom`

## Project Structure

- `src/App.tsx` — App routes
- `src/components/` — UI components
  - `Header.tsx`, `CampaignHeader.tsx`, `CampaignCard.tsx`
  - `PaymentForm.tsx` — Client-side Stripe integration
- `src/components/CreateCampaign/` — Campaign creation flow
  - `CreateCampaign.tsx` — orchestrates steps and state
  - `InitialPage.tsx` — input, image upload, and send prompt
  - `ChatWithPreviewPage.tsx` — chat + preview layout
  - `ChatOnlyPage.tsx` — chat layout
  - `FullPreviewPage.tsx` — full campaign preview
  - `ChatMessages.tsx`, `types.ts` — chat message types and campaign types
- `src/pages/` — Top-level pages
  - `LandingPage.tsx`, `CampaignsPage.tsx`, `CampaignsDetails.tsx`
  - School pages: `Overview.tsx`, `Settings.tsx`, `Campaigns.tsx`, `ActiveCampaigns.tsx`, `InactiveCampaignsPage.tsx`
  - Auth pages: `SignupPage.tsx`, `LoginPage.tsx`, `SignupSteps/`
  - `DonatePage.tsx`, `Donors/`
- `src/hooks/` — Data hooks
  - `useCampaigns`, `useAuth`, `useSchoolData`, `useSchoolProfile`
- `src/services/paymentService.ts` — Firestore logging and payment analytics
- `src/config/Firebase.ts` — Firebase initialization (Auth + Firestore)
- `api/` — Vercel serverless functions
  - `stripe.ts` — create PaymentIntent
  - `ai-chat.ts` — AI chat assistant
  - `ai-generate.ts` — AI campaign content generator
- `vite.config.ts` — Dev server and proxy configuration
- `vercel.json` — Vercel configuration for functions and build

## Environment Variables

Create a `.env` at the project root (already present). Vite reads envs prefixed with `VITE_` for client-side usage. Serverless functions read standard env vars.

Client (Vite):
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID` (optional if not using analytics)
- `VITE_STRIPE_PUBLISHABLE_KEY`

Serverless (Vercel functions):
- `STRIPE_SECRET_KEY` — Required by `api/stripe.ts`
- `OPENAI_API_KEY` — Required by `api/ai-chat.ts` and `api/ai-generate.ts`

Notes:
- Client envs must start with `VITE_`.
- Set serverless envs in the Vercel dashboard or via `vercel env`.

## Getting Started

Prerequisites:
- Node.js 18+
- NPM (or PNPM/Yarn)
- Optional: Vercel CLI for running serverless functions locally

Install dependencies:
- `npm install`

Run in development (frontend-only):
- `npm run dev`

Build for production:
- `npm run build`

Preview built app:
- `npm run preview`

Lint the project:
- `npm run lint`

### Running with Serverless Functions Locally

Option A: Use Vercel CLI (recommended for local functions):
- Install CLI: `npm i -g vercel`
- Run dev with functions: `vercel dev`

Option B: Custom backend on `http://localhost:3000`:
- The dev proxy in `vite.config.ts` forwards `/api/*` to `http://localhost:3000`
- Ensure a backend is running at port `3000` that serves the same endpoints

## Routing

Defined in `src/App.tsx`:
- `/` — Landing
- `/campaigns` — Campaign listing
- `/campaigns/:id` — Campaign details
- `/signup`, `/login`, `/signup-steps` — Auth and onboarding
- `/overview`, `/settings` — School dashboard
- `/campaign` — School campaigns management
- `/active-campaigns`, `/inactive-campaigns` — Active/draft/completed views
- `/create` — Create campaign (AI/chat-enabled)
- `/donate/:id` — Donation flow
- `/donors` — Donor page

## Campaign Creation Flow

Key components:
- `InitialPage.tsx`
  - Text input for describing the challenge
  - Plus button triggers a hidden file input for image uploads
  - ArrowUp button submits the current prompt
- `ChatWithPreviewPage.tsx`
  - Side-by-side chat and live preview (`CampaignPreview.tsx`)
  - Buttons to open `FullPreviewPage` or switch to `ChatOnlyPage`
- `FullPreviewPage.tsx`
  - Standalone preview for the campaign content and media
- `ChatOnlyPage.tsx`
  - Focused chat interface without preview

Handlers:
- `CreateCampaign.tsx` passes:
  - `onSendMessage`, `onKeyPress`, `onInputChange`
  - `onUploadImage` to append image previews in `campaignData.media`
  - Navigation handlers for switching views

## Payments

Frontend (`src/components/PaymentForm.tsx`):
- Loads Stripe with `VITE_STRIPE_PUBLISHABLE_KEY`
- Calls `/api/stripe` (serverless) to create a PaymentIntent
- Confirms the payment via `stripe.confirmCardPayment` with a `CardElement`
- Emits `onSuccess` and `onError` callbacks

Server (`api/stripe.ts`):
- Requires `STRIPE_SECRET_KEY`
- Validates amount and creates a PaymentIntent (`currency` defaults to `usd`)
- Adds permissive CORS headers for client calls

Firestore Logging (`src/services/paymentService.ts`):
- `createPaymentRecord` / `updatePaymentRecord`
- `logSuccessfulPayment` and `logFailedPayment` to `payment_logs` and `payments`
- Helper functions to compute raised amounts, donation counts, and recent donors

## AI Endpoints

- `api/ai-chat.ts`:
  - POST `{ messages }` → returns a helpful, fundraising-focused assistant reply
  - Requires `OPENAI_API_KEY`

- `api/ai-generate.ts`:
  - POST `{ schoolName, location, category, targetAmount, additionalInfo }`
  - Returns JSON `{ title, description, donationTarget, suggestedMedia }`
  - Requires `OPENAI_API_KEY`

## Firebase

`src/config/Firebase.ts`:
- Initializes Firebase app
- Exports `auth` and Firestore `db`
- Uses Firestore persistent local cache with single-tab manager

Usage:
- School and campaign data retrieved/updated via hooks (`useSchoolData`, `useSchoolProfile`, `useCampaigns`)
- Payments and logs recorded by `paymentService`

## Deployment

Vercel:
- `vercel.json` defines functions runtime (`@vercel/node@5.3.24`)
- Rewrites `/api/*` to serverless functions
- Uses `buildCommand: npm run build`, `outputDirectory: dist`
- Set `OPENAI_API_KEY` and `STRIPE_SECRET_KEY` in Vercel project envs
- Client-side envs (`VITE_*`) can be provided via Vercel envs or build-time `.env` files

## Troubleshooting

- Missing Stripe keys:
  - Client: `VITE_STRIPE_PUBLISHABLE_KEY`
  - Server: `STRIPE_SECRET_KEY`
- Missing OpenAI key:
  - `OPENAI_API_KEY` must be set for `/api/ai-chat` and `/api/ai-generate`
- Firebase envs:
  - Ensure all `VITE_FIREBASE_*` vars match your Firebase project
- Dev API calls:
  - If not using `vercel dev`, either run a backend at `http://localhost:3000` or remove/adjust the proxy under `/api` in `vite.config.ts`
- Firestore rules:
  - Configure Firestore security rules appropriate to your environment

## Scripts

- `npm run dev` — Start Vite dev server
- `npm run build` — TypeScript build + Vite production build
- `npm run preview` — Preview built app
- `npm run lint` — Run ESLint checks

## License

Proprietary (no license file). Add licensing details as appropriate for your project.