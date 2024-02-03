import { formatDistanceToNowStrict, isToday, setHours } from "date-fns";
import Image from "next/image";
import { Fragment } from "react";
import FTVLogo from "./ftv-logo.png";
import logoImg from "./logo.png";

export const revalidate = 60;

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
  const nextShows: Songkick.Event[] = await fetch(
    `https://api.songkick.com/api/3.0/artists/6777179-exelerate/calendar.json?apikey=${process.env.SONGKICK_APIKEY}`,
    { next: { revalidate: 1200 } }
  )
    .then((res) => res.json())
    .then((res) => res.resultsPage?.results?.event);
  const nextShow: Songkick.EventDetails = await fetch(
    `https://api.songkick.com/api/3.0/events/${nextShows[0]?.id}.json?apikey=${process.env.SONGKICK_APIKEY}`,
    { next: { revalidate: 1200 } }
  )
    .then((res) => res.json())
    .then((res) => res.resultsPage?.results?.event);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoImg.src}
        alt="Exelelogo"
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          height: "40vh",
          width: `${0.4 * (logoImg.width / logoImg.height) * 100}vh`,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="mainStuff">
          <div id="exeleLinks">
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
              className="ftvLink"
              style={{ position: "fixed", top: "5vh", right: "5vw" }}
            >
              <Image
                src={FTVLogo}
                alt="From The Vaults"
                style={{
                  maxWidth: "7.5vh",
                  height: "auto",
                  marginTop: "0.125em",
                }}
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
                  nextShow.venue.website ||
                  `https://maps.google.com/maps?q=${
                    (nextShow.venue.id && nextShow.venue.displayName) ||
                    nextShow.location.city
                  }`
                }
              >
                <span style={{ whiteSpace: "nowrap" }}>
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
              {nextShows.length > 1 ? (
                <div style={{ whiteSpace: "nowrap" }}>
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
      </div>
    </>
  );
}
