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

/*
import ThemeManager from "@scripts/theme-manager";
import socialMedias from "@data/social-medias";
import carretUpIcon from "@images/icon-up.svg";
import carretDownIcon from "@images/icon-down.svg";

interface Stat {
    value: string;
    type: string;
    update: number;
}

interface SocialMedia {
    name: string;
    account: string;
    logo: string;
    order: string;
    primary: Stat;
    secondary: Stat[];
}

const socialMediaGrid = document.querySelector("#social-media-grid") as HTMLDivElement;
const socialMediaTemplate = document.querySelector("#social-media-template") as HTMLTemplateElement;
const statGrid = document.querySelector("#stat-grid") as HTMLDivElement;
const statTemplate = document.querySelector("#stat-template") as HTMLTemplateElement;
const themeButton = document.getElementById("theme-switcher") as HTMLInputElement;
const themeManager = new ThemeManager();

if (themeManager.theme === "light") themeButton.checked = true;

themeButton.addEventListener("change", () => {
    themeManager.toggleTheme();
});

themeButton.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        themeManager.toggleTheme();
        themeButton.checked = !themeButton.checked;
    }
});

socialMedias.forEach((socialMedia: SocialMedia) => {
    const socialMediaFragment = socialMediaTemplate.content.cloneNode(true) as HTMLElement;
    const socialMediaHeader = socialMediaFragment.querySelector(".social-media__header") as HTMLElement;
    const socialMediaLogo = socialMediaFragment.querySelector(".social-media__logo") as HTMLImageElement;
    const socialMediaAccount = socialMediaFragment.querySelector(".social-media__account") as HTMLParagraphElement;
    const socialMediaCount = socialMediaFragment.querySelector(".social-media__primary-count") as HTMLParagraphElement;
    const socialMediaType = socialMediaFragment.querySelector(".social-media__primary-type") as HTMLParagraphElement;
    const socialMediaCarretIcon = socialMediaFragment.querySelector(".social-media__carret-icon") as HTMLImageElement;
    const socialMediaUpdate = socialMediaFragment.querySelector(".social-media__update") as HTMLParagraphElement;
    socialMediaHeader.classList.add(`social-media__header--${socialMedia.name}`);
    socialMediaLogo.setAttribute("src", socialMedia.logo);
    socialMediaLogo.setAttribute("alt", socialMedia.name);
    socialMediaAccount.textContent = socialMedia.account;
    socialMediaCount.textContent = socialMedia.primary.value;
    socialMediaType.textContent = socialMedia.primary.type;
    socialMediaCarretIcon.setAttribute("src", socialMedia.primary.update > 0 ? carretUpIcon : carretDownIcon);
    socialMediaUpdate.classList.add(socialMedia.primary.update > 0 ? "social-media__update--increase" : "social-media__update--decrease");
    socialMediaUpdate.textContent = `${String(Math.abs(socialMedia.primary.update))} Today`;
    const socialMediaComment = document.createComment(socialMedia.name);
    socialMediaGrid.appendChild(socialMediaComment);
    socialMediaGrid.appendChild(socialMediaFragment);

    socialMedia.secondary.forEach((stat) => {
        const statFragment = statTemplate.content.cloneNode(true) as HTMLElement;
        const statDiv = statFragment.querySelector(".stat") as HTMLDivElement;
        const statName = statFragment.querySelector(".stat__name") as HTMLHeadingElement;
        const statIcon = statFragment.querySelector(".stat__icon") as HTMLImageElement;
        const statValue = statFragment.querySelector(".stat__value") as HTMLParagraphElement;
        const statCarretIcon = statFragment.querySelector(".stat__carret-icon") as HTMLImageElement;
        const statUpdate = statFragment.querySelector(".stat__update") as HTMLParagraphElement;
        statDiv.classList.add(`stat--${socialMedia.order}`);
        statName.textContent = stat.type;
        statIcon.setAttribute("src", socialMedia.logo);
        statIcon.setAttribute("alt", socialMedia.name);
        statValue.textContent = stat.value;
        statCarretIcon.setAttribute("src",stat.update > 0 ? carretUpIcon : carretDownIcon);
        statUpdate.textContent = `${String(Math.abs(stat.update))}%`;
        statUpdate.classList.add(stat.update > 0 ? "stat__update--increase" : "stat__update--decrease");
        const statComment = document.createComment(socialMedia.name);
        statGrid.appendChild(statComment);
        statGrid.appendChild(statFragment);
    });
});
*/