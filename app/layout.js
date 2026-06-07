import "./globals.css";

export const metadata = {
  title: "SameerAlam | Portfolio & Learning Tracker",
  description: "Front-end Developer portfolio of Sameer Alam including real-time progress tracker and timeline of daily learning milestones.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          src="https://kit.fontawesome.com/4c15033a42.js"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
