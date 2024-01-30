import { Component, uiElement, uiEvent } from "@kluntje/core";
import { addClass, removeClass, waitFor } from "@kluntje/js-utils/lib/dom-helpers";
import { LOADED, OPEN } from "Constants/cssClasses";
import { render } from "lit-html";
import TargetGroupService from "Services/TargetGroupService";

export class VICTargetGroupToast extends Component {
  @uiElement(".vic-m-target-group-toast__content")
  contentBox: HTMLDivElement;

  @uiElement(".vic-m-target-group-toast__close-btn")
  closeBtn: HTMLButtonElement;

  @uiElement(".vic-m-target-group-toast__selection-cta--switch-and-stay")
  switchAndStayCta: HTMLButtonElement;

  @uiElement(".vic-m-target-group-toast__selection-cta--switch-and-go")
  switchAndGoCta: HTMLButtonElement;

  @uiElement(".vic-m-target-group-toast__stay-cta")
  stayCta: HTMLButtonElement;

  constructor() {
    super({
      asyncRendering: true,
    });
  }

  async renderAsync() {
    const targetGroupToastTemplate = await this.loadTemplate();
    render(await targetGroupToastTemplate(), this);
    addClass(this, LOADED);
  }

  async loadTemplate() {
    const { targetGroupToastTemplate } = await import("./vic-m-target-group-toast.template");
    return targetGroupToastTemplate;
  }

  @uiEvent("this", "click")
  handleComponentClick() {
    this.close();
  }

  @uiEvent("contentBox", "click")
  handleContentBoxClick(e: MouseEvent) {
    e.stopPropagation();
  }

  @uiEvent("closeBtn", "click")
  handleCloseBtnClick() {
    this.close();
  }

  @uiEvent("stayCta", "click")
  handleStayCtaClick() {
    this.close();
  }

  @uiEvent("switchAndStayCta", "click")
  handleSwitchAndStayCtaClick() {
    TargetGroupService.toggleTargetGroup();
    this.close();
  }

  @uiEvent("switchAndGoCta", "click")
  async handleSwitchAndGoCtaClick(e: MouseEvent) {
    e.preventDefault();
    const homepageUrl = await TargetGroupService.getOtherHomepageUrl();
    if (homepageUrl === "") return;
    TargetGroupService.toggleTargetGroup();
    window.location.href = homepageUrl;
  }

  open() {
    addClass(this, OPEN);
  }

  async close() {
    removeClass(this, OPEN);
    await waitFor(300);
    this.remove();
  }
}

customElements.define("vic-m-target-group-toast", VICTargetGroupToast);
