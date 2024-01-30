// import DebuggerService from "Services/DebuggerService";
import KeyboardFocusService from "Services/KeyboardFocusService";
import TargetGroupService from "Services/TargetGroupService";
import ViewportHeightService from "Services/ViewportHeightService";
import "../components";

export class App {
  constructor() {
    KeyboardFocusService.init();
    TargetGroupService.initBodyClassUpdater();
    ViewportHeightService.init();
  }
}
