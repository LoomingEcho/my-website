---
name: Button
category: Atoms
---

<a href="https://www.figma.com/file/ITkQkGVUdGs3AwbUUdVtb4/General?node-id=6%3A29" target="_blank" class="vic-lsg-figma-link" title="Show on Figma">
  <img src="../resources/lsg/figma-logo.svg" class="vic-lsg-figma-link__icon" />
</a>

There are three different button-types:

`primary/default`: default button (no modifier class needed)

`secondary`: secondary button (add `vic-e-button--secondary` css-class to activate this type)

`tertiary`: tertiary button (add `vic-e-button--tertiary` css-class to activate this type)

All of these button come in two sizes:

`big/default`: default button (no modifier class needed)

`small`: small button (add `vic-e-button--small` css-class to activate this type)

For buttons with only icons use:

`isRealButton`: `true`

`iconId`: icon's ID

## Usage

```hbs
{{> vic-e-button
  label="{{buttonLabel}}"
  cssClasses="{{modifierClass}}"
  disabled={{buttonDisabled}}
}}
```

```hbs
{{!-- icon only / without label --}}

{{> vic-e-button
 iconOnly=true
 iconId="vic-icon-close"
 isRealButton=true
 cssClasses=""
 attributes=(attr title="close")
}}
```

```vic-e-button:demo/buttons.html
```

```vic-e-button.css hidden
.vic-e-button {
  margin: 10px;
  max-width: 350px;
}
```