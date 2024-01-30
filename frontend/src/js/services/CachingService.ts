import DebuggerService from "./DebuggerService";
import StorageService from "./StorageService";

interface CacheItem {
  validUntil: number;
  value: string;
}

class CachingService {
  static LS_PREFIX = "vic-caching-service";

  private runtimeCache: Map<string, string> = new Map();

  get shouldCache(): boolean {
    return true;
  }

  cacheValue(key: string, value: string, validFor: number) {
    if (this.shouldCache === false) return;

    if (validFor === 0) {
      this.runtimeCache.set(this.getStorageKey(key), value);
      return;
    }

    const cacheItem: CacheItem = {
      value,
      validUntil: Date.now() + validFor,
    };

    StorageService.addItem(this.getStorageKey(key), JSON.stringify(cacheItem));
  }

  getCachedValue(key: string): string | null {
    const storageKey = this.getStorageKey(key);

    const runtimeValue = this.runtimeCache.get(storageKey);

    if (runtimeValue !== undefined) return runtimeValue;

    const cachedItemString = StorageService.getItem(storageKey);
    if (cachedItemString === null) return null;
    try {
      const cachedItem: CacheItem = JSON.parse(cachedItemString);
      if (cachedItem.validUntil < Date.now()) {
        StorageService.removeItem(storageKey);
        return null;
      }

      return cachedItem.value;
    } catch (e) {
      DebuggerService.warn("CachingService: ", e);
      StorageService.removeItem(storageKey);
      return null;
    }
  }

  clearCachedValue(key: string) {
    StorageService.removeItem(this.getStorageKey(key));
  }

  private getStorageKey(key: string) {
    return `${CachingService.LS_PREFIX}_${key}`;
  }
}

export default new CachingService();
