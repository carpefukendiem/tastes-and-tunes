export type AssetBakedBg = "cream" | "navy" | "scene" | "white";

export type SiteAsset = {
  src: string;
  alt: string;
  w: number;
  h: number;
  bakedBg: AssetBakedBg;
};

export const assets = {
  hero: {
    heroBg: {
      src: "/assets/hero/hero-bg.png",
      alt: "Full sunset oceanfront festival scene with stage, surfer, crowd, palms, and sailboat",
      w: 1672,
      h: 941,
      bakedBg: "scene",
    },
  },
  illustrations: {
    vwVan: {
      src: "/assets/illustrations/vw-van.png",
      alt: "VW van with palm trees, sunset, and guitarist",
      w: 1448,
      h: 1086,
      bakedBg: "cream",
    },
    wave: {
      src: "/assets/illustrations/wave.png",
      alt: "Big breaking wave decorative accent",
      w: 1448,
      h: 1086,
      bakedBg: "cream",
    },
    palmTrees: {
      src: "/assets/illustrations/palm-trees.png",
      alt: "Palm silhouettes decorative accent",
      w: 1448,
      h: 1086,
      bakedBg: "cream",
    },
    bookWithHeart: {
      src: "/assets/illustrations/book-with-heart.png",
      alt: "Open book with heart and waves",
      w: 1448,
      h: 1086,
      bakedBg: "cream",
    },
  },
  icons: {
    dining: {
      src: "/assets/icons/dining.png",
      alt: "Vintage circular dining badge for fine dining establishments",
      w: 1254,
      h: 1254,
      bakedBg: "cream",
    },
    wineries: {
      src: "/assets/icons/wineries.png",
      alt: "Vintage circular badge for wineries",
      w: 1254,
      h: 1254,
      bakedBg: "cream",
    },
    cocktails: {
      src: "/assets/icons/cocktails.png",
      alt: "Vintage circular badge for cocktails and craft beer",
      w: 1254,
      h: 1254,
      bakedBg: "cream",
    },
    music: {
      src: "/assets/icons/music.png",
      alt: "Vintage circular badge for live musical entertainment",
      w: 1254,
      h: 1254,
      bakedBg: "cream",
    },
    makers: {
      src: "/assets/icons/makers.png",
      alt: "Vintage circular badge for local makers and merchandise",
      w: 1254,
      h: 1254,
      bakedBg: "cream",
    },
    philanthropy: {
      src: "/assets/icons/philanthropy.png",
      alt: "Vintage circular badge for the philanthropic component benefiting the Literacy Foundation",
      w: 1254,
      h: 1254,
      bakedBg: "cream",
    },
  },
  artists: {
    billyIdol: {
      src: "/assets/artists/billy-idol.png",
      alt: "Billy Idol composed artist card",
      w: 1448,
      h: 1086,
      bakedBg: "navy",
    },
    berlin: {
      src: "/assets/artists/berlin.png",
      alt: "Berlin with Terri Nunn composed artist card",
      w: 1448,
      h: 1086,
      bakedBg: "navy",
    },
    sugarRay: {
      src: "/assets/artists/sugar-ray.png",
      alt: "Sugar Ray with Mark McGrath composed artist card",
      w: 1448,
      h: 1086,
      bakedBg: "navy",
    },
  },
  headers: {
    artistsHeader: {
      src: "/assets/headers/artists-header.png",
      alt: "Artists under consideration. Final lineup to be announced!",
      w: 1536,
      h: 1024,
      bakedBg: "navy",
    },
    savorBlock: {
      src: "/assets/headers/savor-block.png",
      alt: "Savor the Santa Barbara Food Scene. Featuring top restaurants, chefs, wineries, breweries and makers. More to be announced!",
      w: 1086,
      h: 1448,
      bakedBg: "cream",
    },
    andManyMore: {
      src: "/assets/headers/and-many-more.png",
      alt: "And many more local favorites!",
      w: 2172,
      h: 724,
      bakedBg: "white",
    },
  },
  restaurants: {
    row1: {
      src: "/assets/restaurants/row-1.png",
      alt: "Restaurant row featuring Tre Lune, Lucky's, Sama Sama Kitchen, Bettina, The Lark, and El Rincon Bohemio",
      w: 2172,
      h: 724,
      bakedBg: "cream",
    },
    row2: {
      src: "/assets/restaurants/row-2.png",
      alt: "Restaurant row featuring Lure Fish House, Bluewater Grill, Santo Mezcal, Intermezzo, Pascucci, and Secret Bao",
      w: 2172,
      h: 724,
      bakedBg: "cream",
    },
    row3: {
      src: "/assets/restaurants/row-3.png",
      alt: "Restaurant row featuring BiBi Ji, The Black Sheep, Santa Barbara Fish Market, Ca'Dario, Jill's Place, and Boathouse",
      w: 2172,
      h: 724,
      bakedBg: "cream",
    },
  },
} as const satisfies Record<string, Record<string, SiteAsset>>;
