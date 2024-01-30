import { html } from "lit-html";
import { getClassList } from "Helper/renderHelper/getClassList";

type RenderIconArgs = {
  iconId: string;
  cssClasses: Array<string>;
};

export const renderIcon = (args: RenderIconArgs) => {
  return html`
    <vic-e-icon class="${getClassList(["vic-e-icon"], args.cssClasses)}" icon-id="${args.iconId}"></vic-e-icon>
  `;
};
