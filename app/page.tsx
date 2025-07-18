import {
  compareDesc,
  formatDistanceToNowStrict,
  isToday,
  setHours,
} from "date-fns";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import FTVLogo from "./ftv-logo.png";
import logoImg from "./logo.png";
import { testimonials } from "./reviews";
import { after } from "next/server";

const userAgent = "Exelerate/1.0 (https://exelerate.dk)";

export const revalidate = 6000;

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

interface MetallumAlbum {
  id: string;
  name: string;
  type: string;
  releaseDate: string;
  catalogID: string;
  versionDescription: string;
  label: string;
  format: string;
  limitations: string;
  reviews: string;
  coverUrl: string;
  songs: {
    id: string;
    number: string;
    name: string;
    length: string;
    lyrics: string;
  }[];
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
          filter: "invert(1)",
        }}
        className="mx-auto block"
      />
      <a
        href="https://fromthevaults.dk/"
        target="_blank"
        title="From The Vaults"
        className="ftvLink fixed top-[3vh] right-[6vw]"
      >
        <Image
          src={FTVLogo}
          width={75}
          height={85}
          alt="From The Vaults"
          className="h-auto max-w-[7.5vh]"
        />
      </a>
      <div className="text-center text-6xl lg:text-9xl my-[6vh] text-shadow-lg text-shadow-black/40">
        <div className="text-white text-2xl lg:text-5xl leading-[1]">
          NEW SINGLE
        </div>
        &quot;
        <a href="https://www.youtube.com/watch?v=enE63h_EOuc">THE MADNESS</a>
        &quot;
        <div className="text-white text-5xl lg:text-8xl leading-[0.8]">
          OUT NOW
        </div>
      </div>
      <div className="my-[6vh] mx-auto text-shadow-lg text-shadow-black/80 items-start relative">
        <div
          className={twMerge(
            "max-w-[1440px] mx-auto leading-none text-4xl lg:text-7xl gap-x-[6vw] lg:gap-x-0 gap-y-[1vh] lg:gap-y-0",
            "self-stretch flex flex-row  justify-around flex-wrap"
          )}
        >
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
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 max-w-[1440px] mx-auto gap-x-4 grid-flow-dense">
        {await Promise.all(
          Array.from(testimonials)
            .sort((a, b) => compareDesc(a.date, b.date))
            .map(async (testimonial) => {
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

              const metalArchivesAlbum =
                "metalArchivesAlbumId" in testimonial &&
                testimonial.metalArchivesAlbumId
                  ? await fetch(
                      `https://metal-api.dev/albums/${testimonial.metalArchivesAlbumId}`,
                      {
                        headers: { "User-Agent": userAgent },
                        next: {
                          revalidate: false,
                          tags: [String(testimonial.metalArchivesAlbumId)],
                        },
                      }
                    )
                      .then((res) => res.json() as Promise<MetallumAlbum>)
                      .catch(() => {})
                  : undefined;

              if (
                "metalArchivesAlbumId" in testimonial &&
                testimonial.metalArchivesAlbumId &&
                !metalArchivesAlbum?.id
              ) {
                // Invalidate cache if fetching the album failed
                after(() => {
                  revalidateTag(String(testimonial.metalArchivesAlbumId));
                });
              }

              const particularlyGood =
                testimonial.score &&
                Math.round(
                  testimonial.scoreMax === 100
                    ? testimonial.score! / 10
                    : testimonial.score!
                ) /
                  (testimonial.scoreMax === 100 ? 10 : testimonial.scoreMax) >=
                  0.8;

              return (
                <li
                  key={testimonial.url}
                  className={
                    "p-2 lg:p-4 rounded-lg bg-gray-200/50 text-white shadow-lg shadow-black/40 flex flex-col justify-between backdrop-blur-sm " +
                    (particularlyGood ? "md:col-span-2" : "")
                  }
                >
                  <div className="flex items-start text-shadow-md text-shadow-black/40 justify-between">
                    <div className="flex flex-col flex-1">
                      <a
                        href={testimonial.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-shadow-md text-shadow-black/40 font-bold text-xl whitespace-nowrap"
                      >
                        {testimonial.source}
                      </a>
                      {testimonial.type === "concert" && songkickConcert ? (
                        <a
                          href={`https://www.songkick.com/concerts/${testimonial.songkickId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "white !important" }}
                          className="text-shadow-md text-shadow-black/40 whitespace-nowrap"
                        >
                          {songkickConcert ? (
                            <>
                              <span>
                                {songkickConcert.venue?.displayName ||
                                  songkickConcert.location.city}
                              </span>
                              ,{" "}
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
                      ) : testimonial.type === "release" &&
                        metalArchivesAlbum?.id ? (
                        <a
                          href={`https://www.metal-archives.com/albums/x/x/${metalArchivesAlbum.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-shadow-md text-shadow-black/40"
                          style={{ color: "white !important" }}
                        >
                          &quot;
                          {metalArchivesAlbum?.name}
                          &quot; (
                          {metalArchivesAlbum?.releaseDate?.split(", ")[1]})
                        </a>
                      ) : null}
                    </div>

                    {testimonial.score
                      ? new Array(
                          testimonial.scoreMax === 100
                            ? testimonial.scoreMax / 10
                            : testimonial.scoreMax
                        )
                          .fill(0)
                          .map((_, i) =>
                            false ? (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                preserveAspectRatio="none"
                                x="0px"
                                y="0px"
                                width="27.5px"
                                height="20px"
                                viewBox="0 0 550 400"
                                style={{
                                  color:
                                    i <
                                    Math.round(
                                      testimonial.scoreMax === 100
                                        ? testimonial.score! / 10
                                        : testimonial.score!
                                    )
                                      ? "#ffd400"
                                      : "rgba(255, 255, 255, 0.75)",
                                  marginLeft: "-8px",
                                }}
                              >
                                <path
                                  fill="currentColor"
                                  stroke="none"
                                  style={{
                                    filter:
                                      "drop-shadow(0px 0px 24px rgba(0, 0, 0, 1))",
                                  }}
                                  d="
M 463.15 316.5
L 334.55 298.15
Q 292.9 287.15 279.8 253.15 276.6 247.7 281.5 240.65
L 267.6 256.45
Q 257.55 257.5 247.45 253.15 252 266.45 247.45 279.75 220.95 299 207.8 320.05
L 193.4 346.85 164.05 383.15
Q 215.9 347.85 302.2 352.15
L 498.8 352.15 463.15 316.5
M 330.45 75.65
L 454.1 61.55 510.95 19.95 244.45 19.95
Q 142.85 23.7 109.95 51.8 148.75 16.6 227.7 13.7
L 472.1 13.7 490.8 0 224.3 0
Q 143.65 3.3 84.9 36.55
L 84.85 36.6
Q 84.65 36.65 84.5 36.75 63.15 48.3 48.45 67.7 47.95 68.3 47.55 68.9 25.3 99 27.2 133.7
L 2.95 174.05 12.35 174.05
Q 13.25 191.9 23.45 203.65
L 7.9 214.65
Q 11.3 232.45 0.4 252.2 -3.2 276.4 25.3 294.7 12.1 275.2 25.3 255.7 27.25 262.95 40.85 270.2 36.8 262.45 47.1 254.7
L 55.75 263.4 65.9 254.7 74.7 263.7 81.95 254.7 88.45 262.1 98.05 254.7
Q 108.4 236.1 100.4 216.15 106.75 197.05 136 181.7 111.45 199.25 110.5 224.7
L 121.7 254.7
Q 148.85 258.55 146.6 276.2
L 136.65 283.55 122.45 287.75 126.7 290.95 110.75 292 115.3 299.3 94.55 299.8 105.2 306.75 80.4 305.3 93.05 315.7
Q 70.75 313.35 58.9 295.7 63.4 319.5 82.5 329.7 104.65 344.05 109.9 366.2
L 117.95 395.2
Q 173.2 370.85 195.75 322.2 213.5 292.2 238.7 276.2 238.25 261.85 233.7 248.95 228.25 231.85 216.8 215.55 236.9 238 262.25 243.8 313.95 186.15 432.75 173.55 391.05 153.95 297.15 161.25 263.3 157.4 270.65 131.5 286.95 82.2 330.45 75.65
M 50.2 140.7
L 50.2 122.2
Q 50.45 112.75 69.5 105.2 92.15 106.55 104.9 127.7 91 154.9 64.65 164.6 49 170.25 43.35 159.7
L 50.2 140.7 Z"
                                />
                              </svg>
                            ) : (
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
                                  marginLeft: "-2px",
                                  color:
                                    i <
                                    Math.round(
                                      testimonial.scoreMax === 100
                                        ? testimonial.score! / 10
                                        : testimonial.score!
                                    )
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
                            )
                          )
                      : null}
                  </div>
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <p
                      className={
                        "text-gray-900 text-shadow-md text-shadow-white/10 text-justify text-pretty " +
                        (particularlyGood
                          ? testimonial.pullQuote.length > 160
                            ? "text-2xl lg:text-3xl"
                            : testimonial.pullQuote.length > 80
                            ? "text-3xl lg:text-4xl"
                            : testimonial.pullQuote.length > 40
                            ? "text-4xl lg:text-5xl"
                            : testimonial.pullQuote.length > 20
                            ? "text-5xl lg:text-6xl"
                            : testimonial.pullQuote.length > 10
                            ? "text-6xl lg:text-7xl"
                            : "text-7xl lg:text-8xl"
                          : testimonial.pullQuote.length > 160
                          ? "text-lg lg:text-xl"
                          : testimonial.pullQuote.length > 80
                          ? "text-xl lg:text-2xl"
                          : testimonial.pullQuote.length > 40
                          ? "text-2xl lg:text-3xl"
                          : testimonial.pullQuote.length > 20
                          ? "text-3xl lg:text-4xl"
                          : testimonial.pullQuote.length > 10
                          ? "text-4xl lg:text-5xl"
                          : "text-5xl lg:text-6xl")
                      }
                    >
                      {testimonial.pullQuote}
                    </p>
                  </div>
                </li>
              );
            })
        )}
      </ul>
    </>
  );
}
