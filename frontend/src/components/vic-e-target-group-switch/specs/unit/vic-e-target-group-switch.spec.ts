import { VICTargetGroupSwitch } from "Components/vic-e-target-group-switch/vic-e-target-group-switch";

describe("VICTargetGroupSwitch tests:", () => {
  const vICTargetGroupSwitch = new VICTargetGroupSwitch();

  describe("onComponentInitialized method:", () => {
    beforeEach(() => {
      spyOn(vICTargetGroupSwitch, "dispatchEvent");
      spyOn(window, "CustomEvent");
      vICTargetGroupSwitch.onComponentInitialized();
    });

    test("should create custom kl-component-initialized event", () => {
      expect(window.CustomEvent).toBeCalledWith("kl-component-initialized");
    });

    test("should dispatch created event", () => {
      expect(vICTargetGroupSwitch.dispatchEvent).toBeCalledWith(expect.any(CustomEvent));
    });
  });

  describe("handleClick method:", () => {
    beforeEach(() => {
      spyOn(vICTargetGroupSwitch, "openToast");
    });

    test("should call openToast method", () => {
      vICTargetGroupSwitch.handleClick();
      expect(vICTargetGroupSwitch.openToast).toBeCalled();
    });
  });

  describe("handleKeydown method:", () => {
    let preventDefaultSpy: jest.SpyInstance;
    beforeEach(() => {
      spyOn(vICTargetGroupSwitch, "openToast");
      preventDefaultSpy = jest.fn();
    });

    test("should preventDefault if enter key is pressed", () => {
      vICTargetGroupSwitch.handleKeydown({
        // @ts-ignore
        preventDefault: preventDefaultSpy,
        key: "Enter",
      });
      expect(preventDefaultSpy).toBeCalled();
    });

    test("should preventDefault if space key is pressed", () => {
      vICTargetGroupSwitch.handleKeydown({
        // @ts-ignore
        preventDefault: preventDefaultSpy,
        key: " ",
      });
      expect(preventDefaultSpy).toBeCalled();
    });

    test("should not call preventDefault if other key is pressed", () => {
      vICTargetGroupSwitch.handleKeydown({
        // @ts-ignore
        preventDefault: preventDefaultSpy,
        key: "Escape",
      });
      vICTargetGroupSwitch.handleKeydown({
        // @ts-ignore
        preventDefault: preventDefaultSpy,
        key: "a",
      });
      expect(preventDefaultSpy).not.toBeCalled();
    });

    test("should openToast if enter key is pressed", () => {
      vICTargetGroupSwitch.handleKeydown({
        // @ts-ignore
        preventDefault: preventDefaultSpy,
        key: "Enter",
      });
      expect(vICTargetGroupSwitch.openToast).toBeCalled();
    });

    test("should openToast if space key is pressed", () => {
      vICTargetGroupSwitch.handleKeydown({
        // @ts-ignore
        preventDefault: preventDefaultSpy,
        key: " ",
      });
      expect(vICTargetGroupSwitch.openToast).toBeCalled();
    });

    test("should not call openToast if other key is pressed", () => {
      vICTargetGroupSwitch.handleKeydown({
        // @ts-ignore
        preventDefault: preventDefaultSpy,
        key: "Escape",
      });
      vICTargetGroupSwitch.handleKeydown({
        // @ts-ignore
        preventDefault: preventDefaultSpy,
        key: "a",
      });
      expect(vICTargetGroupSwitch.openToast).not.toBeCalled();
    });
  });
});
