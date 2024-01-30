import { App } from "Core/App";

declare global {
  interface Window {
    _vicApp: App;
    Granite: any;
    objectFitPolyfill: any;
    onYouTubeIframeAPIReady: () => void;
  }
}
