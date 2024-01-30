import { Component, uiElement, uiEvent } from "@kluntje/core";
import { find, getCurrentMQ, toggleClass } from "@kluntje/js-utils/lib/dom-helpers";
import { MediaQueryService, MQ_CHANGE_EVENT } from "@kluntje/services";
import { ACTIVE } from "Constants/cssClasses";
import mqDefinitions from "Config/mediaQueries";
import StorageService from "Services/StorageService";

export class LSGToolbar extends Component {
  @uiElement(".vic-lsg-toolbar__toggle-input--grid-overlay")
  gridOverlayToggle: HTMLInputElement;

  @uiElement(".vic-lsg-toolbar__mq-label")
  mqLabel: HTMLParagraphElement;

  gridOverlay: HTMLDivElement | null = find(document.body, ".vic-lsg-grid-overlay");

  mqService: MediaQueryService = MediaQueryService.getInstance(mqDefinitions);

  static get GRID_OVERLAY_STATE_STORAGE_KEY(): string {
    return "vic-lsg-grid-overlay";
  }

  get gridOverlayOpen(): boolean {
    const storageValue = StorageService.getItem(LSGToolbar.GRID_OVERLAY_STATE_STORAGE_KEY);
    if (storageValue === null) return false;
    return storageValue === "true";
  }

  get currentMQ() {
    return getCurrentMQ(mqDefinitions);
  }

  afterComponentRender() {
    if (window.self !== window.top) {
      if (this.gridOverlay !== null) document.body.removeChild(this.gridOverlay);
      document.body.removeChild(this);
    }
    this.updateMqLabel(this.currentMQ);
    StorageService.observeItem("vic-lsg-grid-overlay", () => this.handleGridOverlayChange());
    this.handleGridOverlayChange();
  }

  @uiEvent("gridOverlayToggle", "change")
  toggleGridOverlay() {
    if (this.gridOverlay === null) return;
    StorageService.addItem(LSGToolbar.GRID_OVERLAY_STATE_STORAGE_KEY, this.gridOverlayToggle.checked.toString());
  }

  @uiEvent("window", MQ_CHANGE_EVENT)
  handleMQChange() {
    this.updateMqLabel(this.currentMQ);
  }

  handleGridOverlayChange() {
    toggleClass(this.gridOverlay, ACTIVE, this.gridOverlayOpen);
    this.gridOverlayToggle.checked = this.gridOverlayOpen;
  }

  updateMqLabel(newValue: string) {
    this.mqLabel.innerText = newValue;
  }
}

customElements.define("vic-lsg-toolbar", LSGToolbar);
