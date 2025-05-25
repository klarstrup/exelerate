export interface Review {
  date: Date;
  source: string;
  pullQuote: string;
  url: string;
  archiveUrl: string;
  score?: number;
  scoreMax?: number;
}
export interface ConcertReview extends Review {
  type: "concert";
  songkickId: number;
}
export interface ReleaseReview extends Review {
  type: "release";
  discogsId: string;
}

export type Testimonial = ConcertReview | ReleaseReview;

export const testimonials = [
  {
    type: "concert",
    date: new Date("2023-09-12"),
    songkickId: 41289323,
    source: "METALTONE.DK",
    pullQuote:
      "en super forløsning af energi, som genrebetegnelsen ”power-thrash” lægger op til",
    url: "https://metaltone.dk/arkiver/3163",
    archiveUrl:
      "https://web.archive.org/web/20250216075201/https://metaltone.dk/arkiver/3163",
    score: 4,
    scoreMax: 5,
  },
  {
    type: "concert",
    url: "https://devilution.dk/anmeldelser/koncertanmeldelser/terminalist-loppen-08092023",
    archiveUrl:
      "https://web.archive.org/web/20250216075201/https://devilution.dk/anmeldelser/koncertanmeldelser/terminalist-loppen-08092023",
    songkickId: 41289323,
    date: new Date("2023-09-11"),
    source: "Devilution",
    pullQuote:
      "genreclashet går rent ind her i live-konteksten med samspil og tekniske finesser i højsædet",
  },
  {
    type: "release",
    date: new Date("2023-02-28"),
    discogsId: "m3132144",
    source: "HEAVYMETAL.DK",
    pullQuote: "Den er købt!",
    url: "https://heavymetal.dk/anmeldelse/exelerate-exelerate",
    archiveUrl:
      "https://web.archive.org/web/20250322050724/https://heavymetal.dk/anmeldelse/exelerate-exelerate",
    score: 7,
    scoreMax: 10,
  },
  {
    type: "release",
    date: new Date("2023-03-07"),
    discogsId: "m3132144",
    source: "Calles Rock Corner",
    pullQuote: "det er ganske enkelt verdensklasse, det her",
    url: "https://callesrockcorner.dk/?id=blog&news=44327",
    archiveUrl:
      "https://web.archive.org/web/20250315073601/https://callesrockcorner.dk/?id=blog&news=44327",
    score: 5,
    scoreMax: 6,
  },
  {
    type: "concert",
    songkickId: 41320674,
    date: new Date("2024-02-10"),
    source: "Devilution",
    pullQuote: "en opgave som Exelerate løser til UG",
    url: "https://devilution.dk/anmeldelser/koncertanmeldelser/metalized-tour-2024-odense-10-02-2024",
    archiveUrl:
      "https://web.archive.org/web/20240418062206/https://www.devilution.dk/anmeldelser/koncertanmeldelser/metalized-tour-2024-odense-10-02-2024",
  },
  {
    type: "concert",
    url: "https://metaladay.dk/anmeldelse/exelerate-og-downfall-paa-rust/",
    archiveUrl:
      "https://web.archive.org/web/20240416012832/https://metaladay.dk/anmeldelse/exelerate-og-downfall-paa-rust/",
    songkickId: 33695399,
    date: new Date("2018-06-15"),
    source: "Metal A Day",
    pullQuote:
      "et brølende lydbillede, der vekslede mellem elegante passager, kraftfulde vokallinjer og rivende riffs i et rasende tempo",
    score: 3,
    scoreMax: 5,
  },
  {
    type: "concert",
    url: "https://devilution.dk/artikler/reportager/doomed-basement-07102023",
    archiveUrl:
      "https://web.archive.org/web/20240416012832/https://devilution.dk/artikler/reportager/doomed-basement-07102023",
    songkickId: 41051429,
    date: new Date("2023-10-09"),
    source: "Devilution",
    pullQuote: "deres energiske drive går lige i nakkemusklerne",
    score: 3,
    scoreMax: 5,
  },
] satisfies Testimonial[];
