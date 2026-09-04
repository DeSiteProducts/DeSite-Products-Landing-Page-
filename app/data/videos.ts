/**
 * Vimeo gallery (DeSite Products account).
 *
 * TO ADD A VIDEO: copy the number from the Vimeo URL into `vimeoId`, add a
 * title, the runtime in seconds, and the thumbnail URL from
 *   https://vimeo.com/api/oembed.json?url=https://vimeo.com/<id>
 * `model` only picks the fallback illustration if the thumbnail fails to load.
 * Entries with no `vimeoId` render as a "Filming" placeholder.
 */

export type VideoItem = {
  id: string;
  title: string;
  model: "slg108" | "slg78" | "slg56";
  vimeoId?: string;
  /** Runtime in seconds, shown as a badge. */
  seconds?: number;
  /** Poster image from Vimeo. */
  thumb?: string;
  featured?: boolean;
};

export const videos: VideoItem[] = [
  {
    id: "slg108-overview",
    title: "SLG 108 — Full Overview",
    model: "slg108",
    vimeoId: "1214388058",
    seconds: 273,
    thumb: "https://i.vimeocdn.com/video/2185311194-b9196b131f90dea723a6041f593bb799e78e9fdb6accac4971ca62017908892b-d_640",
    featured: true,
  },
  {
    id: "slg108-rock",
    title: "SLG 108 — Screening Rock",
    model: "slg108",
    vimeoId: "1214395341",
    seconds: 52,
    thumb: "https://i.vimeocdn.com/video/2185320348-9d01b69c391340d78f1e65ed117dc7f52434e053fe575d7d60cc508d05c7df13-d_640",
  },
  {
    id: "slg108-suspension",
    title: "SLG 108 — Spring Suspension System",
    model: "slg108",
    vimeoId: "1214392268",
    seconds: 54,
    thumb: "https://i.vimeocdn.com/video/2185316427-cf31c71fe4b9369c5e2c64de10ad57d4306e5cfa03aef021f8077b0fe317ac64-d_640",
  },
  {
    id: "slg108-portability",
    title: "SLG 108 — Portability",
    model: "slg108",
    vimeoId: "1214395661",
    seconds: 63,
    thumb: "https://i.vimeocdn.com/video/2185320919-a52d7fec34827cc494b6cbaaf11bd07cbc871cefc6d5e4e5572bddf564228e26-d_640",
  },
  {
    id: "slg108-cantilevered",
    title: "SLG 108 — Cantilevered Suspension",
    model: "slg108",
    vimeoId: "1123901262",
    seconds: 67,
    thumb: "https://i.vimeocdn.com/video/2065622756-db4019a2248737970c28f9927df073cba5a379140ac72fdf68556be0b06a787f-d_640",
  },
  {
    id: "slg108-screening",
    title: "SLG 108 Grizzly Screening",
    model: "slg108",
    vimeoId: "1154326645",
    seconds: 337,
    thumb: "https://i.vimeocdn.com/video/2106604736-3b9833ad1398dc206434c860b6751e9d343c69ce4c254cf4d3f65574492b5e53-d_640",
  },
  {
    id: "slg108-cat-325dlc",
    title: "SLG 108 Grizzly With A Cat 325DLC",
    model: "slg108",
    vimeoId: "1130937806",
    seconds: 551,
    thumb: "https://i.vimeocdn.com/video/2074771350-7a7209c3eb9349c86e84b622371bf037a867f71c87923acb5e31314ae9a97f33-d_640",
  },
  {
    id: "big-rock-108vfrb",
    title: "Screening Big Rock With The 108VFRB",
    model: "slg108",
    vimeoId: "1006260134",
    seconds: 97,
    thumb: "https://i.vimeocdn.com/video/1922959544-593177f4eef10eb132a74fdc12666ad6d5ab78b8bd7e8801ec74ddbc109f1bb2-d_640",
  },
  {
    id: "slg78-no-riser",
    title: "SLG 78 Without The Riser Box",
    model: "slg78",
    vimeoId: "1219338439",
    seconds: 22,
    thumb: "https://i.vimeocdn.com/video/2191509956-02ecddc844c57845fe3b8fb190597b17980c9be6e42b8973e0433ddc860a7190-d_640",
  },
  {
    id: "slg78-sand",
    title: "SLG 78 — Screening Sand",
    model: "slg78",
    vimeoId: "1090497018",
    seconds: 136,
    thumb: "https://i.vimeocdn.com/video/2023120141-274e62939ecff51a7b09fb47b801e203ad09cbdfab340286c3d4956f8f04c761-d_640",
  },
  {
    id: "slg78-wet-dirt",
    title: "SLG 78 — Screening Wet Dirt",
    model: "slg78",
    vimeoId: "1123004769",
    seconds: 67,
    thumb: "https://i.vimeocdn.com/video/2064535250-9347600a853933417ecc018477aeb32dfa1e6c7f2628524cb2adc5a7519e3d02-d_640",
  },
  {
    id: "slg78-dirt",
    title: "SLG 78 — Screening Dirt",
    model: "slg78",
    vimeoId: "1129896297",
    seconds: 50,
    thumb: "https://i.vimeocdn.com/video/2073413377-90b3c200dcc5695c5296b24ac685d89db30e6fe359b0fabb8d858c0ff43396be-d_640",
  },
  {
    id: "slg78-gravel",
    title: "SLG 78 — Screening Gravel",
    model: "slg78",
    vimeoId: "1001990400",
    seconds: 73,
    thumb: "https://i.vimeocdn.com/video/1918274293-2ceadc2bceb0b454c4c308f245fc29963c6357c7ddd751db00eac6987fd6efa5-d_640",
  },
  {
    id: "slg78-millings",
    title: "SLG 78 — Screening Asphalt Millings",
    model: "slg78",
    vimeoId: "1129293428",
    seconds: 45,
    thumb: "https://i.vimeocdn.com/video/2072631440-57ab66a37fc83aae0c0fcd1ef982ea90d5db4cc58f8f7bdca1cf88c73a9e86a8-d_640",
  },
  /** Untitled on Vimeo ("SLG 78") — vertical clip. */
  {
    id: "slg78-clip",
    title: "SLG 78 On Site",
    model: "slg78",
    vimeoId: "1213630402",
    seconds: 76,
    thumb: "https://i.vimeocdn.com/video/2184343188-8f2979caa21718dcec877287de8b604c738aa2ec8e9be12abf8a600ccb5cb93f-d_640",
  },
  {
    id: "slg56-testimonial",
    title: "SLG 56 — Owner Testimonial",
    model: "slg56",
    vimeoId: "1125998905",
    seconds: 376,
    thumb: "https://i.vimeocdn.com/video/2068308457-b4d5d12559f1afbe530f058e3a65699db923c7a05cae56703beece5b1c9a6ea4-d_640",
  },
  {
    id: "slg56-mesh",
    title: "SLG 56 — Mesh System",
    model: "slg56",
    vimeoId: "967214871",
    seconds: 39,
    thumb: "https://i.vimeocdn.com/video/1880262476-5d2dfa24f121b42eaa8364494bddbb3c2cb5f12393722afbb0ab8bb022d3da71-d_640",
  },
  /** Untitled on Vimeo ("56") — rename when you know what it shows. */
  {
    id: "slg56-clip-1",
    title: "SLG 56 In Action",
    model: "slg56",
    vimeoId: "1219320439",
    seconds: 52,
    thumb: "https://i.vimeocdn.com/video/2191486347-25798d0589b22814f043fb2cb2aef6b33acecf7093254f119bee4ef9b5d02be1-d_640",
  },
  /** Untitled on Vimeo ("56 VIDEO"). */
  {
    id: "slg56-clip-2",
    title: "SLG 56 On The Job",
    model: "slg56",
    vimeoId: "970808108",
    seconds: 28,
    thumb: "https://i.vimeocdn.com/video/1884446605-b1fbc1d6a132006baac59c65cea029d9e2dcadc12a2cf08edebb09e5a4c1f0bd-d_640",
  },
  /** Untitled on Vimeo ("09"). */
  {
    id: "slg-clip-09",
    title: "SLG Screener In Action",
    model: "slg78",
    vimeoId: "1219322367",
    seconds: 48,
    thumb: "https://i.vimeocdn.com/video/2191488914-1a3dd86fa6e1fc16b427cb1d48690672afe7ee20e0f7618c752fa39e869218cf-d_640",
  },
];
