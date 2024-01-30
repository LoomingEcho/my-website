---
name: Grid
category: Basics
---

<a href="https://www.figma.com/file/ITkQkGVUdGs3AwbUUdVtb4/General?node-id=78%3A0" target="_blank" class="vic-lsg-figma-link" title="Show on Figma">
  <img src="../resources/lsg/figma-logo.svg" class="vic-lsg-figma-link__icon" />
</a>

### Row-Container

- `<div class="vic-grid-row"></div>`

### Grid-Item-Container

- `<div class="vic-grid-col-M-W"></div>`

Where `M` equals the Mediaquery/Breakpoint (ie. mq1 - mq4) this rule is applied from and `W` equals the number of columns it will span (full width equals 12).

<span style="color: #000;">Breakpoint</span> | <span style="color: #000;">Viewport width</span>
------------ | -------------
MQ1 | 0 - 767px
MQ2 | 768px - 991px
MQ3 | 992px - 1321px
MQ4 | 1322px and up

### SCSS @extend rule

There is also a scss `@extend` Rules available which sets width and padding to match the grid styles. 

```scss
@extend %vic-grid-container;
```


### Basic Grid Cols Example

```grid-basic:vic-lsg-grid--basic.html
```


### Responsive Example

```grid-responsive:vic-lsg-grid--responsive.html
```

