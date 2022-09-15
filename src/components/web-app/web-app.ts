const LOCAL_STORAGE_KEY = "social-media-dashboard-theme";

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

class WebApp extends HTMLElement {
  userPreferedThemeMQL: MediaQueryList;

  static get observedAttributes() {
    return ["theme"];
  }

  constructor() {
    super();
    this.userPreferedThemeMQL = window.matchMedia("(prefers-color-scheme: light)");
    this.handleUserPreferedTheme = this.handleUserPreferedTheme.bind(this);
  }
  
  get localStorageTheme(): string | null {
    const localStorageTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
    return localStorageTheme !== null && (localStorageTheme === LIGHT_THEME || localStorageTheme === DARK_THEME)
      ? localStorageTheme
      : null;
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

  get theme(): string | null {
    return this.getAttribute("theme");
  }

  set theme(newTheme: string | null) {
    if (newTheme !== null) {
      if (newTheme === DARK_THEME || newTheme === LIGHT_THEME) {
        this.setAttribute("theme", newTheme);
      } else {
        throw new Error("The new theme is not valid");
      }
    } else {
      this.removeAttribute("theme");
    }
  }

  connectedCallback() {
    this.userPreferedThemeMQL.addEventListener("change", this.handleUserPreferedTheme);
  }

  disconnectedCallback() {
    this.userPreferedThemeMQL.removeEventListener("change", this.handleUserPreferedTheme);
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    switch (name) {
      case "theme":
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
}

export default WebApp;


/*
class ThemeManager {
    theme?: string;

     constructor() {
      const localStorageTheme = localStorage.getItem("theme") || "";
      const operatingSystemThemeIsLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      if (localStorageTheme !== "") {
          switch (localStorageTheme) {
              case "light":
                  this.setLightTheme();
                  break;
              case "dark":
                  this.setDarkTheme();
                  break;
              default:
                  this.setDarkTheme();
          }
      } else if (operatingSystemThemeIsLight) {
          this.setLightTheme();
      } else {
          this.setDarkTheme();
      }
  }

  setLocalTheme() {
      const localTheme = localStorage.getItem("theme");
      switch (this.theme) {
          case "light":
              if (localTheme !== "light") localStorage.setItem("theme", "light");
              break;
          case "dark":
              if (localTheme !== "dark") localStorage.setItem("theme", "dark");
              break;
          default:
              throw new Error("The theme is invalid");
      }
  }

  toggleTheme() {
      switch (this.theme) {
          case "light":
              this.setDarkTheme();
              break;
          case "dark":
              this.setLightTheme();
              break;
          default:
              throw new Error("The theme is invalid");
      }
  }

  setLightTheme() {
      this.theme = "light";
      if (!document.documentElement.classList.contains("light")) {
          document.documentElement.classList.add("light");
      }
      this.setLocalTheme();
  }

  setDarkTheme() {
      this.theme = "dark";
      if (document.documentElement.classList.contains("light")) {
          document.documentElement.classList.remove("light");
      }
      this.setLocalTheme();
  }

}

export default ThemeManager;
*/