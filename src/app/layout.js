"use client"
import "./globals.css";

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <head>
          <meta charSet="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
          <meta name="description" content="Generated by create next app"/>
          <title>Geport</title>
      </head>
      <body>
      <div style={{maxWidth: '500px', margin: '0 auto', height: "100vh"}}>
          {children}
      </div>
      </body>
      </html>
  );
}

function disableZoom() {
    document.addEventListener('wheel', function(e) {
        if (e.ctrlKey) {
            e.preventDefault();
        }
    }, { passive: false });

    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')) {
            e.preventDefault();
        }
    });
}

window.onload = disableZoom;


