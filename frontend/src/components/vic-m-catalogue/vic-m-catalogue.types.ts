export interface CatalogueItemMediaRenditions {
  "60": string;
  "320": string;
  "640": string;
  "1280": string;
}

export interface CatalogueItemMedia {
  alt: string;
  renditions: CatalogueItemMediaRenditions;
}

export interface CatalogueItem {
  headline: string;
  subheadline: string;
  text: string;
  url: string;
  type: string;
  media: CatalogueItemMedia;
}

export interface Catalogue {
  numberResults: number;
  items: CatalogueItem[];
}
