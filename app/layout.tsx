import { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import bgImg from "./impending_doom_bg_cut_720_ffmpeg_24.jpg";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  preload: true,
});

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
      style={{ minHeight: "100vh" }}
    >
      <head>
        <meta itemProp="name" content="Exelerate" />
        <meta name="author" content="Exelerate" />
        <meta name="author" content="Io Klarstrup" />
        <meta name="author" content="Stefan Jensen" />
        <meta name="author" content="Stig Eilsøe-Madsen" />
        <meta name="author" content="Mads Nikolai Sørensen" />
        <script>
          {`
!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
twq('config','ptxbg');
          `}
        </script>
      </head>
      <body
        className={bebasNeue.className}
        style={{
          margin: 0,
          padding: "16px",
          minHeight: "100vh",
          backgroundImage: `url('${bgImg.src}'), url(data:image/jpeg;base64,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)`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          //          animation: "blurIn 666ms forwards ease-out",
        }}
      >
        <video
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: -1,
            objectFit: "cover",
          }}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/impending_doom_bg_cut_720_ffmpeg_24.mp4" type="video/mp4" />
        </video>
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
