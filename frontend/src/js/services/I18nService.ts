import ConfigurationService from "./ConfigurationService";
import DebuggerService from "./DebuggerService";
import ObserverService from "./ObserverService";

class I18nService {
  private _loaded = false;
  private i18nMap: Map<string, string> = new Map();

  static OBSERVER_KEY = "vic-i18n-service";

  constructor() {
    this.initI18nMap();
  }

  async initI18nMap() {
    try {
      const i18nObject = await ConfigurationService.getConfigItem<Record<string, string>>("i18n");

      if (i18nObject === undefined) throw new Error("i18n config not found");

      Object.keys(i18nObject).forEach(i18nKey => {
        this.i18nMap.set(i18nKey, i18nObject[i18nKey]);
      });
    } catch (error) {
      DebuggerService.error("I18nService: ", error);
    } finally {
      this.loaded = true;
    }
  }

  get loaded() {
    return this._loaded;
  }

  set loaded(newValue: boolean) {
    if (this._loaded === newValue) return;

    this._loaded = newValue;

    if (newValue === true) {
      ObserverService.notifyObservers(I18nService.OBSERVER_KEY);
    }
  }

  public waitForInit() {
    return new Promise(resolve => {
      if (this.loaded) {
        resolve(true);
      } else {
        ObserverService.observe(I18nService.OBSERVER_KEY, () => resolve(true));
      }
    });
  }

  public async getValue(i18nKey: string): Promise<string | undefined> {
    await this.waitForInit();
    return this.i18nMap.get(i18nKey);
  }
}

export default new I18nService();
