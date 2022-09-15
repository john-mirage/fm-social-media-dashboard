import WebSocialMedia from "@components/web-social-media/web-social-media";
import WebStat from "@components/web-stat/web-stat";
import socialMedias from "@data/social-medias.json";
import stats from "@data/stats.json";

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
        const carret = this.getSocialMediaCarretIcon(socialMedia.update);
        webSocialMedia.socialMedia = { ...socialMedia, carret };
        return webSocialMedia;
      })
    );
    this.statsListElement.replaceChildren(
      ...stats.map((stat) => {
        const webStat = <WebStat>this.webStat.cloneNode(true);
        const carret = this.getSocialMediaCarretIcon(stat.update);
        webStat.socialMediaStat = { ...stat, carret };
        return webStat;
      })
    );
  }

  getSocialMediaCarretIcon(socialMediaUpdate: number): string {
    return socialMediaUpdate <= 0 ? "#icon-down" : "#icon-up";
  }
}

export default WebDashboard;