import APIService from "Services/APIService";
import DebuggerService from "Services/DebuggerService";
import { find } from "@kluntje/js-utils/lib/dom-helpers";
import { HOUR_IN_MS } from "Constants/dateConstants";

class CatalogueService {
  private apiElement?: HTMLDivElement;

  constructor() {
    this.apiElement = find<HTMLDivElement>(document.body, "#vic-catalogue-api-url") || undefined;
  }

  get apiUrl(): string {
    return this.apiElement?.dataset.apiUrl || "";
  }

  async fetchCatalogue(size: number, offset: number) {
    try {
      const catalogue = (await APIService.fetchJSON(`${this.apiUrl}/${size}/${offset}`, {
        cacheFor: HOUR_IN_MS,
      })) as Record<string, any>;
      if (!catalogue) throw new Error("Catalogue not found");
      return catalogue.results;
    } catch (error) {
      DebuggerService.error("CatalogueService: ", error);
    }
  }
}

export default new CatalogueService();
