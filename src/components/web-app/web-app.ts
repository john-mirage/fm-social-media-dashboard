const LOCAL_STORAGE_KEY = "social-media-dashboard-theme";

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

class WebApp extends HTMLElement {
  userPreferedThemeMQL: MediaQueryList;

  static get observedAttributes() {
    return ["data-theme"];
  }

  constructor() {
    super();
    this.userPreferedThemeMQL = window.matchMedia("(prefers-color-scheme: light)");
    this.handleUserPreferedTheme = this.handleUserPreferedTheme.bind(this);
    this.handleTheme = this.handleTheme.bind(this);
  }
  
  get localStorageTheme(): string | null {
    const localStorageTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localStorageTheme !== null) {
      const theme = JSON.parse(localStorageTheme);
      return theme === LIGHT_THEME || theme === DARK_THEME ? theme : null;
    } else {
      return null;
    }
  }

  set localStorageTheme(newLocalStorageTheme: string | null) {
    if (newLocalStorageTheme !== null) {
      if (newLocalStorageTheme === DARK_THEME || newLocalStorageTheme === LIGHT_THEME) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newLocalStorageTheme));
      } else {
        throw new Error("The new local storage theme is not valid");
      }
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }

  get theme(): string | undefined {
    return this.dataset.theme;
  }

  set theme(newTheme: string | undefined) {
    if (newTheme !== undefined) {
      if (newTheme === DARK_THEME || newTheme === LIGHT_THEME) {
        this.dataset.theme = newTheme;
      } else {
        throw new Error("The new theme is not valid");
      }
    } else {
      this.removeAttribute("theme");
    }
  }

  connectedCallback() {
    if (this.localStorageTheme !== null) {
      this.theme = this.localStorageTheme;
    } else {
      this.theme = this.userPreferedThemeMQL.matches ? LIGHT_THEME : DARK_THEME;
    }
    this.userPreferedThemeMQL.addEventListener("change", this.handleUserPreferedTheme);
    this.addEventListener("update-theme", this.handleTheme);
  }

  disconnectedCallback() {
    this.userPreferedThemeMQL.removeEventListener("change", this.handleUserPreferedTheme);
    this.removeEventListener("update-theme", this.handleTheme);
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    switch (name) {
      case "data-theme":
        this.localStorageTheme = newValue;
        if (newValue === "light") {
          document.documentElement.classList.add(LIGHT_THEME);
        } else {
          document.documentElement.classList.remove(LIGHT_THEME);
        }
        break;
      default:
        throw new Error("The modified attribute is not valid");
    }
  }

  handleUserPreferedTheme(event: MediaQueryListEvent) {
    this.theme = event.matches ? LIGHT_THEME : DARK_THEME;
  }

  handleTheme(customEvent: Event) {
    const { theme } = (<CustomEvent>customEvent).detail;
    this.theme = theme;
  }
}

export default WebApp;