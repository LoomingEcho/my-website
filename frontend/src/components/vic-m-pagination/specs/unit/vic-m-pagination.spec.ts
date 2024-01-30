import * as litHtml from "lit-html";
import { VICPagination } from "Components/vic-m-pagination/vic-m-pagination";

jest.mock("lit-html", () => ({
  render: jest.fn(),
}));

const templateSpy = jest.fn();

describe("VICPagination tests:", () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  const vICPagination = new VICPagination();

  beforeEach(() => {
    vICPagination.paginationTemplate = templateSpy;
    spyOn(vICPagination, "loadTemplate").and.returnValue(Promise.resolve(templateSpy));
  });

  describe("onComponentInitialized method:", () => {
    beforeEach(() => {
      spyOn(vICPagination, "dispatchEvent");
      spyOn(window, "CustomEvent");
      vICPagination.onComponentInitialized();
    });

    test("should create custom kl-component-initialized event", () => {
      expect(window.CustomEvent).toBeCalledWith("kl-component-initialized");
    });

    test("should dispatch created event", () => {
      expect(vICPagination.dispatchEvent).toBeCalledWith(expect.any(CustomEvent));
    });
  });

  describe("activeItem setter:", () => {
    let isValidItemIndexSpy: jest.SpyInstance;
    beforeEach(() => {
      // @ts-ignore
      vICPagination._activeItem = 0;
      isValidItemIndexSpy = jest.spyOn(vICPagination, "isValidItemIndex");
      spyOn(vICPagination, "updateComponent");
    });

    test("should call isValidItemIndex to check if itemIdx is valid", () => {
      isValidItemIndexSpy.mockReturnValue(false);
      vICPagination.activeItem = 42;
      expect(isValidItemIndexSpy).toBeCalled();
    });

    test("should set _activeItem, if itemIdx is valid", () => {
      isValidItemIndexSpy.mockReturnValue(true);
      vICPagination.activeItem = 42;
      expect(vICPagination.activeItem).toEqual(42);
    });

    test("should call updateComponent, if itemIdx is valid", () => {
      isValidItemIndexSpy.mockReturnValue(true);
      vICPagination.activeItem = 42;
      expect(vICPagination.updateComponent).toBeCalled();
    });

    test("should not do anything, if itemIdx is not valid", () => {
      isValidItemIndexSpy.mockReturnValue(false);
      vICPagination.activeItem = 42;
      expect(vICPagination.activeItem).toEqual(0);
      expect(vICPagination.updateComponent).not.toBeCalled();
    });
  });

  describe("splitType getter:", () => {
    let pageCountSpy: jest.SpyInstance, activeItemSpy: jest.SpyInstance;
    beforeEach(() => {
      pageCountSpy = jest.spyOn(vICPagination, "pageCount", "get");
      activeItemSpy = jest.spyOn(vICPagination, "activeItem", "get");
    });

    test("should get current pageCount", () => {
      const splitType = vICPagination.splitType;
      expect(pageCountSpy).toBeCalled();
      expect(splitType.length > 0).toBe(true);
    });

    test("should get current activeItem", () => {
      const splitType = vICPagination.splitType;
      expect(activeItemSpy).toBeCalled();
      expect(splitType.length > 0).toBe(true);
    });

    test("should return 'none', if page-count is < 6", () => {
      for (let pageCount = 0; pageCount <= 5; pageCount++) {
        for (let activeItem = 0; activeItem < 5; activeItem++) {
          pageCountSpy.mockReturnValue(pageCount);
          activeItemSpy.mockReturnValue(activeItem);
          expect(vICPagination.splitType).toBe("none");
        }
      }
    });

    test("should return 'right', if page-count is >= 6 and activeItem is < 3", () => {
      for (let pageCount = 6; pageCount <= 20; pageCount++) {
        for (let activeItem = 0; activeItem < 3; activeItem++) {
          pageCountSpy.mockReturnValue(pageCount);
          activeItemSpy.mockReturnValue(activeItem);
          expect(vICPagination.splitType).toBe("right");
        }
      }
    });

    test("should return 'left', if page-count is >= 6 and activeItem is one of the last 3 items", () => {
      for (let pageCount = 6; pageCount <= 20; pageCount++) {
        for (let activeItem = pageCount; activeItem > pageCount - 4; activeItem--) {
          pageCountSpy.mockReturnValue(pageCount);
          activeItemSpy.mockReturnValue(activeItem);
          expect(vICPagination.splitType).toBe("left");
        }
      }
    });

    test("should return 'middle', otherwise", () => {
      for (let pageCount = 6; pageCount <= 20; pageCount++) {
        for (let activeItem = 3; activeItem < pageCount - 4; activeItem++) {
          pageCountSpy.mockReturnValue(pageCount);
          activeItemSpy.mockReturnValue(activeItem);
          expect(vICPagination.splitType).toBe("middle");
        }
      }
    });
  });

  describe("renderComponent method:", () => {
    beforeEach(() => {
      spyOn(vICPagination, "setInitialActiveItem");
      spyOn(litHtml, "render");
      spyOn(vICPagination, "dispatchChangedEvent");
    });

    test("should call setInitialActiveItem method", () => {
      vICPagination.renderComponent();
      expect(vICPagination.setInitialActiveItem).toBeCalled();
    });

    test("should call paginationTemplate method", () => {
      vICPagination.renderComponent();
      expect(templateSpy).toBeCalled();
    });

    test("should call lit-html render method", () => {
      vICPagination.renderComponent();
      expect(litHtml.render).toBeCalled();
    });
  });

  describe("updateComponent method:", () => {
    beforeEach(() => {
      spyOn(vICPagination, "healActiveItem");
      spyOn(litHtml, "render");
      spyOn(vICPagination, "dispatchChangedEvent");
    });

    test("should call healActiveItem method", () => {
      vICPagination.updateComponent();
      expect(vICPagination.healActiveItem).toBeCalled();
    });

    test("should call paginationTemplate method", () => {
      vICPagination.updateComponent();
      expect(templateSpy).toBeCalled();
    });

    test("should call lit-html render method", () => {
      vICPagination.updateComponent();
      expect(litHtml.render).toBeCalled();
    });

    test("should call dispatchChangedEvent method", () => {
      vICPagination.updateComponent();
      expect(vICPagination.dispatchChangedEvent).toBeCalled();
    });
  });
});
