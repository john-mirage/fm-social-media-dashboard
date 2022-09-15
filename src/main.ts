import "./main.css";

import WebApp from "@components/web-app/web-app";
import WebBar from "@components/web-bar/web-bar";
import WebThemeSwitch from "@components/web-theme-switch/web-theme-switch";
import WebDashboard from "@components/web-dashboard/web-dashboard";
import WebSocialMedia from "@components/web-social-media/web-social-media";
import WebStat from "@components/web-stat/web-stat";

customElements.define("web-app", WebApp, { extends: "main" });
customElements.define("web-bar", WebBar, { extends: "header" });
customElements.define("web-theme-switch", WebThemeSwitch, { extends: "label" });
customElements.define("web-dashboard", WebDashboard, { extends: "div" });
customElements.define("web-social-media", WebSocialMedia, { extends: "li" });
customElements.define("web-stat", WebStat, { extends: "li" });

window.addEventListener("load", () => {
  document.body.classList.remove("page--preload");
});