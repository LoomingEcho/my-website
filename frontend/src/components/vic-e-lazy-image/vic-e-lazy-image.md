---
name: Lazy Image
category: Atoms
---

Standard presentation of images. Loading of the image is deferred until it becomes visible in the viewport.

Image ratios used in application: `21:9`, `16:9`, `4:3`, `3:2`, `1:1`, `2:3`.

### Structure

`<vic-e-lazy-image class="vic-e-lazy-image"></vic-e-lazy-image>` is a custom element. The image will be loaded in the element's shadow DOM by the JavaScript application.

### Attributes

The element **must** have the following attributes:

* `src` - the source URL
* `alt` - text description of image
* `aspect-ratio` - with one of the following values:
  * `21:9`
  * `16:9`
  * `4:3`
  * `3:2`
  * `1:1`
  * `2:3`
  * `4:5`
  * `cover` - [see MDN documentation for `object-fit: cover`](https://developer.mozilla.org/de/docs/Web/CSS/object-fit)
  * `contain` - [see MDN documentation for `object-fit: contain`](https://developer.mozilla.org/de/docs/Web/CSS/object-fit)

The element *should* have the following attributes, so that appropriately sized images are loaded for the current viewport:

* `sizes` - [see MDN documentation for `sizes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes)
* `srcset` - [see MDN documentation for `srcset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)

The element *can* have the following additional attributes:
* `loading-placeholder` - low-res placeholder image to show while high-res image is loading


```vic-e-lazy-image:vic-e-lazy-image.html
```

## No Image Placeholder

```vic-e-lazy-image-no-image:vic-e-lazy-image--placeholder.html
```

### Placeholder Example

```vic-e-lazy-image-placeholder-example:demo/placeholder.html
```

### Loading Error Handling

```vic-e-lazy-image-loading-errors:demo/loading-errors.html
```
