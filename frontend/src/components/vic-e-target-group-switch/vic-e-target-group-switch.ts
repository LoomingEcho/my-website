import { Component, uiElements, uiEvent } from "@kluntje/core";
import { addClass, hasClass, toggleClass } from "@kluntje/js-utils/lib/dom-helpers";
import { VICTargetGroupToast } from "Components/vic-m-target-group-toast/vic-m-target-group-toast";
import { ACTIVE, LOADED } from "Constants/cssClasses";
import { waitForInitialization } from "Helper/componentHelper/waitForInitialization";
import TargetGroupService from "Services/TargetGroupService";

export class VICTargetGroupSwitch extends Component {
  @uiElements(".vic-e-target-group-switch__option")
  options: Array<HTMLSpanElement>;

  afterComponentRender() {
    this.updateActiveOption();
    TargetGroupService.observeGroupChange(() => this.updateActiveOption());
    addClass(this, LOADED);
  }

  updateActiveOption() {
    const currentTargetGroup = TargetGroupService.currentTargetGroup;

    toggleClass(this.options[0], ACTIVE, currentTargetGroup === "b2c");
    toggleClass(this.options[1], ACTIVE, currentTargetGroup === "b2b");
  }

  get activeOption() {
    const activeOption = this.options.find(option => hasClass(option, ACTIVE));
    return activeOption || this.options[0];
  }

  get inActiveOption() {
    const inActiveOption = this.options.find(option => !hasClass(option, ACTIVE));
    return inActiveOption || this.options[1];
  }

  @uiEvent("this", "click")
  handleClick() {
    this.openToast();
  }

  @uiEvent("this", "keydown")
  handleKeydown(e: KeyboardEvent) {
    if (e.key !== "Enter" && e.key !== " ") return;

    e.preventDefault();
    this.openToast();
  }

  async openToast() {
    const toast = document.createElement("vic-m-target-group-toast") as VICTargetGroupToast;
    addClass(toast, "vic-m-target-group-toast");
    document.body.appendChild(toast);
    await waitForInitialization(toast);
    toast.open();
  }
}

customElements.define("vic-e-target-group-switch", VICTargetGroupSwitch);
