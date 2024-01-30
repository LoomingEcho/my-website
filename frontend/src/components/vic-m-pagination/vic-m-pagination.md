---
name: Pagination
category: Molecules
---

<a href="https://www.figma.com/file/ITkQkGVUdGs3AwbUUdVtb4/General?node-id=278%3A4" target="_blank" class="vic-lsg-figma-link" title="Show on Figma">
  <img src="../resources/lsg/figma-logo.svg" class="vic-lsg-figma-link__icon" />
</a>

Bar to navigate through a given number of pages. If the page-count is greater than 5 the pagination-bar will be displayed in a compressed form.

The appearance of the bar is controlled by two attributes:

`page-count`: number of pages to be displayed

`initial-page`: (optional) index of the initial active page (defaults to the first page)

## Usage

```html
<vic-m-pagination class="vic-m-pagination" initial-page="3" page-count="10"></vic-m-pagination>
```

```vic-m-pagination:demo/pagination.html
```
