export class ScrollLockService {
  private pageLocked = false;

  lockPage() {
    if (this.pageLocked) return;

    const scrollbarWidth = ScrollLockService.getScrollbarWidth();
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    this.pageLocked = true;
  }

  unlockPage() {
    if (this.pageLocked === false) return;

    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    this.pageLocked = false;
  }

  static getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }
}

export default new ScrollLockService();
