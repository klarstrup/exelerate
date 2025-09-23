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
  songkickId?: number;
  showTime: Date;
}
export interface ReleaseReview extends Review {
  type: "release";
  release: Release;
}

export type Testimonial = ConcertReview | ReleaseReview;

const elysiumSingle = {
  type: "single",
  metalArchivesAlbumId: 589033,
  title: "Elysium",
  releaseDate: new Date(2016, 5, 22),
} as const;
const godOfManSingle = {
  type: "single",
  metalArchivesAlbumId: 1099277,
  title: "God of Man",
  releaseDate: new Date(2022, 10, 25),
} as const;
const theMadnessSingle = {
  type: "single",
  metalArchivesAlbumId: 1344323,
  title: "The Madness",
  releaseDate: new Date(2025, 5, 5),
} as const;
const e0EP = {
  type: "album",
  metalArchivesAlbumId: 472825,
  title: "E0",
  releaseDate: new Date(2014, 10, 20),
} as const;
const hellForTheHelpLessAlbum = {
  type: "album",
  metalArchivesAlbumId: 1348855,
  title: "Hell for the Helpless",
  releaseDate: new Date(2025, 8, 12),
} as const;
const exelerateAlbum = {
  type: "album",
  metalArchivesAlbumId: 1104270,
  title: "Exelerate",
  releaseDate: new Date(2023, 2, 3),
} as const;

type Release = [
  typeof e0EP,
  typeof elysiumSingle,
  typeof godOfManSingle,
  typeof theMadnessSingle,
  typeof exelerateAlbum,
  typeof hellForTheHelpLessAlbum
][number];

