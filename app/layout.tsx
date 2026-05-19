import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Untapped Academy",
  description: "Internal training for Untapped associates. Become a verified AI-fluent recruiter.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="heatmap-bar" />
        <nav className="nav">
          <a href="/" className="brand" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="brand-mark">U</div>
            <div className="brand-text">
              Untapped Academy
              <span className="sub">// Internal training</span>
            </div>
          </a>
        </nav>
        <main className="stage">{children}</main>
        <footer className="foot">
          <div>Untapped Academy &middot; Internal training</div>
          <div>v1.0</div>
        </footer>
      </body>
    </html>
  );
}
