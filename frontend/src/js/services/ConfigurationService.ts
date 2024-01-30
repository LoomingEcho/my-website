import { find } from "@kluntje/js-utils/lib/dom-helpers";
import { HOUR_IN_MS } from "Constants/dateConstants";

import APIService from "./APIService";
import DebuggerService from "./DebuggerService";
import ObserverService from "./ObserverService";

class ConfigurationService {
  private configMap: Map<string, any> = new Map();
  private _loaded = false;

  private configElement?: HTMLDivElement;

  static OBSERVER_KEY = "vic-config-service";

  constructor() {
    this.configElement = find<HTMLDivElement>(document.body, "#vic-app-config") || undefined;
    this.initConfigurationMap();
  }

  private async initConfigurationMap() {
    try {
      const config = await this.fetchConfiguration();
      if (config === null) throw new Error("config not found");

      Object.keys(config).forEach(configKey => {
        this.configMap.set(configKey, config[configKey]);
      });
    } catch (error) {
      DebuggerService.error("ConfigurationService: ", error);
    } finally {
      this.loaded = true;
    }
  }

  get observerKey(): string {
    return ConfigurationService.OBSERVER_KEY;
  }

  get servletUrl(): string {
    return this.configElement?.dataset.configUrl || "";
  }

  get loaded() {
    return this._loaded;
  }

  set loaded(newValue: boolean) {
    if (this._loaded === newValue) return;

    this._loaded = newValue;

    if (newValue === true) {
      ObserverService.notifyObservers(ConfigurationService.OBSERVER_KEY);
    }
  }

  public getConfigItemSync<T>(configKey: string): T | undefined {
    return this.configMap.get(configKey);
  }

  public async getConfigItem<T>(configKey: string): Promise<T | undefined> {
    await this.waitForInit();
    return this.configMap.get(configKey);
  }

  public waitForInit() {
    return new Promise(resolve => {
      if (this.loaded) {
        resolve(true);
      } else {
        ObserverService.observe(ConfigurationService.OBSERVER_KEY, () => resolve(true));
      }
    });
  }

  private async fetchConfiguration(): Promise<Record<string, any> | null> {
    if (this.servletUrl === "") return null;

    return await APIService.fetchJSON(this.servletUrl, { cacheFor: HOUR_IN_MS });
  }
}

export default new ConfigurationService();
