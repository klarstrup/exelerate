"use server";

import { Songkick } from "./songkick";

const fetchJson = async <T>(url: string | URL, init?: RequestInit) =>
  fetch(url, init).then((res) => res.json() as Promise<T>);

const fetchSongKick = async <T>(input: string | URL, init?: RequestInit) => {
  const url = new URL(input, "https://api.songkick.com/api/3.0/");
  url.searchParams.set("apikey", process.env.SONGKICK_APIKEY!);

  return fetchJson<T>(url, init);
};

const getPastEvents = (artistId: number) =>
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

type BandMetaData = {
  knownToHaveAProfilePicture?: boolean;
  uri?: string;
};
const bandMetaData = new Map<number, BandMetaData>([
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
  [
    33969, // Manticora
    {
      knownToHaveAProfilePicture: true,
      uri: "https://www.manticora.dk/",
    },
  ],
  [477845, { knownToHaveAProfilePicture: true }],
  [10095150, { knownToHaveAProfilePicture: true }],
]);

export async function getBandsWeHavePlayedWith() {
  const events = await getPastEvents(6777179);

  const bandsWeHavePlayedWith = new Map<
    number,
    Songkick.MetroArea & {
      playedWithCount: number;
      mostRecentlyAt: Date;
    }
  >();
  for (const event of events) {
    if (event.type !== "Concert") continue;
    for (const performance of event.performance) {
      if (performance.artist.id !== 6777179) {
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
          ...bandMeta,
        });
      }
    }
  }
  return Array.from(bandsWeHavePlayedWith.values())
    .sort((a, b) => b.mostRecentlyAt.getTime() - a.mostRecentlyAt.getTime())
    .sort((a, b) => b.playedWithCount - a.playedWithCount)
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
