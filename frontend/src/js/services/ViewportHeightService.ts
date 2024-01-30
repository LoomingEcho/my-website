import throttle from "lodash-decorators/throttle";

class ViewportHeightService {
  private rootElement = document.documentElement;

  init() {
    window.addEventListener("resize", () => this.handleResize(), { passive: true });
    this.updateViewportHeight();
  }

  @throttle(100)
  private handleResize() {
    this.updateViewportHeight();
  }

  private updateViewportHeight() {
    this.rootElement.style.setProperty("--vic-viewport-height", `${window.innerHeight}px`);
  }
}

export default new ViewportHeightService();
