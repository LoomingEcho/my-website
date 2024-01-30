---
name: Link
category: Atoms
---

<a href="https://www.figma.com/file/ITkQkGVUdGs3AwbUUdVtb4/General?node-id=278%3A5" target="_blank" class="vic-lsg-figma-link" title="Show on Figma">
  <img src="../resources/lsg/figma-logo.svg" class="vic-lsg-figma-link__icon" />
</a>

This is a list of link types used in project.

## Usage

```hbs
{{> vic-e-link 
  linkLabel="{{linkLabel}}" 
  linkHref="{{linkHref}}"
  linkIcon="{{linkIcon}}"
  linkIconLeft="{{linkIconLeft}}"
  cssClasses="{{disabled}}"
  cssClasses="{{cssClasses}}"
}}
```

`linkLabel`- displayed link text

`linkHref` - target URL of this link

`linkIcon` - (optional) is one of the known icon IDs (see [#icons])

`linkIconLeft` - (optional) icon is displayed left of label

`disabled` - (optional) link is disabled

`cssClasses` - (optional) can be used to individualize the link.

```vic-e-icon:demo/vic-e-link--demo.html

```

```vic-e-icon.css hidden
.vic-lsg-link-list {
  list-style-type: none;
  margin: 0;
  padding: 10px;
}
.vic-lsg-link-list li {
  max-width: 320px;
}
```

```vic-e-icon-meta:demo/vic-e-link--meta-demo.html

```

```vic-e-icon-meta.css hidden
.vic-lsg-link-list {
  list-style-type: none;
  margin: 0;
  padding: 10px;
}
.vic-lsg-link-list li {
  max-width: 320px;
}
```
