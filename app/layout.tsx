import { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import bgImg from "./bg.jpg";
import "./globals.css";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Exelerate", template: "%s | Exelerate" },
  description: "Danish Power Thrash Metal quartet from Copenhagen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      itemScope
      itemType="http://schema.org/Organization"
      style={{ height: "100vh", width: "100vw" }}
    >
      <head>
        <meta itemProp="name" content="Exelerate" />
        <meta name="author" content="Exelerate" />
        <meta name="author" content="Io Klarstrup" />
        <meta name="author" content="Stefan Jensen" />
        <meta name="author" content="Stig Eilsøe-Madsen" />
        <meta name="author" content="Mads Nikolai Sørensen" />
      </head>
      <body
        className={bebasNeue.className}
        style={{
          margin: 0,
          padding: "16px",
          minHeight: "100vh",
          width: "100vw",
          backgroundImage: `url('${bgImg.src}'), url('${bgImg.blurDataURL}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          animation: "blurIn 666ms forwards ease-out",
        }}
      >
        {children}
        <div hidden>
          <div itemProp="brand">Power Thrash Metal</div>
          <div itemProp="member" itemScope itemType="http://schema.org/Person">
            <span itemProp="name">Stefan Jensen</span>
            <span itemProp="jobTitle">Singer</span>
            <span itemProp="jobTitle">Rhythm Guitarist</span>
          </div>
          <div itemProp="member" itemScope itemType="http://schema.org/Person">
            <span itemProp="name">Io Klarstrup</span>
            <span itemProp="jobTitle">Bass Guitarist</span>
          </div>
          <div itemProp="member" itemScope itemType="http://schema.org/Person">
            <span itemProp="name">Mads Nikolai Sørensen</span>
            <span itemProp="jobTitle">Lead Guitarist</span>
          </div>
          <div itemProp="member" itemScope itemType="http://schema.org/Person">
            <span itemProp="name">Stig Eilsøe-Madsen</span>
            <span itemProp="jobTitle">Drummer</span>
          </div>
        </div>
      </body>
    </html>
  );
}
