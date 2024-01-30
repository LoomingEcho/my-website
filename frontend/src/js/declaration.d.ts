declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.hbs";
/*
declare module 'googlemaps';
declare module 'google-maps-infobox';
declare module '@google/markerclusterer';
*/

// Path to FE directory, defined in webpack config, depending on environment
declare const PUBLIC_PATH: string; // eslint-disable-line one-var
