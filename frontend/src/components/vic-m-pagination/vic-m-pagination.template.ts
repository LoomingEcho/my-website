/* eslint-disable prettier/prettier */
import { ACTIVE } from "Constants/cssClasses";
import { renderCssClasses } from "Helper/renderHelper/renderCssClasses";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined";

import { VICPagination } from "./vic-m-pagination";

const getItemClasses = (isActive: boolean): string => {
  const defaultClasses = ["vic-e-button", "vic-e-button--tertiary", "vic-m-pagination__item"];
  const itemClasses = defaultClasses;
  if (isActive) itemClasses.push(ACTIVE);
  return itemClasses.join(" ");
};

const renderItem = (index: number, component: VICPagination) => {
  const isActiveItem = component.activeItem === index;
  return html`
    <button type="button" class=${getItemClasses(isActiveItem)} @click=${() => component.handleItemClick(index)}>
      ${index + 1}
    </button>
  `;
};

const renderDots = () => {
  return html`<span class="vic-m-pagination__dots" }>...</span>`;
};

const renderNoSplit = (component: VICPagination) => {
  return new Array(component.pageCount).fill(true).map((_, index) => renderItem(index, component));
};

const renderRightSplit = (component: VICPagination) => {
  return html`
    ${new Array(4).fill(true).map((_, index) => renderItem(index, component))}
    ${renderDots()}
    ${renderItem(component.pageCount - 1, component)}
  `;
};

const renderLeftSplit = (component: VICPagination) => {
  return html`
    ${renderItem(0, component)}
    ${renderDots()}
    ${new Array(4).fill(true).map((_, index) => renderItem(index + component.pageCount - 4, component))}
  `;
};

const renderMiddleSplit = (component: VICPagination) => {
  return html`
    ${renderItem(0, component)}
    ${renderDots()}
    ${new Array(3).fill(true).map((_, index) => renderItem(index + component.activeItem - 1, component))}
    ${renderDots()}
    ${renderItem(component.pageCount - 1, component)}
    `;
};

const renderMobilePagination = (component: VICPagination) => {
  return html`
    <span class="vic-m-pagination__label vic-m-pagination__label--active">${component.activeItem + 1}</span>
    <span class="vic-m-pagination__label vic-m-pagination__label--count">${component.pageCount}</span>
  `;
};

const renderItems = (component: VICPagination) => {
  if (component.currentMQ === "MQ1") {
    return renderMobilePagination(component);
  }

  switch (component.splitType) {
    case "none":
      return renderNoSplit(component);
    case "right":
      return renderRightSplit(component);
    case "left":
      return renderLeftSplit(component);
    default:
      return renderMiddleSplit(component);
  }
};

export const paginationTemplate = (component: VICPagination) => {
  return html`
    <button
      type="button"
      class="vic-e-button vic-e-button--tertiary vic-m-pagination__nav-button"
      ?disabled=${component.activeItem === 0}
      @click=${() => component.handlePrevClick()}
    >
      <vic-e-icon class="vic-e-icon" icon-id="vic-icon-chevron-left"></vic-e-icon>
    </button>
    <div class="vic-m-pagination__items">${renderItems(component)}</div>
    <button
      type="button"
      class="vic-e-button vic-e-button--tertiary vic-m-pagination__nav-button"
      ?disabled=${component.activeItem + 1 >= component.pageCount}
      @click=${() => component.handleNextClick()}
    >
      <vic-e-icon class="vic-e-icon" icon-id="vic-icon-chevron-right"></vic-e-icon>
    </button>
  `;
};

export interface RenderPaginationArgs {
  cssClasses?: string;
  initialPage?: number;
  pageCount: number;
}

export const renderPagination = (args: RenderPaginationArgs) => {
  return html`
    <vic-m-pagination class="vic-m-pagination${renderCssClasses(args.cssClasses)}"
                      initial-page=${ifDefined(args.initialPage)}
                      page-count="${args.pageCount}">
    </vic-m-pagination>
  `;
}