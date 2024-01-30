export interface FilterTagOptions {
  groupKey: string;
  tagKey: string;
}
export interface SearchQueryOptions {
  endpointUrl: string;
  queryString?: string;
  size: number;
  offset?: number;
  includeMeta: boolean;
  filter_tags?: Set<FilterTagOptions>;
}

export interface SearchResultMediaItem {
  alt: string;
  renditions: Record<number, string>;
}

export type SearchResultLinkType = "CONTACT" | "SOCIAL";

export interface SearchResultLinkItem {
  text: string;
  type: SearchResultLinkType;
  iconId: string;
  url: string;
}
