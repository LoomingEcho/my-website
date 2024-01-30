import { Component } from "@kluntje/core";
import CatalogueService from "Services/CatalogueService";
import { render, TemplateResult } from "lit-html";
import { Catalogue } from "Components/vic-m-catalogue/vic-m-catalogue.types";
import { find } from "@kluntje/js-utils/lib/dom-helpers";
import { PAGINATION_CHANGED } from "Constants/eventTypes";

export class VICCatalogue extends Component {
  catalogue: Catalogue;

  pagination: HTMLDivElement | null;

  catalogueTemplate?: (component: VICCatalogue) => Promise<TemplateResult>;

  constructor() {
    super({ asyncRendering: true });
  }

  get size() {
    const size = this.getAttribute("size") || "10";
    return parseInt(size, 10);
  }

  set offset(offset: number) {
    this.setAttribute("offset", `${offset}`);
  }

  get offset() {
    const offset = this.getAttribute("offset") || "0";
    return parseInt(offset, 10);
  }

  async loadTemplate(): Promise<(component: VICCatalogue) => Promise<TemplateResult>> {
    const { catalogueTemplate } = await import("./vic-m-catalogue.template");
    return catalogueTemplate;
  }

  async renderAsync(): Promise<void> {
    try {
      this.catalogue = await CatalogueService.fetchCatalogue(this.size, this.offset);
      this.catalogueTemplate = await this.loadTemplate();
      const template = await this.catalogueTemplate(this);
      render(template, this);
    } catch (error) {
      console.log("Catalog: ", error);
    }
  }

  afterComponentRender() {
    super.afterComponentRender();
    if (this.pagination) return;
    this.pagination = find(document.body, ".vic-m-catalogue__pagination") || null;
    this.pagination?.addEventListener(PAGINATION_CHANGED, paginationEvent =>
      this.handlePaginationChanged(paginationEvent as CustomEvent, this),
    );
  }

  async handlePaginationChanged(paginationEvent: CustomEvent, component: VICCatalogue) {
    if (component.offset === paginationEvent.detail.activeItem) return;
    component.offset = paginationEvent.detail.activeItem;
    await component.renderAsync();
  }
}

customElements.define("vic-m-catalogue", VICCatalogue);
