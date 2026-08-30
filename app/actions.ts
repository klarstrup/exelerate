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

const bandIdsKnownToHaveAProfilePicture = new Set([
  6777179, 8972589, 9117009, 287767, 6647854, 7659254, 7737794, 97697, 496765,
  8065348, 8717679, 701479, 5336153, 10151949, 9543069, 8706753, 173674,
  5216478, 1654632, 33969, 477845, 10095150,
]);

export async function getBandsWeHavePlayedWith() {
  const events = await getPastEvents(6777179);

  const bandsWeHavePlayedWith = new Map<
    number,
    Songkick.MetroArea & {
      playedWithCount: number;
      mostRecentlyAt: Date;
      knownToHaveAProfilePicture: boolean;
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
        bandsWeHavePlayedWith.set(performance.artist.id, {
          ...performance.artist,
          playedWithCount,
          mostRecentlyAt,
          knownToHaveAProfilePicture: bandIdsKnownToHaveAProfilePicture.has(
            performance.artist.id,
          ),
        });
      }
    }
  }
  return Array.from(bandsWeHavePlayedWith.values())
    .sort((a, b) => b.mostRecentlyAt.getTime() - a.mostRecentlyAt.getTime())
    .sort((a, b) => b.playedWithCount - a.playedWithCount)
    .sort((a, b) => {
      const aHasProfilePicture = a.knownToHaveAProfilePicture;
      const bHasProfilePicture = b.knownToHaveAProfilePicture;
      if (aHasProfilePicture && !bHasProfilePicture) return -1;
      if (!aHasProfilePicture && bHasProfilePicture) return 1;
      return 0;
    });
}
