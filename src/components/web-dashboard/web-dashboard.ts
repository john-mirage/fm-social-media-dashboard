import WebSocialMedia from "@components/web-social-media/web-social-media";
import WebStat from "@components/web-stat/web-stat";
import data from "@data/social-medias.json";

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
    this.socialMediasListElement.replaceChildren();
    this.statsListElement.replaceChildren();
    data.forEach((socialMedia: AppData.SocialMedia) => {
      const webSocialMedia = <WebSocialMedia>this.webSocialMedia.cloneNode(true);
      webSocialMedia.socialMedia = socialMedia;
      this.socialMediasListElement.append(webSocialMedia);
      socialMedia.secondary.forEach((stat) => {
        const webStat = <WebStat>this.webStat.cloneNode(true);
        webStat.stat = stat;
        this.statsListElement.append(webStat);
      });
    });
  }
}

export default WebDashboard;