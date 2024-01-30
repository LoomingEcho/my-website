import { renderIcon } from "Components/vic-e-icon/vic-e-icon.template";
import { renderCssClasses } from "Helper/renderHelper/renderCssClasses";
import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined";

export interface RenderLinkArgs {
  cssClasses?: string;
  href: string;
  disabled?: boolean;
  target?: string;
  label: string;
  iconId?: string;
}

const renderLabel = (label: string) => {
  return html`<span class="vic-e-link__label">${label}</span>`;
};

const renderLinkIcon = (iconId?: string) => {
  if (iconId === undefined) return nothing;
  return renderIcon({
    cssClasses: ["vic-e-link__icon"],
    iconId,
  });
};

export const renderLink = (args: RenderLinkArgs) => {
  return html`
    <a
      class="vic-e-link${renderCssClasses(args.cssClasses)}"
      href="${args.href}"
      ?disabled=${args.disabled || false}
      target=${ifDefined(args.target)}
    >
      ${renderLabel(args.label)}${renderLinkIcon(args.iconId)}
    </a>
  `;
};

export interface RenderLinkButtonArgs {
  cssClasses?: string;
  disabled?: boolean;
  label: string;
  iconId?: string;
  clickCB?: () => void;
}

export const renderLinkButton = (args: RenderLinkButtonArgs) => {
  return html`
    <button
      class="vic-e-link${renderCssClasses(args.cssClasses)}"
      ?disabled=${args.disabled || false}
      @click=${ifDefined(args.clickCB)}
    >
      ${renderLabel(args.label)}${renderLinkIcon(args.iconId)}
    </button>
  `;
};
