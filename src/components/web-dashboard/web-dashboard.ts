import WebSocialMedia from "@components/web-social-media/web-social-media";
import WebStat from "@components/web-stat/web-stat";
import socialMedias from "@data/social-medias.json";
import stats from "@data/stats.json";
import facebookLogo from "@images/icon-facebook.svg";
import twitterLogo from "@images/icon-twitter.svg";
import instagramLogo from "@images/icon-instagram.svg";
import youtubeLogo from "@images/icon-youtube.svg";
import carretUpIcon from "@images/icon-up.svg";
import carretDownIcon from "@images/icon-down.svg";

class WebDashboard extends HTMLDivElement {
  socialMediasListElement: HTMLUListElement;
  statsListElement: HTMLUListElement;
  webSocialMedia: WebSocialMedia;
  webStat: WebStat;
  
  constructor() {
    super();
    this.socialMediasListElement = <HTMLUListElement>this.querySelector('[data-id="web-dashboard-social-medias"]');
    this.statsListElement = <HTMLUListElement>this.querySelector('[data-id="web-dashboard-stats"]');
    this.webSocialMedia = <WebSocialMedia>document.createElement("li", { is: "web-social-media" });
    this.webStat = <WebStat>document.createElement("li", { is: "web-stat" });
  }

  connectedCallback() {
    this.socialMediasListElement.replaceChildren(
      ...socialMedias.map((socialMedia) => {
        const webSocialMedia = <WebSocialMedia>this.webSocialMedia.cloneNode(true);
        const logo = this.getSocialMediaLogo(socialMedia.name);
        const carret = this.getSocialMediaCarretIcon(socialMedia.update);
        webSocialMedia.socialMedia = { ...socialMedia, logo, carret };
        return webSocialMedia;
      })
    );
    this.statsListElement.replaceChildren(
      ...stats.map((stat) => {
        const webStat = <WebStat>this.webStat.cloneNode(true);
        const logo = this.getSocialMediaLogo(stat.name);
        const carret = this.getSocialMediaCarretIcon(stat.update);
        webStat.socialMediaStat = { ...stat, logo, carret };
        return webStat;
      })
    );
  }

  getSocialMediaLogo(socialMediaLogoName: string) {
    switch (socialMediaLogoName) {
      case "facebook":
        return facebookLogo;
      case "twitter":
        return twitterLogo;
      case "instagram":
        return instagramLogo;
      case "youtube":
        return youtubeLogo;
      default:
        throw new Error("The icon name is not valid");
    }
  }

  getSocialMediaCarretIcon(socialMediaUpdate: number) {
    return socialMediaUpdate <= 0 ? carretDownIcon : carretUpIcon;
  }
}

export default WebDashboard;