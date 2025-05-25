import { DiscogsClient } from "@lionralfs/discogs-client";
import { formatDistanceToNowStrict, isToday, setHours } from "date-fns";
import Image from "next/image";
import { Fragment } from "react";
import FTVLogo from "./ftv-logo.png";
import logoImg from "./logo.png";
import { testimonials } from "./reviews";

export const revalidate = 600;

namespace Songkick {
  export interface Event {
    id: number;
    displayName: string;
    type: Type;
    uri: string;
    status: Status;
    popularity: number;
    start: End;
    performance: Performance[];
    ageRestriction: null | string;
    flaggedAsEnded?: boolean;
    venue: Venue;
    location: Location;
    end?: End;
    series?: Series;
  }

  export interface End {
    date: Date;
    time: null | string;
    datetime: null | string;
  }

  export interface Location {
    city: string;
    lat: number;
    lng: number;
  }

  export interface Performance {
    id: number;
    displayName: string;
    billing: Billing;
    billingIndex: number;
    artist: MetroArea;
  }

  export interface MetroArea {
    id: number;
    displayName: string;
    uri: string;
    identifier?: Identifier[];
    country?: Series;
  }

  export interface Series {
    displayName: string;
  }

  export interface Identifier {
    mbid: string;
    href: string;
  }

  export enum Billing {
    Headline = "headline",
    Support = "support",
  }

  export enum Status {
    Ok = "ok",
  }

  export enum Type {
    Concert = "Concert",
    Festival = "Festival",
  }

  export interface Venue {
    id: number | null;
    displayName: string;
    uri: null | string;
    metroArea: MetroArea;
    lat: number | null;
    lng: number | null;
  }

  export interface EventDetails {
    location: Location;
    popularity: number;
    uri: string;
    displayName: string;
    id: number;
    type: string;
    start: Start;
    ageRestriction: string;
    performance: Performance[];
    venue: VenueDetails;
    status: string;
    series?: Series;
  }

  export interface Location {
    city: string;
    lng: number;
    lat: number;
  }

  export interface Performance {
    artist: City;
    displayName: string;
    billingIndex: number;
    id: number;
    billing: Billing;
  }

  export interface City {
    uri: string;
    displayName: string;
    id: number;
    identifier?: Identifier[];
    country?: Country;
  }

  export interface Country {
    displayName: string;
  }

  export interface Identifier {
    href: string;
    mbid: string;
  }

  export interface Start {
    time: string;
    date: Date;
    datetime: string;
  }

  export interface VenueDetails {
    metroArea: City;
    city: City;
    zip: string;
    lat: number;
    lng: number;
    uri: string;
    displayName: string;
    street: string;
    id: number;
    website: string;
    phone: string;
    capacity: number;
    description: string;
  }
}

