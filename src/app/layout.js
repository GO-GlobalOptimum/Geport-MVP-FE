import "./globals.css";

export const metadata = {
    title: "Geport",
    description: "Generated by create next app"
};
export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body>
      <div style={{maxWidth: '500px', margin: '0 auto', height: "100vh"}}>
          {children}
      </div>
      </body>
      </html>
  );
}



