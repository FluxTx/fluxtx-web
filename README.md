# FluxTx — Coming Soon
Vite + React 19 + TypeScript + Tailwind v4 + Motion. Email notify via Resend (Vercel Function `api/notify.ts`).

## Run
```bash
npm install
npm run dev            # UI only (no /api)
npx vercel dev         # UI + /api/notify locally (needs .env.local)
npm run build
```
## Deploy to Vercel
1. Push to GitHub, import in Vercel (Vite auto-detected).
2. Resend: verify your sending domain, create a **Segment**, copy its ID. Set env vars from `.env.example` in Vercel.
3. Deploy. Signups (`/api/notify`) are saved as Resend contacts in that segment.
4. GitHub repo > Settings > Webhooks > Add: URL `https://<your-domain>/api/github-release`, content type `application/json`, secret = `GITHUB_WEBHOOK_SECRET`, event **Releases** only.
5. When a release is published as a full release, or a pre-release is edited and "Set as the latest release"/un-ticked as pre-release, GitHub sends `action: released` and FluxTx emails the segment (Resend Broadcast with unsubscribe link). Pre-releases and drafts are ignored.
Test: use the webhook page "Redeliver" or send a `ping` (returns `pong`).

## Animate UI
`components.json` already registers `@animate-ui`. Install components on your machine (the registry could not be reached from the build sandbox):
```bash
npx shadcn@latest add @animate-ui/<component-name>
```
Browse names at https://animate-ui.com/docs. Current animations use `motion` directly (`Reveal` in `src/components/ui.tsx`).
