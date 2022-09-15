import facebookLogo from "@images/icon-facebook.svg";
import twitterLogo from "@images/icon-twitter.svg";
import instagramLogo from "@images/icon-instagram.svg";
import youtubeLogo from "@images/icon-youtube.svg";

class WebSocialMedia extends HTMLLIElement {
  [key: string]: any;
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #socialMedia?: AppData.SocialMedia;
  headerElement: HTMLDivElement;
  logoElement: HTMLImageElement;

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-social-media");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.headerElement = <HTMLDivElement>this.#templateFragment.querySelector('[data-id="web-social-media-header"]');
    this.logoElement = <HTMLImageElement>this.#templateFragment.querySelector('[data-id="web-social-media-logo"]');
  }

  get socialMedia(): AppData.SocialMedia {
    if (this.#socialMedia) {
      return this.#socialMedia;
    } else {
      throw new Error("The social media is not valid");
    }
  }

  set socialMedia(newSocialMedia: AppData.SocialMedia) {
    this.#socialMedia = newSocialMedia;
    this.headerElement.classList.add(`web-social-media__header--${this.#socialMedia.name}`);
    this.logoElement.setAttribute("src", this.getLogo(this.#socialMedia.name));
    this.logoElement.setAttribute("alt", this.#socialMedia.name);


    /*
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
    */
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("web-social-media");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
    this.upgradeProperty("socialMedia");
  }

  upgradeProperty(prop: string) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  getLogo(logoName: string) {
    switch (logoName) {
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
}

export default WebSocialMedia;