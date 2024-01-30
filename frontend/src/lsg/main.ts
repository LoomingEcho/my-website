// LSG Helpers
import "./helpers/copyToClipboard";

// LSG Components
import "Components/lsg-helpers/vic-lsg-toolbar/vic-lsg-toolbar";

declare global {
  interface Window {
    copyToClipboard: any;
  }
}
