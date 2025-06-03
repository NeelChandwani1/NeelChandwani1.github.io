This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

# Neel Chandwani's Portfolio

[![Deploy to GitHub Pages](https://github.com/NeelChandwani1/NeelChandwani1.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/NeelChandwani1/NeelChandwani1.github.io/actions/workflows/deploy.yml)

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. The site is built and deployed to the `gh-pages` branch on every push to the `main` branch.

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Manual Deployment

To manually deploy to GitHub Pages:

```bash
# Build and export the static site
npm run build
npm run export

# The site will be exported to the `docs` directory
# Commit and push the changes to trigger the GitHub Actions workflow
git add .
git commit -m "Update portfolio"
git push origin main
```

## 🛠 Technologies Used

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (Animations)
- React Icons

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
