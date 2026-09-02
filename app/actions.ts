"use server";

import { Songkick } from "./songkick";

const fetchJson = async <T>(url: string | URL, init?: RequestInit) =>
  fetch(url, init).then((res) => res.json() as Promise<T>);

const fetchSongKick = async <T>(input: string | URL, init?: RequestInit) => {
  const url = new URL(input, "https://api.songkick.com/api/3.0/");
  url.searchParams.set("apikey", process.env.SONGKICK_APIKEY!);

  return fetchJson<T>(url, init);
};

export const getPastEvents = async (artistId: number) =>
  fetchSongKick<{
    resultsPage: {
      status: string;
      results: { event: Songkick.Event[] };
      perPage: number;
      page: number;
      totalEntries: number;
    };
  }>(`artists/${artistId}/gigography.json`).then(({ resultsPage }) =>
    resultsPage.totalEntries ? resultsPage.results.event : [],
  );

export const getUpcomingEvents = async (artistId: number) =>
  fetchSongKick<{
    resultsPage: {
      status: string;
      results: { event: Songkick.Event[] };
      perPage: number;
      page: number;
      totalEntries: number;
    };
  }>(`artists/${artistId}/calendar.json`).then(({ resultsPage }) =>
    resultsPage.totalEntries ? resultsPage.results.event : [],
  );

export const searchArtists = async (query: string) =>
  fetchSongKick<{
    resultsPage: {
      status: string;
      results: { artist: Songkick.Artist[] };
      perPage: number;
      page: number;
      totalEntries: number;
    };
  }>(`search/artists.json?query=${encodeURIComponent(query)}`).then(
    ({ resultsPage }) =>
      resultsPage.totalEntries ? resultsPage.results.artist : [],
  );
export const getArtistById = async (artistId: number) =>
  fetchSongKick<{
    resultsPage: {
      status: string;
      results: { artist: Songkick.Artist & { onTourUntil?: string } };
    };
  }>(`artists/${artistId}.json`).then(
    ({ resultsPage }) => resultsPage.results.artist ?? null,
  );

type BandMetaData = {
  knownToHaveAProfilePicture?: boolean;
  uri?: string;
  hasExelerater?: boolean;
};
const bandMetaData = new Map<number, BandMetaData>([
  [10189431, { knownToHaveAProfilePicture: true }],
  [10413608, { knownToHaveAProfilePicture: true }],
  [9563419, { knownToHaveAProfilePicture: true }],
  [7313689, { knownToHaveAProfilePicture: true }],
  [10413808, { knownToHaveAProfilePicture: true }],
  [1156526, { knownToHaveAProfilePicture: true }],

  [6777179, { knownToHaveAProfilePicture: true }],
  [8972589, { knownToHaveAProfilePicture: true }],
  [9117009, { knownToHaveAProfilePicture: true }],
  [287767, { knownToHaveAProfilePicture: true }],
  [6647854, { knownToHaveAProfilePicture: true }],
  [7659254, { knownToHaveAProfilePicture: true }],
  [7737794, { knownToHaveAProfilePicture: true }],
  [97697, { knownToHaveAProfilePicture: true }],
  [496765, { knownToHaveAProfilePicture: true }],
  [8065348, { knownToHaveAProfilePicture: true }],
  [8717679, { knownToHaveAProfilePicture: true }],
  [701479, { knownToHaveAProfilePicture: true }],
  [5336153, { knownToHaveAProfilePicture: true }],
  [10151949, { knownToHaveAProfilePicture: true }],
  [9543069, { knownToHaveAProfilePicture: true }],
  [8706753, { knownToHaveAProfilePicture: true }],
  [173674, { knownToHaveAProfilePicture: true }],
  [5216478, { knownToHaveAProfilePicture: true }],
  [1654632, { knownToHaveAProfilePicture: true }],
  [8446963, { knownToHaveAProfilePicture: true }],
  [4876603, { knownToHaveAProfilePicture: true }],
  [
    33969, // Manticora
    {
      knownToHaveAProfilePicture: true,
      uri: "https://www.manticora.dk/",
    },
  ],
  [477845, { knownToHaveAProfilePicture: true }],
  [10095150, { knownToHaveAProfilePicture: true }],
  [10326019, { knownToHaveAProfilePicture: true }],
  [10408671, { knownToHaveAProfilePicture: true }],
]);

export async function getBandsWeHavePlayedWith() {
  const now = new Date();
  const [upcomingEvents, pastEvents, ...additionalArtists] = await Promise.all([
    getUpcomingEvents(6777179), // Exelerate
    getPastEvents(6777179), // Exelerate
    getArtistById(1156526), // Street Fighter
    getArtistById(10189431), // Vulvatorious
    getArtistById(10413608), // Dødnavn!
    getArtistById(9563419), // Ethereal Kingdoms
    getArtistById(7313689), // Maelsteria
    getArtistById(10413808), // Praeludium
  ]);

  const bandsWeHavePlayedWith = new Map<
    number,
    Songkick.Artist & {
      playedWithCount: number;
      mostRecentlyAt: Date;
      soonestAt: Date;
    }
  >();
  for (const event of [...upcomingEvents, ...pastEvents]) {
    if (event.type !== "Concert") continue;
    for (const performance of event.performance) {
      if (performance.artist.id === 6777179) continue;
      const existingEntry = bandsWeHavePlayedWith.get(performance.artist.id);
      const playedWithCount = (existingEntry?.playedWithCount || 0) + 1;
      const mostRecentlyAt =
        existingEntry?.mostRecentlyAt &&
        existingEntry.mostRecentlyAt > new Date(event.start.date)
          ? existingEntry.mostRecentlyAt
          : new Date(event.start.date);
      const bandMeta = bandMetaData.get(performance.artist.id);
      bandsWeHavePlayedWith.set(performance.artist.id, {
        ...performance.artist,
        playedWithCount,
        mostRecentlyAt,
        soonestAt: new Date(event.start.date),
        ...bandMeta,
      });
    }
  }
  for (const artist of additionalArtists) {
    if (!artist) continue;
    const existingEntry = bandsWeHavePlayedWith.get(artist.id);
    const playedWithCount = existingEntry?.playedWithCount || 0;
    const mostRecentlyAt = existingEntry?.mostRecentlyAt || new Date(0);
    const bandMeta = bandMetaData.get(artist.id);
    bandsWeHavePlayedWith.set(artist.id, {
      ...artist,
      playedWithCount,
      mostRecentlyAt,
      soonestAt: artist.onTourUntil
        ? new Date(artist.onTourUntil)
        : new Date(0),
      ...bandMeta,
    });
  }

  return Array.from(bandsWeHavePlayedWith.values())
    .sort((a, b) => a.displayName.localeCompare(b.displayName))
    .sort((a, b) => b.mostRecentlyAt.getTime() - a.mostRecentlyAt.getTime())
    .sort((a, b) => b.playedWithCount - a.playedWithCount)
    .sort((a, b) => {
      if (b.soonestAt < now && a.soonestAt < now) return 0;
      if (b.soonestAt < now) return -1;
      if (a.soonestAt < now) return 1;
      return a.soonestAt.getTime() - b.soonestAt.getTime();
    })
    .sort((a, b) => {
      const aHasProfilePicture =
        "knownToHaveAProfilePicture" in a && a.knownToHaveAProfilePicture;
      const bHasProfilePicture =
        "knownToHaveAProfilePicture" in b && b.knownToHaveAProfilePicture;
      if (aHasProfilePicture && !bHasProfilePicture) return -1;
      if (!aHasProfilePicture && bHasProfilePicture) return 1;
      return 0;
    });
}
