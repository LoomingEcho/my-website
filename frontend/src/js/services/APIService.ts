import CachingService from "./CachingService";
import DebuggerService from "./DebuggerService";

export interface APIServiceRequestOptions {
  fetchOptions?: RequestInit;
  cacheFor?: number;
}

class APIService {
  async fetchJSON<T>(url: string, options: APIServiceRequestOptions = {}): Promise<T | null> {
    const { fetchOptions, cacheFor } = options;
    const cachedValue = CachingService.getCachedValue(url);

    if (cachedValue !== null) {
      try {
        return JSON.parse(cachedValue);
      } catch (error) {
        DebuggerService.error("APIService: ", error);
      }
    }

    try {
      const response = await fetch(url, fetchOptions);
      if (!response.ok) throw new Error(response.statusText);

      const responseData = await response.json();
      if (cacheFor !== undefined) {
        CachingService.cacheValue(url, JSON.stringify(responseData), cacheFor);
      }
      return responseData;
    } catch (error) {
      DebuggerService.error("APIService: ", error);
      return null;
    }
  }
}

export default new APIService();
