# Jeet Soni — Developer Portfolio

A cinematic, interactive developer portfolio built with React, TypeScript, Three.js, and Framer Motion.

**Live:** [jeetsoni.lovable.app](https://jeetsoni.lovable.app)

## Features

- 🌌 3D Skills Galaxy (React Three Fiber)
- 🎮 Gaming-style project mission map
- 🤖 AI chat assistant
- 📊 Analytics dashboard with charts
- 🐙 Live GitHub integration
- ✨ 20+ scroll & hover animations
- 🔒 Admin CMS dashboard
- 📱 Fully responsive (360px–1920px)

## Tech Stack

- **React 18** + TypeScript
- **Vite** — fast build tooling
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — animation system
- **Three.js** (React Three Fiber) — 3D graphics
- **Recharts** — data visualization
- **ShadCN UI** — component library

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/JS-code7/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env

# 4. Start development server
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## Deployment

### Option A: Lovable (Recommended)

1. Open your project in [Lovable](https://lovable.dev)
2. Click **Share → Publish**
3. Your app is live at `yourproject.lovable.app`

### Option B: Vercel

1. Push code to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Framework: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add environment variables from `.env.example`
7. Deploy

### Option C: Netlify

1. Push to GitHub
2. Import at [app.netlify.com](https://app.netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

## Custom Domain

1. In Lovable: **Project Settings → Domains → Connect Domain**
2. Add DNS records:
   - **A Record** `@` → `185.158.133.1`
   - **A Record** `www` → `185.158.133.1`
   - **TXT Record** `_lovable` → provided verification value
3. Wait for DNS propagation (up to 72 hours)
4. SSL is provisioned automatically

## Project Structure

```
src/
├── components/     # Reusable UI components
├── sections/       # Homepage sections
├── pages/          # Route pages
├── lib/            # API layer & utilities
├── hooks/          # Custom React hooks
└── index.css       # Design system tokens
```

## Links

- **GitHub:** [github.com/JS-code7](https://github.com/JS-code7)
- **LinkedIn:** [linkedin.com/in/jeet-soni-01bb09337](https://www.linkedin.com/in/jeet-soni-01bb09337/)

## License

MIT © Jeet Soni
