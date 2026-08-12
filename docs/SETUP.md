# Healthcare ResuAIBuilder setup

## Environment variables

Copy .env.example into the relevant Vercel environments. Never expose SUPABASE_SERVICE_ROLE_KEY, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET, or AI-provider keys with a VITE_ prefix.

Required client variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.

Required server variables: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET and RAZORPAY_WEBHOOK_SECRET.

Configure at least one AI key and set AI_PROVIDER to gemini, openai, or groq. The server automatically tries configured fallbacks.

## Supabase

Run supabase/migrations/202608120001_healthcare_platform.sql in a test project first, then production. It creates healthcare profiles, CVs, sections, credentials, job descriptions, ATS analyses, cover letters, applications and subscription records. Row Level Security restricts normal access to auth.uid() = owner_id. Subscription writes remain server-only.

In Authentication settings:

1. Add the production URL and Vercel preview pattern to allowed redirect URLs.
2. Enable email/password and email confirmation.
3. For Google, create OAuth credentials, add Supabase's callback URL in Google Cloud, then enable Google in Supabase.
4. Use the production domain for password-reset redirects.

Create a private files storage bucket. Add policies that restrict object paths to the authenticated user's folder. Do not make healthcare CV uploads public.

## Razorpay

1. Add test-mode keys in Vercel Preview and live keys only in Production.
2. Create a webhook pointing to https://YOUR_DOMAIN/api/razorpay-webhook.
3. Subscribe to payment.captured.
4. Save the webhook secret as RAZORPAY_WEBHOOK_SECRET.
5. Test one successful, one failed and one duplicate webhook delivery. Event/payment IDs provide idempotency.
6. Confirm international cards are enabled on the Razorpay account if selling outside India. Checkout is currently denominated in INR; the customer's bank/card network performs conversion.

Launch pricing: ₹199 monthly, ₹999 annual and ₹2,499 lifetime. Lifetime should be described in the legal terms as access for the supported lifetime of the product/account, subject to the refund policy and fair-use limits.

## AI providers

AI calls execute only in /api/ai-assist; keys never reach the browser. The endpoint limits requests, caps and cleans input, accepts only supported tasks, forbids invented clinical claims and returns drafts requiring user verification.

For production, replace in-memory rate limiting with a durable store and add authenticated per-plan quotas.

## Security and privacy

- Never collect patient-identifying information.
- Do not display full passport, Aadhaar or private credential document numbers.
- Do not log CV bodies, uploaded documents or AI prompts.
- Keep the service-role key server-only.
- Add file magic-byte validation and malware scanning before enabling production CV imports.
- Add account/data deletion UI before launch.

## Known implementation limits

- Existing resume import calls a local extraction service and must remain disabled until a secure Vercel-compatible parser is implemented.
- Existing visual PDF paths include raster/canvas output; ATS-safe selectable-text PDF and DOCX require a document-rendering migration.
- The original repository has legacy lint errors and mixed Tailwind/styled-components/CSS architecture.
- Browser-based end-to-end auth/payment testing requires configured preview credentials.
