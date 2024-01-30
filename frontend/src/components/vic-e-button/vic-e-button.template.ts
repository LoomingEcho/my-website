import { renderIcon } from "Components/vic-e-icon/vic-e-icon.template";
import { renderCssClasses } from "Helper/renderHelper/renderCssClasses";
import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined";

export interface RenderButtonArgs {
  isRealButton?: boolean;
  cssClasses?: string;
  type?: string;
  href?: string;
  label: string;
  iconId?: string;
  clickCB?: () => void;
}

const renderRealButton = (args: RenderButtonArgs) => {
  return html`
    <button
      class="vic-e-button${renderCssClasses(args.cssClasses)}"
      type="${args.type ? args.type : "button"}"
      @click=${ifDefined(args.clickCB)}
    >
      ${args.label} ${args.iconId ? renderIcon({ iconId: args.iconId, cssClasses: [""] }) : nothing}
    </button>
  `;
};

const renderLinkButton = (args: RenderButtonArgs) => {
  return html`
    <a
      class="vic-e-button${renderCssClasses(args.cssClasses)}"
      type="${args.type ? args.type : "button"}"
      href="${args.href || "#"}"
    >
      ${args.label} ${args.iconId ? renderIcon({ iconId: args.iconId, cssClasses: [""] }) : nothing}
    </a>
  `;
};

export const renderButton = (args: RenderButtonArgs) => {
  const isRealButton = args.isRealButton === undefined ? true : args.isRealButton;
  return isRealButton ? renderRealButton(args) : renderLinkButton(args);
};
