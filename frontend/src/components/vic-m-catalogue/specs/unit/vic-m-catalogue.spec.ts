import { VICCatalogue } from "Components/vic-m-catalogue/vic-m-catalogue";

describe("VICMCatalogue tests:", () => {
  const vicCatalogue = new VICCatalogue();

  describe("onComponentInitialized method:", () => {
    beforeEach(() => {
      spyOn(vicCatalogue, "dispatchEvent");
      spyOn(window, "CustomEvent");
      vicCatalogue.onComponentInitialized();
    });

    test("should create custom kl-component-initialized event", () => {
      expect(window.CustomEvent).toBeCalledWith("kl-component-initialized");
    });

    test("should dispatch created event", () => {
      expect(vicCatalogue.dispatchEvent).toBeCalledWith(expect.any(CustomEvent));
    });
  });
});
