# Tracing

Mobile-first PWA for AR image tracing.

## Features

- Live camera feed with image overlay
- Adjustable overlay opacity for tracing
- One-tap background removal
- Load photos from camera roll, gallery, or downloads
- Installable to mobile home screen (PWA)

## Tech Stack

Next.js · Tailwind CSS · next-pwa

## Local Development

npm install
npm run dev

To test on mobile (same WiFi network):
- Find your machine's local IP (e.g. 192.168.x.x)
- Open http://<your-ip>:3000 in your mobile browser
- Note: camera access requires HTTPS on most mobile browsers — use ngrok or similar for a secure tunnel if needed

## PWA Install

Visit the app URL in mobile Safari/Chrome → Share → Add to Home Screen.

## License

MIT
