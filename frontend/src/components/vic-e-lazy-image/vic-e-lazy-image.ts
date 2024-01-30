import { Component, MQBasedRendered, uiElement, uiEvent } from "@kluntje/core";
import { ViewportObserver, IN_VP_EVENT } from "@kluntje/services";
import { INITIALIZED } from "Constants/cssClasses";
import { addClass, onEvent, removeEvent } from "@kluntje/js-utils/lib/dom-helpers";
import { render } from "lit-html";
import mqDefinitions from "Config/mediaQueries";
import DebuggerService from "Services/DebuggerService";
import LazyConnectService from "Services/LazyConnectService";

import { lazyImageTemplate } from "./vic-e-lazy-image.template";

export type ImageInitType = "lazy" | "explicit";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@MQBasedRendered(mqDefinitions)
export class VICLazyImage extends Component {
  private viewportObserver = ViewportObserver.getInstance();

  private _imageLoaded = false;
  private _hasError = false;

  private _loadingPlaceholderLoaded = false;
  private _loadingPlaceholderLoadingError = false;

  @uiElement(".vic-e-lazy-image__image-box")
  imageBox: HTMLDivElement;

  @uiElement(".vic-e-lazy-image__image")
  image: HTMLImageElement;

  constructor() {
    super({
      useShadowDOM: true,
    });
  }

  connectedCallback() {
    if (this.initType === "lazy") {
      LazyConnectService.subscribe(this, () => super.connectedCallback());
    } else {
      super.connectedCallback();
    }
  }

  /**
   * Lifecycle-Hook: Initializes Component after render
   * @override
   */
  afterComponentRender(): void {
    addClass(this, INITIALIZED);
    if (this.initType !== "explicit") this.viewportObserver.observe(this);
  }

  /**
   * Webcomponents Helper to observe Attribute Changes
   * @override
   * @returns {string[]}
   */
  static get observedAttributes(): string[] {
    return ["src", "srcset", "aspect-ratio"];
  }

  /**
   * Handles change of observed Attributes
   * @override
   * @param {string} name - name of Attribute, that changed
   * @param {string} oldValue
   * @param {string} newValue
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue === newValue || !this.state.initialized) return;

    switch (name) {
      case "src":
        this.imageLoaded = false;
        this.loadImage();
        break;
      case "srcset":
        this.imageLoaded = false;
        this.loadImage();
        break;
      case "aspect-ratio":
        this.renderComponent();
        break;
    }
  }

  /**
   * Returns given init-type, default to lazy
   * @returns {ImageInitType}
   */
  get initType(): ImageInitType {
    switch (this.getAttribute("init")) {
      case "explicit":
        return "explicit";
      default:
        return "lazy";
    }
  }

  /**
   * Returns value of 'src'-Attribute
   * @returns {string}
   */
  get imgSrc(): string {
    return this.getAttribute("src") || "";
  }

  /**
   * Returns value of 'srcset'-Attribute
   * @returns {string}
   */
  get imgSrcSet(): string | undefined {
    return this.getAttribute("srcset") || undefined;
  }

  /**
   * Returns value of 'sizes'-Attribute
   * @returns {string}
   */
  get imgSizes(): string | undefined {
    return this.getAttribute("sizes") || undefined;
  }

  /**
   * Returns value of 'alt'-Attribute
   * @returns {string}
   */
  get imgAlt(): string | undefined {
    return this.getAttribute("alt") || undefined;
  }

  /**
   * Returns value of 'aspect-ratio'-Attribute
   * @returns {string}
   */
  get imgAspectRatio(): string | undefined {
    return this.getAttribute("aspect-ratio") || undefined;
  }

  get loadingPlaceholder(): string {
    return this.getAttribute("loading-placeholder") || "";
  }

  get imageLoaded(): boolean {
    return this._imageLoaded;
  }

  set imageLoaded(newValue) {
    if (this.imageLoaded === newValue) return;
    this._imageLoaded = newValue;
    if (newValue === true) {
      this.setAttribute("loaded", "");
    } else {
      this.removeAttribute("loaded");
    }
    this.updateComponent();
  }

  get hasError(): boolean {
    return this._hasError;
  }

  set hasError(newErrorState: boolean) {
    if (this.hasError === newErrorState) return;
    this._hasError = newErrorState;
    if (newErrorState === true) {
      this.setAttribute("has-error", "");
    } else {
      this.removeAttribute("has-error");
    }
    this.updateComponent();
  }

  get hasLoadingPlaceholder(): boolean {
    return this.loadingPlaceholder !== "";
  }

  get loadingPlaceholderLoaded(): boolean {
    return !this.hasLoadingPlaceholder || this._loadingPlaceholderLoaded;
  }

  set loadingPlaceholderLoaded(newLoadedState: boolean) {
    if (this.loadingPlaceholderLoaded === newLoadedState) return;
    this._loadingPlaceholderLoaded = newLoadedState;
  }

  get loadingPlaceholderLoadingError(): boolean {
    return !this.hasLoadingPlaceholder || this._loadingPlaceholderLoadingError;
  }

  set loadingPlaceholderLoadingError(newErrorState: boolean) {
    if (this.loadingPlaceholderLoadingError === newErrorState) return;
    this._loadingPlaceholderLoadingError = newErrorState;
    this.updateComponent();
  }

  /**
   * Renders Component via lit-html
   */
  renderComponent(): void {
    render(
      lazyImageTemplate({
        src: "",
        alt: this.imgAlt,
        srcset: "",
        sizes: this.imgSizes,
        aspectRatio: this.imgAspectRatio,
        component: this,
      }),
      this.getUiRoot(),
    );
  }

  /**
   * Rerenders Component via lit-html
   */
  updateComponent(): void {
    render(
      lazyImageTemplate({
        src: this.imgSrc,
        alt: this.imgAlt,
        srcset: this.imgSrcSet,
        sizes: this.imgSizes,
        aspectRatio: this.imgAspectRatio,
        component: this,
      }),
      this.getUiRoot(),
    );
  }

  /**
   * Initiates Image Load, by add src(-set) to img in shadow-DOM
   */
  @uiEvent("this", IN_VP_EVENT)
  loadImage() {
    this.viewportObserver.unobserve(this);
    if (this.imageLoaded) return;

    this.attachImageLoadingEvents();

    try {
      this.triggerImageLoad();
    } catch (error) {
      DebuggerService.error("LazyImage: ", error);
    }
  }

  private triggerImageLoad() {
    if (this.imgSrc === "" && this.imgSrcSet === undefined) throw new Error("no src/srcset provided for");
    if (this.imgSrc !== "") this.image.setAttribute("src", this.imgSrc);
    if (this.imgSrcSet !== undefined) this.image.setAttribute("srcset", this.imgSrcSet);
  }

  private attachImageLoadingEvents() {
    onEvent(this.image, "load", this.handleImageLoad, this);
    onEvent(this.image, "error", this.handleImageLoadingError, this);
  }

  handleImageLoadingError(): void {
    removeEvent(this.image, "error", this.handleImageLoadingError, this);
    this.hasError = true;
    DebuggerService.error("LazyImage: image loading error", this);
  }

  /**
   * Handles ImageLoad-Event, by setting/removing needed Classes
   */
  handleImageLoad(): void {
    removeEvent(this.image, "load", this.handleImageLoad, this);

    this.hasError = false;
    this.imageLoaded = true;
    this.dispatchEvent(new CustomEvent("vic-image-loaded", { bubbles: false }));
  }
}

customElements.define("vic-e-lazy-image", VICLazyImage);
