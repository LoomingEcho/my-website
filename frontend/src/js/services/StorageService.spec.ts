import StorageService from "./StorageService";

describe("StorageService tests:", () => {
  describe("addItem method:", () => {
    beforeEach(() => {
      // @ts-ignore
      jest.spyOn(window.localStorage.__proto__, "setItem");
      // @ts-ignore
      jest.spyOn(window.localStorage.__proto__, "getItem");
      // @ts-ignore
      jest.spyOn(window.localStorage.__proto__, "clear");
      // @ts-ignore
      spyOn(StorageService, "fireCallbacks");
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("should set given item with given value to localStorage", () => {
      StorageService.addItem("test", "42");
      expect(localStorage.setItem).toBeCalledWith("test", "42");
    });

    test("should call fireCallbacks method for given storageKey", () => {
      StorageService.addItem("test", "42");
      // @ts-ignore
      expect(StorageService.fireCallbacks).toBeCalledWith("test");
    });
  });

  describe("getItem method:", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test("should get given item from localStorage", () => {
      StorageService.getItem("test");
      expect(localStorage.getItem).toBeCalledWith("test");
    });
  });

  describe("observeItem method:", () => {
    const testCb = () => console.log("test");
    let getKeyCallbacksSpy: jest.SpyInstance, observedItemsMapSetSpy: jest.SpyInstance;
    beforeEach(() => {
      // @ts-ignore
      getKeyCallbacksSpy = jest.spyOn(StorageService, "getKeyCallbacks").mockReturnValue(new Set());
      observedItemsMapSetSpy = jest.spyOn(StorageService.observedItemsMap, "set");
    });

    test("should get existing callbacks for given key", () => {
      StorageService.observeItem("test", testCb);
      // @ts-ignore
      expect(getKeyCallbacksSpy).toBeCalledWith("test");
    });

    test("should add given callback to callbackSet", () => {
      const addSpy = jest.fn();
      getKeyCallbacksSpy.mockReturnValue({ add: addSpy });
      StorageService.observeItem("test", testCb);
      // @ts-ignore
      expect(addSpy).toBeCalledWith(testCb);
    });

    test("should update keyCallbacks for given key", () => {
      const testCb2 = () => console.log("test2");
      const mockCbSet = new Set([testCb, testCb2]);
      getKeyCallbacksSpy.mockReturnValue(new Set([testCb2]));
      StorageService.observeItem("test", testCb);
      // @ts-ignore
      expect(observedItemsMapSetSpy).toBeCalledWith("test", mockCbSet);
    });
  });

  describe("unobserveItem method:", () => {
    const testCb = () => console.log("test");

    test("should remove given callback from callbackSet", () => {
      StorageService.observeItem("test", testCb);
      expect(StorageService.observedItemsMap.get("test")?.has(testCb)).toBe(true);
      StorageService.unobserveItem("test", testCb);
      expect(StorageService.observedItemsMap.get("test")?.has(testCb)).toBe(false);
    });
  });
});
