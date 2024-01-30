import { Component } from "@kluntje/core";
import { find } from "@kluntje/js-utils/lib/dom-helpers";
import LazyConnectService from "Services/LazyConnectService";

import vicIconShadowScss from "./vic-e-icon.shadow.scss";

export class VICIcon extends Component {
  constructor() {
    super({
      initialStates: {
        loaded: false,
      },
      useShadowDOM: true,
    });
  }

  connectedCallback() {
    LazyConnectService.subscribe(this, () => super.connectedCallback());
  }

  get iconId(): string {
    return this.getAttribute("icon-id") || "";
  }

  set iconId(newIconId: string) {
    this.setAttribute("icon-id", newIconId);
  }

  afterComponentRender(): void {
    if (!this.state.loaded) {
      this.loadIcon();
    }
  }

  async loadIcon() {
    const symbol = await import(
      /* webpackChunkName: "vic-icon-" */
      `Icons/${this.iconId}.svg`
    )
      .then(({ default: icon }) => {
        return icon;
      })
      .catch((error: Error) => {
        console.warn(`An error occurred while loading the component: ${error}`);
        this.remove();
      });

    this.appendSymbol(symbol);
    this.setState({ loaded: true });
  }

  static get observedAttributes() {
    return ["icon-id"];
  }

  appendSymbol(symbol: any) {
    const svgTempBox = document.createElement("span");
    svgTempBox.innerHTML = `<style>${vicIconShadowScss}</style>${symbol}`;
    const svgRoot = find(svgTempBox, "svg");
    if (svgRoot !== null) {
      svgRoot.setAttribute("class", "vic-e-icon__svg");
    }
    this.getUiRoot().innerHTML = svgTempBox.innerHTML;
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue === newValue) return;
    if (this.state.loaded === true) this.loadIcon();
  }
}

customElements.define("vic-e-icon", VICIcon);
