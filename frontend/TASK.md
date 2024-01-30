# Product Catalogue Component

Create a Product Catalogue Component with the following specifications:

+ Responsive Styling of the Component ([Figma Design](https://www.figma.com/file/ITkQkGVUdGs3AwbUUdVtb4/General?node-id=1061%3A27295))
+ Fetch data from a mocked api-endpoint.
+ Render Result-List Client-Side using lit-html
+ Split Results into pages (10 items per page)


## API endpoint specifications

Endpoint to receive GET-Requests with the following params:

+ size: number of results
+ offset: offset of the first result

The API result should be structured like this:

```json
  {
    results: {
      numberResults: 42,
      items: [
        {
          headline: "Vitodens 111-W",
          subheadline: "A high performance storage combi boiler for the family home",
          text:
            "Compact, rapid and reliable, the Vitodens 111-W is a high performance, wall mounted storage boiler ideal for family homes with a high demand for hot water.",
          url: "#",
          type: "PRODUCT",
          media: {
            alt: "Alt Text",
            renditions: {
              60: "https://satyr.io/60x1:1/ff3e17",
              320: "https://satyr.io/320x1:1/ff3e17",
              640: "https://satyr.io/640x1:1/ff3e17",
              1280: "https://satyr.io/1280x1:1/ff3e17",
            },
          }
        },
        // ...
      ]
    }
  }
```

