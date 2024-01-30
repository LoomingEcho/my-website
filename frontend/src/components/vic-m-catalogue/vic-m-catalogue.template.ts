import { html } from "lit-html";
import { renderLazyImage } from "Components/vic-e-lazy-image/vic-e-lazy-image.template";
import { VICCatalogue } from "Components/vic-m-catalogue/vic-m-catalogue";
import { renderPagination } from "Components/vic-m-pagination/vic-m-pagination.template";
import I18nService from "Services/I18nService";
import { renderButton } from "Components/vic-e-button/vic-e-button.template";
import { CatalogueItem } from "Components/vic-m-catalogue/vic-m-catalogue.types";

export const renderCatalogueItem = async (item: CatalogueItem) => {
  return html`<div
    class="vic-grid-col-mq1-12 vic-grid-col-mq2-6 vic-grid-col-mq3-6 vic-grid-col-mq4-4 vic-m-catalogue__item_card"
  >
    <div class="vic-m-catalogue__lazy-image-box">
      ${renderLazyImage({
        aspectRatio: "1:1",
        src: item.media.renditions["1280"],
        sizes: `${Object.keys(item.media.renditions).join("w, ")}w`,
        srcset: Object.entries(item.media.renditions)
          .map(([key, value]) => `${value} ${key}w`)
          .join(", "),
        alt: item.media.alt,
      })}
    </div>
    <div class="vic-m-catalogue__content">
      <div class="vic-m-catalogue__item-title">${item.headline}</div>
      <div class="vic-m-catalogue__item-subtitle">${item.subheadline}</div>
      <p class="vic-p vic-p-catalogue__text">${item.text}</p>
      ${renderButton({
        cssClasses: "vic-m-catalogue__btn  vic-e-button--secondary",
        label: (await I18nService.getValue("viessmann.corporate.catalogue.item.button.label")) || "",
      })}
    </div>
  </div>`;
};

export const catalogueTemplate = async (component: VICCatalogue) => {
  return html`<div class="vic-m-catalogue__grid">
    <div class="vic-grid">
      <h1 class="vic-catalogue__headline">
        ${(await I18nService.getValue("viessmann.corporate.catalogue.title")) || ""}
      </h1>
      <div class="vic-grid-row">${await Promise.all(component.catalogue.items.map(renderCatalogueItem))}</div>
      <hr class="vic-m-catalogue__separator-line" />
      ${renderPagination({
        initialPage: component.offset,
        cssClasses: "vic-m-catalogue__pagination",
        pageCount: Math.ceil(component.catalogue.numberResults / component.size),
      })}
    </div>
  </div>`;
};