export const testimonials = [
  {
    type: "release",
    release: e0EP,
    url: "https://devilution.dk/anmeldelser/pladeanmeldelser/der-skal-altsa-mere-til",
    archiveUrl:
      "https://web.archive.org/web/20240416012832/https://devilution.dk/anmeldelser/pladeanmeldelser/der-skal-altsa-mere-til",
    date: new Date("2015-02-16"),
    source: "Devilution",
    pullQuote:
      "Der er lidt attitude, noget frisk over dem og det der je ne sais quoi, der adskiller Exelerate fra de evigheder af leverpostej, man får tilsendt som anmelder",
  },
  {
    type: "concert",
    url: "https://www.rockfreaks.net/gigs/1112",
    archiveUrl:
      "https://web.archive.org/web/20201025191232/http://www.rockfreaks.net/gigs/1112",
    songkickId: 22700783,
    showTime: new Date("2015-04-11"),
    date: new Date("2015-04-14"),
    source: "Rockfreaks.net",
    pullQuote:
      "They rock the stage with fast-paced guitar solos and piercing, high-pitched vocals just as it should be",
    score: 5,
    scoreMax: 10,
  },
  {
    type: "concert",
    url: "https://metaladay.dk/anmeldelse/exelerate-og-downfall-paa-rust/",
    archiveUrl:
      "https://web.archive.org/web/20240416012832/https://metaladay.dk/anmeldelse/exelerate-og-downfall-paa-rust/",
    songkickId: 33695399,
    date: new Date("2018-06-18"),
    showTime: new Date("2018-15"),
    source: "Metal A Day",
    pullQuote:
      "et brølende lydbillede, der vekslede mellem elegante passager, kraftfulde vokallinjer og rivende riffs i et rasende tempo",
    score: 3,
    scoreMax: 5,
  },
  {
    type: "release",
    release: exelerateAlbum,
    date: new Date("2023-02-1"),
    source: "Soundcheck",
    pullQuote:
      "Το “Exelerate” είναι ένα αρκετά καλό ντεμπούτο, γεμάτο πάθος και ενέργεια",
    url: "https://soundcheck.network/posts/exelerate-exelerate/",
    archiveUrl:
      "https://web.archive.org/web/20250322050724/https://soundcheck.network/posts/exelerate-exelerate/",
  },
  {
    type: "release",
    release: exelerateAlbum,
    date: new Date("2023-02-10"),
    source: "Musika",
    pullQuote:
      "Kracht en melodie worden samen gekoppeld aan soms agressief klinkende momenten",
    url: "https://www.musika.be/2023/02/10/exelerate-exelerate/",
    archiveUrl:
      "https://web.archive.org/web/20250322050724/https://www.musika.be/2023/02/10/exelerate-exelerate/",
    score: 75,
    scoreMax: 100,
  },
  {
    type: "release",
    release: exelerateAlbum,
    date: new Date("2023-02-28"),
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
    release: exelerateAlbum,
    date: new Date("2023-03-01"),
    source: "Powerplay Magazine",
    pullQuote:
      "a band that understands the core qualities of great heavy metal and interprets them with adventurous spirit",
    url: "https://powerplaymagazine.co.uk/shop/p/powerplay-260-march-2023",
    archiveUrl:
      "https://web.archive.org/web/20250322050724/https://powerplaymagazine.co.uk/shop/p/powerplay-260-march-2023",
    score: 9,
    scoreMax: 10,
  },
  {
    type: "release",
    release: exelerateAlbum,
    date: new Date("2023-03-01"),
    url: "https://www.metal-rules.com/2023/03/01/exelerate-exelerate/",
    archiveUrl:
      "https://web.archive.org/web/20250315073601/https://www.metal-rules.com/2023/03/01/exelerate-exelerate/",
    source: "Metal-Rules.com",
    pullQuote: "a powerful and thrilling album",
    score: 4,
    scoreMax: 5,
  },
  {
    type: "release",
    release: godOfManSingle,
    date: new Date("2022-11-25"),
    url: "http://www.hardrockinfo.com/reviews/2022/november.html#exelerate-god",
    archiveUrl:
      "https://web.archive.org/web/20250315073601/http://www.hardrockinfo.com/reviews/2022/november.html#exelerate-god",
    source: "HARD ROCK INFO",
    pullQuote: "a powerful heavy metal song with a pinch of thrash",
  },
  {
    type: "release",
    release: exelerateAlbum,
    date: new Date("2023-03-07"),
    source: "Calles Rock Corner",
    pullQuote: "det er ganske enkelt verdensklasse, det her",
    url: "https://callesrockcorner.dk/?id=blog&news=44327",
    archiveUrl:
      "https://web.archive.org/web/20250315073601/https://callesrockcorner.dk/?id=blog&news=44327",
    score: 5,
    scoreMax: 6,
  },
  {
    type: "release",
    release: exelerateAlbum,
    url: "https://ghostcultmag.com/album-review-exelerate-exelerate-from-the-vaults/",
    archiveUrl:
      "https://web.archive.org/web/20250315073601/https://ghostcultmag.com/album-review-exelerate-exelerate-from-the-vaults/",
    date: new Date("2023-03-07"),
    source: "Ghost Cult Magazine",
    pullQuote:
      "a helluva impressive debut that has all the makings of being a future classic",
  },
  {
    type: "release",
    release: elysiumSingle,
    url: "https://metal-temple.com/review/exelerate-elysium/",
    archiveUrl:
      "https://web.archive.org/web/20250525214318/https://metal-temple.com/review/exelerate-elysium/",
    date: new Date("2023-03-07"),
    source: "Metal Temple",
    pullQuote: "This single and the video is absolutely BASED",
    score: 10,
    scoreMax: 10,
  },
  {
    type: "release",
    release: exelerateAlbum,
    url: "https://metalgodstv.com/exelerate-album-review-exelerate/",
    archiveUrl:
      "https://web.archive.org/web/20250525214925/https://metalgodstv.com/exelerate-album-review-exelerate/",
    source: "Metal Gods TV",
    date: new Date("2023-03-10"),
    pullQuote: "a thunderous assault of thrashy heavy metal",
    score: 9.5,
    scoreMax: 10,
  },
  {
    type: "release",
    release: exelerateAlbum,
    url: "https://heavymusichq.com/heavy-music-hq-album-reviews-week-of-march-10-2023/",
    archiveUrl:
      "https://web.archive.org/web/20250525214925/https://heavymusichq.com/heavy-music-hq-album-reviews-week-of-march-10-2023/",
    source: "Heavy Music HQ",
    date: new Date("2023-03-10"),
    pullQuote:
      "Exelerate moves between brisk thrash, heavy grooves and melodic choruses",
    score: 3,
    scoreMax: 5,
  },
  {
    type: "release",
    release: exelerateAlbum,
    url: "https://metalfactory.ch/music-reviews/aktuell/lp-cd-reviews/review/exelerate-exelerate",
    archiveUrl:
      "https://web.archive.org/web/20250525214925/https://metalfactory.ch/music-reviews/aktuell/lp-cd-reviews/review/exelerate-exelerate",
    source: "METAL FACTORY",
    date: new Date("2023-03-10"),
    pullQuote:
      "Exelerate sind keine Band für leichtverdaubare Kost, sondern beweisen, dass man Musik äussert intelligent komponieren und dabei trotzdem einen roten Faden einziehen kann",
    score: 9.2,
    scoreMax: 10,
  },
  {
    type: "release",
    release: exelerateAlbum,
    url: "https://www.metal-hammer.de/reviews/exelerate-exelerate/",
    archiveUrl:
      "https://web.archive.org/web/20250525214925/https://www.metal-hammer.de/reviews/exelerate-exelerate/",
    source: "Metal Hammer",
    date: new Date("2023-03-10"),
    pullQuote:
      "ab ‘Spawn Of Satan’ drücken die [quartett] aufs Pedal – die Drums hauen bis ‘Epilogue’ durch, während sich Riffs und Soli paaren",
    score: 3.5,
    scoreMax: 7,
  },
  {
    type: "release",
    release: exelerateAlbum,
    url: "https://www.metalepidemic.com/exelerate-exelerate/",
    archiveUrl:
      "https://web.archive.org/web/20250525214925/https://www.metalepidemic.com/exelerate-exelerate/",
    source: "Metal Epidemic",
    date: new Date("2023-03-10"),
    pullQuote:
      "Exelerate is ready to melt faces just like the gods of metal we worship today commanded",
    score: 4,
    scoreMax: 5,
  },
  {
    type: "release",
    release: exelerateAlbum,
    url: "https://www.allaroundmetal.com/component/content/article/26-releases/10227-exelerate,-buon-thrash-dalla-danimarca-sulla-scia-degli-artillery",
    archiveUrl:
      "https://web.archive.org/web/20250216075201/https://www.allaroundmetal.com/component/content/article/26-releases/10227-exelerate,-buon-thrash-dalla-danimarca-sulla-scia-degli-artillery",
    date: new Date("2023-03-11"),
    source: "Allaround Metal",
    pullQuote:
      "è praticamente impossibile rimanere fermi e non fare del furioso headbanging con canzoni decisamente azzeccate",
    score: 3.5,
    scoreMax: 5,
  },
  {
    type: "release",
    release: exelerateAlbum,
    url: "https://www.metallerium.com/exelerate-exelerate-2023",
    archiveUrl:
      "https://web.archive.org/web/20250216075201/https://www.metallerium.com/exelerate-exelerate-2023",
    date: new Date("2023-03-11"),
    source: "Metallerium",
    pullQuote: "Interesting classic metal album",
    score: 7.6,
    scoreMax: 10,
  },
  {
    type: "release",
    release: exelerateAlbum,
    url: "https://www.yumpu.com/de/document/read/67683550/starkstrom31",
    archiveUrl:
      "https://web.archive.org/web/20250528195052/https://www.yumpu.com/de/document/read/67683550/starkstrom31",
    date: new Date("2023-03-20"),
    source: "STARK!STROM",
    pullQuote:
      'Wessen Körper durch die kombinierte Verwendung der Vokabel "Power/Thrash Metal" und "Dänemark" nervösen Zuckungen ausgesetzt ist, liegt hier definitiv richtig',
  },

  {
    type: "release",
    release: exelerateAlbum,
    url: "https://arrowlordsofmetal.nl/exelerate-exelerate/",
    archiveUrl:
      "https://web.archive.org/web/20250216075201/https://arrowlordsofmetal.nl/exelerate-exelerate/",
    date: new Date("2023-03-11"),
    source: "Arrow Lords Of Metal",
    pullQuote:
      "Bij ‘No Escape’ wordt het gaspedaal flink ingetrapt en kunnen we duidelijk horen dat we hier met vakmensen te maken hebben",
  },
  {
    type: "release",
    release: exelerateAlbum,
    url: "https://www.ever-metal.com/2023/03/20/exelerate-exelerate/",
    archiveUrl:
      "https://web.archive.org/web/20250525214925/https://www.ever-metal.com/2023/03/20/exelerate-exelerate/",
    date: new Date("2023-03-20"),
    source: "Ever Metal",
    score: 9,
    scoreMax: 10,
    pullQuote: "whiplash-inducing Power/Thrash Metal",
  },
  {
    type: "release",
    release: exelerateAlbum,
    url: "https://www.zephyrs-odem.de/exelerate-exelerate-2023-12598",
    archiveUrl:
      "https://web.archive.org/web/20250525214925/https://www.zephyrs-odem.de/exelerate-exelerate-2023-12598",
    date: new Date("2023-03-22"),
    source: "Zephyr's Odem",
    score: 9.3,
    scoreMax: 10,
    pullQuote:
      "Exelerate sind ein verdammt heißes Eisen und haben schon mit ihrer ersten Platte alles richtig gemacht – Chapeau!",
  },
  {
    type: "release",
    release: exelerateAlbum,
    url: "https://transcending-the-mundane.com/wp-content/uploads/2023/04/TTM33.pdf",
    archiveUrl:
      "https://web.archive.org/web/20250525214925/https://transcending-the-mundane.com/wp-content/uploads/2023/04/TTM33.pdf",
    date: new Date("2023-04-01"),
    source: "Transcending the Mundane",
    pullQuote: "this is a band that should be enjoyed and not overlooked",
  },
  {
    type: "concert",
    url: "https://devilution.dk/anmeldelser/koncertanmeldelser/terminalist-loppen-08092023",
    archiveUrl:
      "https://web.archive.org/web/20250216075201/https://devilution.dk/anmeldelser/koncertanmeldelser/terminalist-loppen-08092023",
    songkickId: 41289323,
    showTime: new Date("2023-09-08"),
    date: new Date("2023-09-11"),
    source: "Devilution",
    pullQuote:
      "genreclashet går rent ind her i live-konteksten med samspil og tekniske finesser i højsædet",
  },
  {
    type: "concert",
    url: "https://metaltone.dk/arkiver/3163",
    archiveUrl:
      "https://web.archive.org/web/20250216075201/https://metaltone.dk/arkiver/3163",
    showTime: new Date("2023-09-08"),
    date: new Date("2023-09-12"),
    songkickId: 41289323,
    source: "METALTONE.DK",
    pullQuote:
      "en super forløsning af energi, som genrebetegnelsen ”power-thrash” lægger op til",
    score: 4,
    scoreMax: 5,
  },
  {
    type: "concert",
    url: "https://www.rockfreaks.net/gigs/1759",
    archiveUrl:
      "https://web.archive.org/web/20250525210333/https://www.rockfreaks.net/gigs/1759",
    showTime: new Date("2023-09-08"),
    date: new Date("2023-09-11"),
    songkickId: 41289323,
    source: "Rockfreaks.net",
    pullQuote:
      "One cannot but admire the flair with which the four musicians are playing their songs, gritting teeth, headbanging, and kneeling down in the throes of passion",
    score: 7,
    scoreMax: 10,
  },
  {
    type: "concert",
    url: "https://heavymetal.dk/koncertanmeldelse/terminalist-loppen-8-september-2023",
    archiveUrl:
      "https://web.archive.org/web/20250525210333/https://heavymetal.dk/koncertanmeldelse/terminalist-loppen-8-september-2023",
    showTime: new Date("2023-09-08"),
    date: new Date("2023-09-11"),
    songkickId: 41289323,
    source: "HEAVYMETAL.DK",
    pullQuote:
      "45 minutters forrygende underholdning og en åbningskoncert ikke set bedre i umindelige tider",
    score: 9,
    scoreMax: 10,
  },
  {
    type: "concert",
    url: "https://devilution.dk/artikler/reportager/doomed-basement-07102023",
    archiveUrl:
      "https://web.archive.org/web/20240416012832/https://devilution.dk/artikler/reportager/doomed-basement-07102023",
    songkickId: 41051429,
    showTime: new Date("2023-10-07"),
    date: new Date("2023-10-09"),
    source: "Devilution",
    pullQuote: "deres energiske drive går lige i nakkemusklerne",
    score: 3,
    scoreMax: 5,
  },
  {
    type: "release",
    release: exelerateAlbum,
    url: "https://mystificationzine.com/2023/12/13/ten-heavy-metal-albums-you-missed-2023/",
    archiveUrl:
      "https://web.archive.org/web/20250525223253/https://mystificationzine.com/2023/12/13/ten-heavy-metal-albums-you-missed-2023/",
    date: new Date("2023-12-13"),
    source: "Mystification Zine",
    score: 79,
    scoreMax: 100,
    pullQuote:
      "You’ll have to be a true thrash head -and- an 80’s power metal goon to truly appreciate the class with which they blend these energies into something which is both truly classicist but also approachable",
  },
  {
    type: "concert",
    songkickId: 41320670,
    date: new Date("2024-02-09"),
    showTime: new Date("2024-02-09"),
    source: "Metal Revolution",
    pullQuote: "Exelerate showcase just how metal anno 2024 should sound",
    url: "https://www.metal-revolution.com/live/artillery-manticora-demolizer-exelerate-9th-february-2024-studenterhuset-metalized-tour-2024-aalborg-denmark",
    archiveUrl:
      "https://web.archive.org/web/20240418062206/https://www.metal-revolution.com/live/artillery-manticora-demolizer-exelerate-9th-february-2024-studenterhuset-metalized-tour-2024-aalborg-denmark",
    score: 7,
    scoreMax: 10,
  },
  {
    type: "concert",
    songkickId: 41320674,
    showTime: new Date("2024-02-10"),
    date: new Date("2024-02-20"),
    source: "Devilution",
    pullQuote: "en opgave som Exelerate løser til UG",
    url: "https://devilution.dk/anmeldelser/koncertanmeldelser/metalized-tour-2024-odense-10-02-2024",
    archiveUrl:
      "https://web.archive.org/web/20240418062206/https://www.devilution.dk/anmeldelser/koncertanmeldelser/metalized-tour-2024-odense-10-02-2024",
  },
  /*
  {
    type: "concert",
    songkickId: 41320674,
    date: new Date("2024-02-24"),
    source: "Selvtægt",
    pullQuote:
      "Nærværende artikel nævner Exelerates optræden, men vil afholde sig fra at beskæftige sig mere med den af hensyn til alles integritet, da skribentens bror spiller i bandet",
    url: "https://www.selvtaegt.dk/reportage/metalized-tour-bliver-den-samme-leverpostej-smurt-for-tyndt-ud/",
    archiveUrl:
      "https://web.archive.org/web/20240418062206/https://www.selvtaegt.dk/reportage/metalized-tour-bliver-den-samme-leverpostej-smurt-for-tyndt-ud/",
  },
  */
  {
    type: "release",
    release: theMadnessSingle,
    date: new Date("2025-06-05"),
    url: "http://www.hardrockinfo.com/reviews/2025/june.html#exe-mad",
    archiveUrl:
      "https://web.archive.org/web/20250525223253/http://www.hardrockinfo.com/reviews/2025/june.html#exe-mad",
    source: "HARD ROCK INFO",
    pullQuote: "melodic power/thrash metal in its own league",
  },
  /* New reviews go here */
  {
    type: "release",
    release: hellForTheHelpLessAlbum,
    date: new Date("2025-07-21"),
    url: "https://powermetal-warrior.blogspot.com/2025/07/exelerate-hell-for-helpless-2025.html",
    archiveUrl:
      "https://web.archive.org/web/20250915114222/https://powermetal-warrior.blogspot.com/2025/07/exelerate-hell-for-helpless-2025.html",
    source: "power metal warrior",
    pullQuote:
      "Mocne riffy, chwytliwe melodie i efektowne solówki — wszystko to zagrane z pasją i zaangażowaniem",
    score: 7.5,
    scoreMax: 10,
  },
  {
    type: "release",
    release: hellForTheHelpLessAlbum,
    date: new Date("2025-08-17"),
    url: "https://www.musika.be/2025/08/17/exelerate-hell-for-the-helpless/",
    archiveUrl:
      "https://web.archive.org/web/20250828183819/https://www.musika.be/2025/08/17/exelerate-hell-for-the-helpless/",
    source: "Musika",
    pullQuote: "een uiterst fris en enorm gevarieerd werkstuk",
    score: 87,
    scoreMax: 100,
  },
  {
    type: "release",
    release: hellForTheHelpLessAlbum,
    date: new Date("2025-08-25"),
    url: "https://obliveon.de/review/exelerate-hell-for-the-helpless/",
    archiveUrl:
      "https://web.archive.org/web/20250828183752/https://obliveon.de/review/exelerate-hell-for-the-helpless/",
    source: "Obliveon",
    pullQuote:
      "EXELERATE haben ihren Thrash Metal gut strukturiert, mit einer ansprechenden Melodik versehen und ausreichend Energie unterfüttert",
    score: 8.5,
    scoreMax: 10,
  },
  {
    type: "release",
    release: hellForTheHelpLessAlbum,
    date: new Date("2025-09-04"),
    url: "https://heavymetal.dk/anmeldelse/exelerate-hell-helpless",
    archiveUrl:
      "https://web.archive.org/web/20250907162119/https://heavymetal.dk/anmeldelse/exelerate-hell-helpless",
    source: "HEAVYMETAL.DK",
    pullQuote:
      "Hell for the Helpless tør tage livtag med vores indre kaos og kaste lys på mørket – uden at miste den musikalske motor",
    score: 9,
    scoreMax: 10,
  },
  {
    type: "release",
    release: hellForTheHelpLessAlbum,
    date: new Date("2025-09-08 17:42"),
    url: "http://www.metalnews.fr/chroniques/hell-for-the-helpless",
    archiveUrl:
      "https://web.archive.org/web/20250915141355/http://www.metalnews.fr/chroniques/hell-for-the-helpless",
    source: "Metalnews.fr",
    pullQuote: "Un futur classique?",
    score: 90,
    scoreMax: 100,
  },
  {
    type: "release",
    release: hellForTheHelpLessAlbum,
    date: new Date("2025-09-11"),
    url: "https://wtrmag.com/exelerate-hell-for-the-helpless/",
    archiveUrl:
      "https://web.archive.org/web/20250915111742/https://wtrmag.com/exelerate-hell-for-the-helpless/",
    source: "W.T.R. Mag’",
    pullQuote:
      "un album très recommandable pour tout petit thrasher qui se respecte",
    score: 3,
    scoreMax: 5,
  },
  {
    type: "release",
    release: hellForTheHelpLessAlbum,
    date: new Date("2025-09-12 11:00"),
    url: "https://metalfactory.ch/music-reviews/aktuell/lp-cd-reviews/review/exelerate-hell-for-the-helpless",
    archiveUrl:
      "https://web.archive.org/web/20250913214806/https://metalfactory.ch/music-reviews/aktuell/lp-cd-reviews/review/exelerate-hell-for-the-helpless",
    source: "Metal Factory",
    pullQuote:
      "Eine Truppe, die man sich anhören sollte und eine, die weiss, dass man nicht nur mit Härte, sondern auch mit Melodien überzeugen muss",
    score: 8,
    scoreMax: 10,
  },
  {
    type: "release",
    release: hellForTheHelpLessAlbum,
    date: new Date("2025-09-12 12:00"),
    url: "https://powermetal.de/review/review-Exelerate/Hell_For_The_Helpless,44933.html",
    archiveUrl:
      "https://web.archive.org/web/20250913214934/https://powermetal.de/review/review-Exelerate/Hell_For_The_Helpless,44933.html",
    source: "POWERMETAL.de",
    pullQuote:
      "dieses Album ist klassischer Heavy Metal in Reinkultur und in absoluter Bestform",
    score: 10,
    scoreMax: 10,
  },
  {
    type: "release",
    release: hellForTheHelpLessAlbum,
    date: new Date("2025-09-14"),
    url: "https://mystificationzine.com/2025/09/14/in-brief-september-25-pt-i/",
    archiveUrl:
      "https://web.archive.org/web/20250915101350/https://mystificationzine.com/2025/09/14/in-brief-september-25-pt-i/",
    source: "Mystification Zine",
    pullQuote: "I hate the idea of accusing an artist of “confidence”",
    score: 80,
    scoreMax: 100,
  },
  {
    type: "release",
    release: hellForTheHelpLessAlbum,
    date: new Date("2025-09-14"),
    url: "http://musikatlas.at/special-content/news-detail/news/exelerate-hell-for-the-helpless/?tx_news_pi1%5Bcontroller%5D=News&tx_news_pi1%5Baction%5D=detail&cHash=df736cf22d06061d608d48341c3c18f5",
    archiveUrl:
      "https://web.archive.org/web/20250915141355/http://musikatlas.at/special-content/news-detail/news/exelerate-hell-for-the-helpless/?tx_news_pi1%5Bcontroller%5D=News&tx_news_pi1%5Baction%5D=detail&cHash=df736cf22d06061d608d48341c3c18f5",
    source: "Musikatlas.at",
    pullQuote:
      "Auf der Bühne bereits erfolgreich - jetzt auch mit diesem Album?",
  },
  {
    type: "release",
    release: hellForTheHelpLessAlbum,
    date: new Date("2025-09-15"),
    url: "https://sentineldaily.com.au/exelerate-hell-for-the-helpless-from-the-vaults/",
    archiveUrl:
      "https://web.archive.org/web/20250915102508/https://sentineldaily.com.au/exelerate-hell-for-the-helpless-from-the-vaults/",
    source: "Sentinel Daily",
    pullQuote:
      "one of the most consistently impressive albums I’ve heard in quite some time",
  },
  {
    type: "release",
    release: hellForTheHelpLessAlbum,
    date: new Date("2025-09-15"),
    url: "https://www.hardrockinfo.com/reviews/2025/sept.html#exe-hfth",
    archiveUrl:
      "https://web.archive.org/web/20250915141355/https://www.hardrockinfo.com/reviews/2025/sept.html#exe-hfth",
    source: "HARD ROCK INFO",
    pullQuote:
      "a powerful hybrid of fast-paced thrash and melodic, anthemic power metal",
  },
  {
    type: "concert",
    songkickId: 42702899,
    date: new Date("2025-09-16"),
    showTime: new Date("2025-09-12"),
    source: "Metal A Day",
    pullQuote: "sand heltemetal",
    url: "https://metaladay.dk/anmeldelse/mere-heltemetal-tak/",
    archiveUrl:
      "https://web.archive.org/web/20250918212312/https://metaladay.dk/anmeldelse/mere-heltemetal-tak/",
    score: 3.5,
    scoreMax: 5,
  },
  {
    type: "release",
    release: hellForTheHelpLessAlbum,
    date: new Date("2025-09-17"),
    url: "https://www.metalshock.it/exelerate-hell-for-the-helpless/",
    archiveUrl:
      "https://web.archive.org/web/20250918105755/https://www.metalshock.it/exelerate-hell-for-the-helpless/",
    source: "Metalshock",
    pullQuote:
      "Gl’ Exelerate non stanno semplicemente omaggiando un genere: lo stanno portando avanti con convinzione, qualità e visione",
  },
  {
    type: "release",
    release: hellForTheHelpLessAlbum,
    date: new Date("2025-09-18T09:19:59+00:00"),
    url: "https://tempiduri.eu/exelerate-hell-for-the-helpless/",
    archiveUrl:
      "https://web.archive.org/web/20250918105755/https://tempiduri.eu/exelerate-hell-for-the-helpless/",
    source: "Tempiduri",
    pullQuote: "gran bel disco non c'è che dire",
  },
  {
    type: "release",
    release: hellForTheHelpLessAlbum,
    date: new Date("2025-09-21"),
    url: "https://www.bleeding4metal.de/index.php?show=review_de&id=16174",
    archiveUrl:
      "https://web.archive.org/web/20250918105755/https://www.bleeding4metal.de/index.php?show=review_de&id=16174",
    source: "Bleeding4Metal",
    pullQuote:
      "es entbrennt ein Feuer, dessen lodernde Flamme erst nach dem zehnten, also dem letzten Titel erlischt",
    score: 8.5,
    scoreMax: 10,
  },
  {
    type: "release",
    release: hellForTheHelpLessAlbum,
    date: new Date("2025-09-21"),
    url: "https://1984benchan.blog.fc2.com/blog-entry-1749.html",
    archiveUrl:
      "https://web.archive.org/web/20250922222704/https://1984benchan.blog.fc2.com/blog-entry-1749.html",
    source: "メタルシニア",
    pullQuote:
      "基本は私の大好きなスタイルなのですが、デビュー作で見られた「練り上げられた個性的なリフ」が影を潜めました。",
    score: 2,
    scoreMax: 5,
  },
] satisfies Testimonial[];
