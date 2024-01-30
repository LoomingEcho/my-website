import { toggleClass } from "@kluntje/js-utils/lib/dom-helpers";
import { CUSTOMER_MODE_B2B, CUSTOMER_MODE_B2C } from "Constants/cssClasses";

import ConfigurationService from "./ConfigurationService";
import I18nService from "./I18nService";
import ObserverService from "./ObserverService";
import StorageService from "./StorageService";

export type TargetGroup = "b2b" | "b2c";

class TargetGroupService {
  static TG_STORAGE_KEY = "vic-target-group";
  static INIT_OBSERVER_KEY = "vic-target-group-init";
  private _bodyClassLoaded = false;

  get currentTargetGroup(): TargetGroup {
    return (StorageService.getItem(TargetGroupService.TG_STORAGE_KEY) as TargetGroup | null) || "b2c";
  }

  set currentTargetGroup(newValue: TargetGroup) {
    StorageService.addItem(TargetGroupService.TG_STORAGE_KEY, newValue);
  }

  get bodyClassLoaded() {
    return this._bodyClassLoaded;
  }

  set bodyClassLoaded(newValue: boolean) {
    if (this._bodyClassLoaded === newValue) return;

    this._bodyClassLoaded = newValue;

    if (newValue === true) {
      ObserverService.notifyObservers(TargetGroupService.INIT_OBSERVER_KEY);
    }
  }

  public waitForInit() {
    return new Promise(resolve => {
      if (this.bodyClassLoaded) {
        resolve(true);
      } else {
        ObserverService.observe(TargetGroupService.INIT_OBSERVER_KEY, () => resolve(true));
      }
    });
  }

  initBodyClassUpdater() {
    this.updateBodyClass();
    this.observeGroupChange(() => this.updateBodyClass());
    this.bodyClassLoaded = true;
  }

  updateBodyClass() {
    toggleClass(document.body, CUSTOMER_MODE_B2B, this.currentTargetGroup === "b2b");
    toggleClass(document.body, CUSTOMER_MODE_B2C, this.currentTargetGroup === "b2c");
  }

  toggleTargetGroup() {
    if (this.currentTargetGroup === "b2b") {
      this.currentTargetGroup = "b2c";
    } else {
      this.currentTargetGroup = "b2b";
    }
  }

  observeGroupChange(callback: () => void) {
    StorageService.observeItem(TargetGroupService.TG_STORAGE_KEY, callback);
  }

  unobserveGroupChange(callback: () => void) {
    StorageService.unobserveItem(TargetGroupService.TG_STORAGE_KEY, callback);
  }

  async getHomepageUrl() {
    if (this.currentTargetGroup === "b2b") {
      return (await ConfigurationService.getConfigItem<string>("b2bHomepageUrl")) || "";
    }
    return (await ConfigurationService.getConfigItem<string>("b2cHomepageUrl")) || "";
  }

  async getOtherHomepageUrl() {
    if (this.currentTargetGroup === "b2c") {
      return (await ConfigurationService.getConfigItem<string>("b2bHomepageUrl")) || "";
    }
    return (await ConfigurationService.getConfigItem<string>("b2cHomepageUrl")) || "";
  }

  async getI18nValue(key: string) {
    return (await I18nService.getValue(this.getI18nKey(key))) || "";
  }

  private getI18nKey(key: string) {
    return `viessmann.corporate.targetGroupSwitch.${this.currentTargetGroup}.${key}`;
  }
}

export default new TargetGroupService();
