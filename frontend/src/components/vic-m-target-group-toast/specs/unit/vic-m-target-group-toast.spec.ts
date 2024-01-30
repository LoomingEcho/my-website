import { VICTargetGroupToast } from "Components/vic-m-target-group-toast/vic-m-target-group-toast";

describe("VICTargetGroupToast tests:", () => {
  const vICTargetGroupToast = new VICTargetGroupToast();

  describe("onComponentInitialized method:", () => {
    beforeEach(() => {
      spyOn(vICTargetGroupToast, "dispatchEvent");
      spyOn(window, "CustomEvent");
      vICTargetGroupToast.onComponentInitialized();
    });

    test("should create custom kl-component-initialized event", () => {
      expect(window.CustomEvent).toBeCalledWith("kl-component-initialized");
    });

    test("should dispatch created event", () => {
      expect(vICTargetGroupToast.dispatchEvent).toBeCalledWith(expect.any(CustomEvent));
    });
  });
});
