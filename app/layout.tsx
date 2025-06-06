import { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import madnessBgImg from "./the_madness_bg_cut.jpg";
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
          backgroundImage: `url('${madnessBgImg.src}'), url('data:image/jpeg;base64,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')`,
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
          <source src="/the_madness_bg_cut_ffmpeg_24.mp4" type="video/mp4" />
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
