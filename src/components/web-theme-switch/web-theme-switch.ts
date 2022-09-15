const LIGHT_THEME = "light";
const DARK_THEME = "dark";

class WebThemeSwitch extends HTMLLabelElement {
  inputElement: HTMLInputElement;

  constructor() {
    super();
    this.inputElement = <HTMLInputElement>this.querySelector('[data-id="web-theme-switch-input"]');
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeydown = this.handleInputKeydown.bind(this);
  }

  connectedCallback() {
    this.inputElement.checked = document.documentElement.classList.contains("light");
    this.inputElement.addEventListener("click", this.handleInputChange);
    this.inputElement.addEventListener("keydown", this.handleInputKeydown);
  }

  disconnectedCallback() {
    this.inputElement.removeEventListener("click", this.handleInputChange);
    this.inputElement.removeEventListener("keydown", this.handleInputKeydown);
  }

  handleInputChange() {
    const customEvent = new CustomEvent("update-theme", {
      bubbles: true,
      detail: { theme: this.inputElement.checked ? LIGHT_THEME : DARK_THEME }
    });
    this.dispatchEvent(customEvent);
  }

  handleInputKeydown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.inputElement.checked = !this.inputElement.checked;
      this.handleInputChange();
    }
  }
}

export default WebThemeSwitch;