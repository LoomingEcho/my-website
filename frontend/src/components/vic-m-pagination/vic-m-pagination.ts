import { render, TemplateResult } from "lit-html";
import { Component, uiEvent } from "@kluntje/core";
import { MediaQueryService, MQ_CHANGE_EVENT } from "@kluntje/services";
import { PAGINATION_CHANGED } from "Constants/eventTypes";
import mqDefinitions from "Config/mediaQueries";
import { getCurrentMQ } from "@kluntje/js-utils/lib/dom-helpers";

export type PaginationSplitType = "none" | "right" | "left" | "middle";

export class VICPagination extends Component {
  paginationTemplate?: (component: VICPagination) => TemplateResult;

  mqService: MediaQueryService = MediaQueryService.getInstance(mqDefinitions);
  private _activeItem = 0;
  private silentMode = false;

  constructor() {
    super({
      asyncRendering: true,
    });
  }

  get pageCount(): number {
    const pageCountString = this.getAttribute("page-count") || "0";
    return parseInt(pageCountString, 10);
  }

  get initialPage(): number {
    const pagePageString = this.getAttribute("initial-page") || "1";
    return parseInt(pagePageString, 10);
  }

  get activeItem(): number {
    return this._activeItem;
  }

  set activeItem(newActiveItem: number) {
    if (!this.isValidItemIndex(newActiveItem)) return;
    this._activeItem = newActiveItem;
    this.updateComponent();
  }

  get splitType(): PaginationSplitType {
    const pageCount = this.pageCount;
    const activeItem = this.activeItem;
    if (pageCount < 6) return "none";

    if (activeItem < 3) return "right";

    if (activeItem > pageCount - 4) return "left";

    return "middle";
  }

  static get observedAttributes(): string[] {
    return ["page-count"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue === newValue || !this.state.initialized) return;

    this.updateComponent();
  }

  setInitialActiveItem() {
    const initialPage = this.initialPage;

    if (this.isValidItemIndex(initialPage - 1)) this._activeItem = initialPage - 1;
  }

  healActiveItem() {
    if (!this.isValidItemIndex(this.activeItem)) this._activeItem = 0;
  }

  async renderAsync() {
    try {
      this.paginationTemplate = await this.loadTemplate();
      this.renderComponent();
    } catch (e) {
      console.error("CheckGroup:", e);
    }
  }

  async loadTemplate(): Promise<(component: VICPagination) => TemplateResult> {
    const { paginationTemplate } = await import("./vic-m-pagination.template");
    return paginationTemplate;
  }

  renderComponent() {
    if (this.paginationTemplate === undefined) return;
    this.setInitialActiveItem();
    render(this.paginationTemplate(this), this);
  }

  updateComponent() {
    if (this.paginationTemplate === undefined) return;
    this.healActiveItem();
    render(this.paginationTemplate(this), this);
    this.dispatchChangedEvent();
    this.silentMode = false;
  }

  resetActiveItem() {
    this.silentMode = true;
    this.activeItem = 0;
  }

  handleItemClick(index: number) {
    this.activeItem = index;
  }

  handlePrevClick() {
    this.activeItem -= 1;
  }

  handleNextClick() {
    this.activeItem += 1;
  }

  isValidItemIndex(itemIndex: number): boolean {
    return itemIndex >= 0 && itemIndex < this.pageCount;
  }

  get currentMQ() {
    return getCurrentMQ(mqDefinitions);
  }

  @uiEvent("window", MQ_CHANGE_EVENT)
  handleMQChange({ detail: { oldMQ, newMQ } }: any) {
    if (oldMQ !== "MQ1" && newMQ !== "MQ1") return;

    this.updateComponent();
  }

  dispatchChangedEvent() {
    if (this.silentMode === true) return;
    this.dispatchEvent(
      new CustomEvent(PAGINATION_CHANGED, {
        detail: {
          target: this,
          activeItem: this.activeItem,
        },
      }),
    );
  }
}

customElements.define("vic-m-pagination", VICPagination);
