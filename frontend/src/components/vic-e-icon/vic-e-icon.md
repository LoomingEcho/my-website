---
name: Icons
category: Basics
---

<a href="https://www.figma.com/file/ITkQkGVUdGs3AwbUUdVtb4/General?node-id=135%3A28" target="_blank" class="vic-lsg-figma-link" title="Show on Figma">
  <img src="../resources/lsg/figma-logo.svg" class="vic-lsg-figma-link__icon" />
</a>

This is a list of all icons used in project.

## Usage

```html
<vic-e-icon class="vic-e-icon" icon-id="vic-icon-person"></vic-e-icon>
```


```vic-e-icon.css hidden
.vic-lsg-icon__wrapper {
  display: flex;
  flex-flow:wrap;
  flex-direction: row;
}
.vic-lsg-icon__sample {
  width: 124px;
  margin: 2px;
}
.vic-lsg-icon {
  width: 100px;
  height: 100px;
  background: #f5f5f5;
  margin: 2px;
  padding: 10px;
  display: inline-block;
}
.vic-lsg-icon .vic-e-icon {
  width: 80px;
  height: 80px;
}
.vic-lsg-icon__label {
  font-size: 12px;
}
```

```vic-e-icon:demo/vic-e-icons--demo.html

```
