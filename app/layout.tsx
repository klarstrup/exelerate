import { Allerta_Stencil } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const allertaStencil = Allerta_Stencil({ weight: "400", subsets: ["latin"] });

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
      style={{ height: " 100vh", width: "100vw" }}
    >
      <head>
        <meta name="author" content="Exelerate" />
        <meta name="author" content="Io Klarstrup" />
        <meta name="author" content="Stefan Jensen" />
        <meta name="author" content="Stig Eilsøe-Madsen" />
        <meta name="author" content="Mads Nikolai Sørensen" />
      </head>
      <body
        className={allertaStencil.className}
        style={{
          margin: 0,
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundImage: `url('/img/Exelerate 06sep2022_058-4K-min50.jpg'), url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAACI9JREFUWEedl0mrJFkZhp8TcU6MmbduVXW12l3tsFFcKAgiguDateBGRPciuHEjjT9AdKkgNLhWRFxJr7RFXejKYeWixaHbroG69+YQEWeOI+dkVtvg0GpAbiIj8zzf+73fEOLWp7+Y2iQY15o+SZRokG1HO3Rsty23LzrujA23esUgayohcGFlspGrxfNocjyaLNfaoq0lrZ4gPHMdsVUEArfWwOgdqzM8NAvoGcwMbkHc/8yXk0QwpJoeiapaVNvSDB2bTctlhhgbLjrFoCoqBC4mjiZyvXgez44ns+W4WKJ3sHqSCPgqYkQkpkC9eqS3RGv465sAC1iD+MgXXiwAvZB0taJRzQmg7xiGloux4XJQbDtJLyvEWxS4XgJXs2O/OKyxiOCpUgAiXkRsitg14IMnOoMzmis981AvsGiwDvGpL30z1ULQS0nfKNqmRXUtTdfSdy2bQXHRSbZdTZcBAJsVsJGbJbBbHLN2ROupo6cmQlrxrJgYWUJgcRZrNUYvHPTMq/OCXgwYj/j8i99NshJ0rWRoG7r+nIK2pWsVY5ejrxnbDCDIBC6cAXRgv3iMcSTnUWtAppXEil8TS4hMzjNZy2LyoTPzMnM9a/4wG6wOiK9840dJ1oK+U/T9CSBHr5qGppGMjWTTZoCK9inA2QM7HThoj82RhAwQkaywJmxcmd3KwTqOxjJnAD2j55njtHA9WR4vHvH1l36S6rqizy4f2rMCDVIplKrpVc2mrRibmlZlBbIJV452LdEftcdZTxXDGSCR4oo5V8reOA7GsmiNMTNmWZinhePRcJg94qXv/ypJWdF3Df14ApCNopY1sq7pVMXQPAWoENW5CmyOPjBph7fhBJBW6pRY44p2kaMJ7PVJgcWeTGj1gp40x6NmmiziBz/+TQHourYo0HQ5eomoK6pK0GY4VRUPtI0s93IZTgXAM2tP8FmBiEqJal0JIaLP32eAyTqMcwRn8dqg54XjYWGaDOLln/4+yfoE0GeAtqGq62K2/FE19E3N0Eq6RlFVVTHYbANH7ViMI/iswIpMCbGueBeYs/TasdeexWXIQAyeYC2mAGQvaMQrv/htqrPUOQVdh1IKasGaErBSV9CpmqFrCkB+tjjc5kOyux3Rx3Jwlp8YcS6nxrKfDUfjMT6yrivEtTQrM2sOx4njcUb8/Je/PgE0LW3bIqUskYc1/yhSVYlWScauo2sb6loSUkJbXwCM/QdAlc4GtI5p0QVgMq6kTCRBlUMKAbNoDocjh+MR8crPfprqKue3oVVtMV6O3kdPWEM2fQEYur4oJGtFzADOsxhTAPKfiiL/+QBrOcwL+3lhtj6LQl1JpKhI64rRWYED++MB8fLLPzwByIZGtVSiIuY8Blcg8pXhhr6nbwekVAXQ+BOAdWeAlQIRQ0AbzWGe2c8zi/WkVKHqhqaWkAHy99Oe3XGP+P73vpOysTJAfiiPm5DzGCwu+FL3uT2P/cDQjWeA3EU9ugBY1hip1ixzBsj3NftpYj9PxYBZ/FZ2tFKVZ4zNADt2x2vEt779tVSLmqZWqEohEIQQsMGXIUJV0bUdY78pAErmFOQ54lmsxT0FSCvZAwUg9/z5wK4AWAR5znR0Mge4Yu3CfrpiNz1AfPXFz6VaVCcAkediBogngHWlqiV9N7I9A0jZZBXRJQW2pCDFQJ0idZ4DwaHtXABupj2zM0WBDNBLRU3A2j376XdcHRziM5/9UFGgzaO4klRJENaEWxMh7weqZ9tvuRi2jN2ArBrCCksutdxgrCuHNuROGCBmY+b833A9PWJnHkOCUcKQKzyrp+H6Bl5/DcS9D5KGCi7V6SFZQRTgc800F4z989wZ73B73DI2fXGzj6J0wtxkcikSLF0y5VOvM85dFYCHO/jLDRyO8M58RgXSwAz8qdj71O9yx/nnawTxLnj/7Wd5bvssd4cNY9NQU2MD7Ezkyey5nvNcX7iIOy54hFoLD7treHWBw7/883/c/PcA+Zk78MJz93nh4pK7XccgTykyPnGjI28cHa/uNevVgfeYh/lxurIFwg3w6tsc/p8VAC7u3+f+M7e5Nw5ctoq+qkuzya11r0PZBx/sNfbxzN1wwyVHmrcA/Pn/AbjDyG3u0b1jQ/eOnnHbss2rmVK04gTgzpvOThsOi8FPhmbvaPeOCoNnzw7z3yogElyw4RnexwW3GGhfUNTPVNTbCtXnpUTR506ZyzRXSd71vGN2usx5rz1ijlTzStp5zKTZc81Drrh+Ow88x4fTiOIuI7cuB4ZnG9StCjGu0K/UraCRirZuUUKVThnX3Ccsi9cYZ/DGk3QiLRCmgN5p9rsbrvhTAVDANhdVXmiBv70FSnz04hOpbRTbTc9m09OPinrIbgqkNiJUKt2vqbvy0lKRh1XERYsJy5sA0UCcwc+R5aDZX91wbf7KhC7G3JwBskHfAPZPy/AT7/tkykNi0/aMfU/XS+o+kVpPajxCUSZgU/flpeUEsOJywwlZAY3PEy9Hv4CbInMGuLnhyfQaRxb6bOhSIT0RzRPg8VOAj73340lVkm0B6Oj6ugDQZYBwApANbQYQHbWQxAJg0VkBq8tWHJdEnM4Ae8PNkx1vhNc4FNHh3lmFFXgAuKcA7+0+mLpGcrnpuNi09BtJPSZEH6GL1E1FkydZPdBUXVEg7wMmuuKB2S7YxRHnyHpIhMPKfG15shx4ndf/bZ97aoNzI6q4yy2eEyObdyua27kCBNVY0eQXFDXQZwCRAfJGBEv0HJ3mYBaWSRMPFnEdWR+s6BT4M5rI1dt2gn/qhLmbXb4b2nvQXQiG/l1s1S0GOdKKDpEkLgmmELi2lkfLzKPDnvXJFdu/6eL4hYpDWcCy5f7z9a9bcf7tB+D5O3B3hNvN82zrbQEgSexasQ8rb1jHH6cj3DyAP5q8w/7P198BFbqPiI+52GQAAAAASUVORK5CYII=')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
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
