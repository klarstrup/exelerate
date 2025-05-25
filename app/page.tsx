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
                    <div className="flex flex-col">
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

                    {testimonial.score ? (
                      <div className="text-5xl font-bold">
                        {testimonial.score}
                        <span className="text-3xl font-normal">
                          /
                          <span className="text-2xl font-normal">
                            {testimonial.scoreMax}
                          </span>
                        </span>
                      </div>
                    ) : null}
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
