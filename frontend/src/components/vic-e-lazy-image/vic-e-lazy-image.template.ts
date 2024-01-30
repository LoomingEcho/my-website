import { renderIcon } from "Components/vic-e-icon/vic-e-icon.template";
import { renderCssClasses } from "Helper/renderHelper/renderCssClasses";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined";

import { VICLazyImage } from "./vic-e-lazy-image";
import vicELazyImageShadowScss from "./vic-e-lazy-image.shadow.scss";
import { RenderLazyImageArgs } from "./vic-e-lazy-image.types";

export interface LazyImageTemplateArgs {
  src: string;
  srcset?: string;
  sizes?: string;
  alt?: string;
  aspectRatio?: string;
  component: VICLazyImage;
}

const shouldRenderErrorPlaceholder = (args: LazyImageTemplateArgs) => {
  return !(args.component.hasError === false || args.component.loadingPlaceholderLoaded === true);
};

const renderErrorPlaceholder = (args: LazyImageTemplateArgs, forceRender = false) => {
  if (forceRender === false && !shouldRenderErrorPlaceholder(args)) return "";

  return html`
    <div class="vic-e-lazy-image__error-placeholder-box">
      ${renderIcon({
        iconId: "vic-icon-placeholder",
        cssClasses: ["vic-e-lazy-image__error-placeholder"],
      })}
    </div>
  `;
};

const renderPlaceholder = (args: LazyImageTemplateArgs) => {
  if (args.component.loadingPlaceholder === "" || args.component.loadingPlaceholderLoadingError === true) {
    return renderErrorPlaceholder(args, true);
  }

  return html`
    <img
      draggable="false"
      class="vic-e-lazy-image__placeholder"
      src="${args.component.loadingPlaceholder}"
      @load=${() => {
        args.component.loadingPlaceholderLoaded = true;
        args.component.loadingPlaceholderLoadingError = false;
      }}
      @error=${() => {
        args.component.loadingPlaceholderLoaded = false;
        args.component.loadingPlaceholderLoadingError = true;
      }}
    />
  `;
};

const renderImage = (args: LazyImageTemplateArgs) => {
  return html`
    <img
      draggable="false"
      class="vic-e-lazy-image__image"
      src="${args.src}"
      srcset="${ifDefined(args.srcset)}"
      alt="${ifDefined(args.alt)}"
      sizes="${ifDefined(args.sizes)}"
    />
  `;
};

export const lazyImageTemplate = (args: LazyImageTemplateArgs) => {
  return html`
    <style>
      ${vicELazyImageShadowScss}
    </style>
    <div
      class="vic-e-lazy-image__image-box"
      data-aspect-ratio="${ifDefined(args.aspectRatio)}"
      ?data-image-loaded="${args.component.imageLoaded}"
    >
      ${renderPlaceholder(args)} ${renderImage(args)}
    </div>
  `;
};

export const renderLazyImage = (args: RenderLazyImageArgs) => {
  return html`
    <vic-e-lazy-image
      class="vic-e-lazy-image${renderCssClasses(args.cssClasses)}"
      src="${args.src}"
      alt=${ifDefined(args.alt)}
      srcset=${ifDefined(args.srcset)}
      sizes=${ifDefined(args.sizes)}
      loading-placeholder=${ifDefined(args.loadingPlaceholder)}
      aspect-ratio=${ifDefined(args.aspectRatio)}
    >
    </vic-e-lazy-image>
  `;
};

export interface RenderLazyImagePlaceholderArgs {
  cssClasses?: string;
  aspectRatio: string;
}

export const renderLazyImagePlaceholder = (args: RenderLazyImagePlaceholderArgs) => {
  return html`
    <div
      class="vic-e-lazy-image vic-e-lazy-image--placeholder${renderCssClasses(args.cssClasses)}"
      aspect-ratio="${args.aspectRatio}"
    >
      <div class="vic-e-lazy-image__placeholder-content">
        ${renderIcon({
          cssClasses: ["vic-e-lazy-image__placeholder-icon"],
          iconId: "vic-icon-placeholder",
        })}
      </div>
    </div>
  `;
};