export default async function Home() {
  const nextShows: Songkick.Event[] | undefined = await fetch(
    `https://api.songkick.com/api/3.0/artists/6777179-exelerate/calendar.json?apikey=${process.env.SONGKICK_APIKEY}`,
    { next: { revalidate: 12000 } }
  )
    .then((res) => res.json())
    .then((res) => res.resultsPage?.results?.event);
  const nextShow: Songkick.EventDetails | undefined =
    nextShows &&
    (await fetch(
      `https://api.songkick.com/api/3.0/events/${nextShows[0].id}.json?apikey=${process.env.SONGKICK_APIKEY}`,
      { next: { revalidate: 12000 } }
    )
      .then((res) => res.json())
      .then((res) => res.resultsPage?.results?.event));

  return (
    <>
      <Image
        src={logoImg.src}
        alt="Exelelogo"
        width={300}
        height={378}
        style={{
          height: "40vh",
          width: `${0.4 * (logoImg.width / logoImg.height) * 100}vh`,
        }}
        className="mx-auto block"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="mainStuff"
          style={!nextShow ? { gridTemplateColumns: "initial" } : undefined}
        >
          <div
            id="exeleLinks"
            style={!nextShow ? { textAlign: "center" } : undefined}
          >
            <a
              href="https://targetgroup.bandcamp.com/album/exelerate"
              title="CD & LP"
              target="_blank"
            >
              CD & LP
            </a>
            <a
              href="https://www.facebook.com/Exelerateband"
              title="Main social"
              target="_blank"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/exeleratedk"
              title="Secondary social"
              target="_blank"
            >
              Instagram
            </a>
            <a
              href="https://open.spotify.com/artist/0jRw54h5J5HeIkexDiOHZC"
              title="song downloading/purchasing"
              target="_blank"
            >
              Spotify
            </a>
            <a
              href="https://youtube.com/user/ExelerateDK"
              title="Videos"
              target="_blank"
            >
              YouTube
            </a>
            <a
              href="https://fromthevaults.dk/"
              target="_blank"
              title="From The Vaults"
              className="ftvLink fixed"
              style={{ top: "5vh", right: "5vw" }}
            >
              <Image
                src={FTVLogo}
                width={75}
                height={85}
                alt="From The Vaults"
                style={{
                  maxWidth: "7.5vh",
                  marginTop: "0.125em",
                }}
                className="h-auto"
              />
            </a>
          </div>
          {nextShow ? (
            <div className="nextGig">
              Next show is
              <div>
                {isToday(new Date(nextShow.start.datetime)) ? null : <>in </>}
                <a target="_blank" href={nextShow.uri}>
                  <time
                    title={`${nextShow.start.date}  ${nextShow.start.time}`}
                    dateTime={nextShow.start.datetime || undefined}
                  >
                    {isToday(new Date(nextShow.start.datetime)) ? (
                      <>today</>
                    ) : (
                      formatDistanceToNowStrict(
                        new Date(
                          nextShow.start.datetime ||
                            setHours(new Date(nextShow.start.date), 16) ||
                            ""
                        ),
                        { unit: "day" }
                      )
                    )}
                  </time>
                </a>{" "}
                at
              </div>
              <a
                className="venue"
                target="_blank"
                href={
                  nextShow.venue?.website ||
                  `https://maps.google.com/maps?q=${
                    (nextShow.venue && nextShow.venue.displayName) ||
                    nextShow.location.city
                  }`
                }
              >
                <span className="whitespace-nowrap">
                  {nextShow.series?.displayName ||
                    (nextShow.venue.id && nextShow.venue.displayName) ||
                    nextShow.location.city}
                </span>
              </a>
              {nextShow.performance.length > 1 ? (
                <>
                  <br />
                  with{" "}
                  <div className="otherHeadliners">
                    {nextShow.performance
                      .filter((p) => p.displayName !== "Exelerate")
                      .map((p, i) => (
                        <Fragment key={p.artist.id}>
                          {i ? <> </> : null}
                          <a target="_blank" href={p.artist.uri}>
                            <em>{p.displayName.replace(" (DK)", "")}</em>
                          </a>
                        </Fragment>
                      ))}
                  </div>
                </>
              ) : null}
              {nextShows && nextShows.length > 1 ? (
                <div className="whitespace-nowrap">
                  +{" "}
                  <a
                    target="_blank"
                    href={`https://www.songkick.com/artists/6777179-exelerate`}
                    style={{ fontSize: "0.8em" }}
                  >
                    <big>{nextShows.length - 1} future shows</big>
                  </a>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        {/* Testimonials section, styled with tailwind!!! */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 max-w-6xl mx-auto px-4 py-8 gap-x-4">
          {await Promise.all(
            testimonials.map(async (testimonial) => {
              const songkickConcert = testimonial.songkickId
                ? await fetch(
                    `https://api.songkick.com/api/3.0/events/${testimonial.songkickId}.json?apikey=${process.env.SONGKICK_APIKEY}`,
                    { next: { revalidate: 12000 } }
                  )
                    .then((res) => res.json())
                    .then(
                      (res) =>
                        res.resultsPage?.results?.event as
                          | Songkick.EventDetails
                          | undefined
                    )
                : undefined;
              const discogsRelease = testimonial.discogsId?.startsWith("r")
                ? await new DiscogsClient({
                    userAgent: "exelerate.dk/1.0 +https://exelerate.dk",
                  })
                    .database()
                    .getRelease(testimonial.discogsId.replace("r", ""))
                : undefined;
              const discogsMaster = testimonial.discogsId?.startsWith("m")
                ? await new DiscogsClient({
                    userAgent: "exelerate.dk/1.0 +https://exelerate.dk",
                  })
                    .database()
                    .getMaster(testimonial.discogsId.replace("m", ""))
                : undefined;

              return (
                <li
                  key={testimonial.url}
                  className="p-4 rounded-lg bg-gray-200/50 text-white shadow-lg shadow-black/40 flex flex-col justify-between backdrop-blur-sm"
                >
                  <div className="flex items-start text-shadow-md text-shadow-black/40 justify-between">
                    <div className="flex flex-col flex-1">
                      <span className="font-bold text-xl">
                        {testimonial.source}
                      </span>
                      {testimonial.type === "concert" ? (
                        <a
                          href={`https://www.songkick.com/concerts/${testimonial.songkickId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-shadow-md text-shadow-black/40"
                        >
                          {songkickConcert ? (
                            <>
                              live at{" "}
                              <span className="whitespace-nowrap">
                                {songkickConcert.venue?.displayName ||
                                  songkickConcert.location.city}
                              </span>{" "}
                              on{" "}
                              <time
                                title={`${songkickConcert.start.date}  ${songkickConcert.start.time}`}
                                dateTime={new Date(
                                  songkickConcert.start.datetime ||
                                    setHours(
                                      new Date(songkickConcert.start.date),
                                      16
                                    ) ||
                                    ""
                                ).toString()}
                              >
                                {new Date(
                                  songkickConcert.start.datetime ||
                                    setHours(
                                      new Date(songkickConcert.start.date),
                                      16
                                    ) ||
                                    ""
                                ).toLocaleDateString("da-DK")}
                              </time>
                            </>
                          ) : (
                            "Concert"
                          )}
                        </a>
                      ) : testimonial.type === "release" ? (
                        <a
                          href={
                            testimonial.discogsId.startsWith("m")
                              ? `https://www.discogs.com/master/${testimonial.discogsId.replace(
                                  "m",
                                  ""
                                )}`
                              : `https://www.discogs.com/release/${testimonial.discogsId.replace(
                                  "r",
                                  ""
                                )}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-shadow-md text-shadow-black/40"
                        >
                          &quot;
                          {testimonial.discogsId.startsWith("m")
                            ? discogsMaster?.data.title
                            : discogsRelease?.data.title}
                          &quot; (
                          {testimonial.discogsId.startsWith("m")
                            ? discogsMaster?.data.year
                            : discogsRelease?.data.year}
                          )
                        </a>
                      ) : null}
                    </div>

                    {testimonial.score
                      ? new Array(testimonial.scoreMax).fill(0).map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            x="0px"
                            y="0px"
                            width="20px"
                            height="40px"
                            viewBox="260 0 360 500"
                            style={{
                              color:
                                i < testimonial.score
                                  ? "#ffd400"
                                  : "rgba(255, 255, 255, 0.75)",
                            }}
                          >
                            <path
                              fill="currentColor"
                              style={{
                                filter:
                                  "drop-shadow(0px 0px 24px rgba(0, 0, 0, 1))",
                              }}
                              stroke="none"
                              d="
M 561.15 207
L 543.1 244.15
Q 540.2 250.85 543.75 257.15
L 555.75 291.6
Q 573.45 284.9 573.5 265.6 573.95 178.15 606.2 147.9 576.9 174.4 561.15 207
M 363.4 348.7
Q 346.2 339.6 325.6 343.65 352.9 367.15 369 443.7 386.3 477.95 430.85 496.45 474.4 479.2 492.35 443.7 512.45 367.25 541.05 343.65 520.6 339.7 503 348.7 507.5 370.85 498.9 390.5 491.55 407.6 480.35 426 478.35 428.65 475.85 425.7 473.2 419.15 465.1 415.9 470.95 426.1 470.25 440.55
L 460.75 434.5 460.3 448.1 450.4 436.15 449.9 452.45 439.35 444.3 439.45 453.85 434.8 448.4 431.15 453.85 427.15 448.5 422 453.95 422 444.3 410.95 452.45 411.35 436.15 400.8 448.1 401.1 434.5 391.2 440.55
Q 391.2 426.1 397.7 415.9 389 419.25 386.2 426.15 384.1 429.1 382.1 426.3 371.75 407.7 365.25 390.45 357.7 370.85 363.4 348.7
M 327.15 256.45
Q 330.9 250.25 328.25 243.5
L 311.5 205.8
Q 296.85 172.55 268.6 145.05 299.7 176.5 297.05 263.85 296.45 283.1 313.95 290.5
L 327.15 256.45
M 591.15 35.45
L 576.7 0
Q 549.35 65.85 524.1 107.7 502 144.4 471.7 174.9 500.65 139.75 516.9 99.6 516.4 99.2 516 98.8 484.9 67.65 439.55 68 392 71.35 362.65 97.65 361.6 98.55 360.65 99.6 373.85 137.45 401.8 174.9 373.05 144.4 352.9 107.7 333.4 72.25 306.3 0
L 289.7 34.35
Q 295.15 140.1 331.45 241.45 335.15 251.1 330.8 259.95 326.4 268.7 319.4 291.2 312.3 313.65 317.35 333.35 333.8 333.35 342.15 334.55 348.6 335.35 355.8 336.95 377.1 344.4 370.7 366.6 369.35 388.8 390.05 413.65 380.15 384.05 388.45 373.5
L 393.7 392.75 397.45 379.75 404.45 399.1 408.4 388.5 412.95 406.3 418.1 392.65 424.15 410.95 431.15 392.15 437.15 410.95 444.2 392.65 448.65 406.3 454.15 388.5 457.55 399.1 465.5 379.75 468.6 392.75 474.85 373.5
Q 482.6 384.15 472.75 415.3 493.1 388.8 494.6 366.6 489.4 344.4 511.1 336.95 533.85 332.3 553.15 334.55 557.5 317.65 552.9 298.7 552.1 295.6 551.1 292.4 544.1 269.85 539.9 262.25 535.7 254.55 539.05 242.6 583.05 136.8 591.15 35.45
M 375.7 317.45
Q 344.8 312.6 340.7 300.2 336.65 287.7 336.95 275 381.1 271.2 419.95 287.05 424.2 301.6 410.65 309.55 397.65 318.75 375.7 317.45
M 424 370.55
Q 417.8 367.05 415.4 359.85 412.45 350.85 433.95 320 453.75 350.85 450.25 359.85 447.5 367.05 441.15 370.55 439.6 371.35 437.9 372
L 433.2 348.15 427.15 372
Q 425.5 371.35 424 370.55
M 458.4 309.55
Q 445.3 301.6 450.4 287.05 490.05 271.2 534.05 275 535.9 287.7 530.25 300.2 524.5 312.65 492.95 317.45 470.9 318.75 458.4 309.55
Z"
                            />
                          </svg>
                        ))
                      : null}
                  </div>
                  <p
                    className={
                      "text-gray-800 text-shadow-md text-shadow-white/10 flex-1 text-justify text-pretty " +
                      (testimonial.pullQuote.length > 50
                        ? " text-xl"
                        : testimonial.pullQuote.length > 25
                        ? " text-3xl"
                        : " text-5xl")
                    }
                  >
                    {testimonial.pullQuote}
                    <span className="px-2" />
                    <a
                      href={testimonial.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-shadow-md text-shadow-black/40 text-sm whitespace-nowrap"
                    >
                      Read more
                    </a>
                  </p>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </>
  );
}
