import { toggleClass, onEvent, removeEvent } from "@kluntje/js-utils/lib/dom-helpers";
import { KEYBOARD_FOCUS } from "Constants/cssClasses";

/**
 * Global helper service to assist with focus-styles
 */
export class KeyboardFocusService {
  private initialized = false;
  private _isKeyboard: boolean;

  eventBindingMap = {};
  eventIdMap = new WeakMap();

  static get NAV_KEYS(): string[] {
    return ["Tab", "ArrowUp", "Up", "ArrowDown", "Down", "ArrowLeft", "Left", "ArrowRight", "Right"];
  }

  init() {
    if (this.initialized) return;
    onEvent(document.body, ["keydown"], this.handleKeyDown, this);
    this.initialized = true;
  }

  public get isKeyboard(): boolean {
    return this._isKeyboard;
  }

  private updateKeyboardState(isKeyboard: boolean): void {
    this._isKeyboard = isKeyboard;

    toggleClass(document.body, KEYBOARD_FOCUS, isKeyboard);

    if (isKeyboard) {
      onEvent(document.body, ["mousedown"], this.handleMouseDown, this);
      removeEvent(document.body, ["keydown"], this.handleKeyDown, this);
    } else {
      onEvent(document.body, ["keydown"], this.handleKeyDown, this);
      removeEvent(document.body, ["mousedown"], this.handleMouseDown, this);
    }
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (KeyboardFocusService.NAV_KEYS.includes(e.key)) {
      this.updateKeyboardState(true);
    }
  }

  private handleMouseDown(): void {
    this.updateKeyboardState(false);
  }
}

export default new KeyboardFocusService();
