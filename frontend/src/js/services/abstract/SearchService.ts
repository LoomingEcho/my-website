import { RenderLazyImageArgs } from "Components/vic-e-lazy-image/vic-e-lazy-image.types";
import APIService from "Services/APIService";
import DebuggerService from "Services/DebuggerService";

import { SearchQueryOptions, SearchResultMediaItem } from "./SearchService.types";

export class SearchService<P extends SearchQueryOptions, R> {
  static getLazyImageArgsFromMediaItem(imageItem?: SearchResultMediaItem): RenderLazyImageArgs | undefined {
    if (imageItem === undefined) return undefined;
    const renditions = imageItem.renditions;
    const srcset = Object.keys(renditions)
      .map(width => `${renditions[Number(width)]} ${width}w`)
      .join(", ");

    return {
      src: renditions[1280],
      srcset,
      alt: imageItem.alt,
      loadingPlaceholder: renditions[60],
    };
  }

  async getResultsFor(options: P): Promise<R | null> {
    if (this.validateOptions(options) === false) return null;

    const queryUrl = this.getQueryUrl(options);

    try {
      return await APIService.fetchJSON<R>(queryUrl, { cacheFor: 0 });
    } catch (error) {
      DebuggerService.error("SearchService: ", error);
      return null;
    }
  }

  validateOptions(options: P): boolean {
    if (options.endpointUrl === "") return false;
    return true;
  }

  getQueryParams(options: P): URLSearchParams {
    const queryParams = new URLSearchParams();
    if (options.queryString !== undefined) queryParams.append("q", options.queryString);
    queryParams.append("size", options.size.toString());
    if (options.offset !== undefined) queryParams.append("offset", options.offset.toString());
    queryParams.append("includeMeta", options.includeMeta.toString());
    if (options.filter_tags !== undefined) {
      options.filter_tags.forEach(tag => {
        if (tag.groupKey !== "" && tag.tagKey !== "") {
          queryParams.append(`filter_${tag.groupKey}`, tag.tagKey);
        }
      });
    }
    queryParams.append("_charset_", "UTF-8");
    return queryParams;
  }

  getQueryUrl(options: P): string {
    return `${options.endpointUrl}?${this.getQueryParams(options).toString()}`;
  }
}
