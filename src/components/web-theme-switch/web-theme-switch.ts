const LIGHT_THEME = "light";
const DARK_THEME = "dark";

class WebThemeSwitch extends HTMLLabelElement {
  inputElement: HTMLInputElement;

  constructor() {
    super();
    this.inputElement = <HTMLInputElement>this.querySelector('[data-id="web-theme-switch-input"]');
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  connectedCallback() {
    this.inputElement.addEventListener("click", this.handleInputChange);
  }

  disconnectedCallback() {
    this.inputElement.removeEventListener("click", this.handleInputChange);
  }

  handleInputChange() {
    const customEvent = new CustomEvent("update-theme", {
      bubbles: true,
      detail: { theme: this.inputElement.checked ? LIGHT_THEME : DARK_THEME }
    });
    this.dispatchEvent(customEvent);
  }
}

export default WebThemeSwitch;