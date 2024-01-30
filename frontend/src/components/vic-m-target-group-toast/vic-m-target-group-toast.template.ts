import { renderButton } from "Components/vic-e-button/vic-e-button.template";
import { renderIcon } from "Components/vic-e-icon/vic-e-icon.template";
import { renderLinkButton } from "Components/vic-e-link/vic-e-link.template";
import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined";
import I18nService from "Services/I18nService";
import TargetGroupService from "Services/TargetGroupService";

export const targetGroupToastTemplate = async () => {
  const homepageUrl = await TargetGroupService.getOtherHomepageUrl();
  return html`
    <div class="vic-m-target-group-toast__content">
      <button
        class="vic-m-target-group-toast__close-btn"
        aria-label="${ifDefined(await I18nService.getValue("viessmann.corporate.targetGroupSwitch.closing.label"))}"
      >
        ${renderIcon({
          cssClasses: ["vic-m-target-group-toast__close-icon"],
          iconId: "vic-icon-close",
        })}
      </button>
      <h3 class="vic-m-target-group-toast__headline">${await TargetGroupService.getI18nValue("headline")}</h3>
      <p class="vic-m-target-group-toast__text">${await TargetGroupService.getI18nValue("text")}</p>
      ${renderButton({
        isRealButton: true,
        cssClasses: "vic-m-target-group-toast__selection-cta vic-m-target-group-toast__selection-cta--switch-and-stay",
        label: await TargetGroupService.getI18nValue("switchAndStayCta.label"),
      })}
      ${homepageUrl !== ""
        ? renderButton({
            isRealButton: false,
            cssClasses:
              "vic-m-target-group-toast__selection-cta vic-m-target-group-toast__selection-cta--switch-and-go",
            label: await TargetGroupService.getI18nValue("switchAndGoCta.label"),
            href: homepageUrl,
          })
        : nothing}
      ${renderLinkButton({
        label: await TargetGroupService.getI18nValue("stayCta.label"),
        cssClasses: "vic-m-target-group-toast__stay-cta",
        iconId: "vic-icon-chevron-right",
      })}
    </div>
  `;
};
