import animateNumbers from "@utils/numbers";

class WebSocialMedia extends HTMLLIElement {
  [key: string]: any;
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #socialMedia?: AppData.SocialMediaWithIcons;
  logoElement: SVGUseElement;
  accountElement: HTMLParagraphElement;
  valueElement: HTMLParagraphElement;
  typeElement: HTMLParagraphElement;
  updateElement: HTMLDivElement;
  updateIconElement: SVGUseElement;
  updateValueElement: HTMLParagraphElement;

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-social-media");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.logoElement = <SVGUseElement>this.#templateFragment.querySelector('[data-id="web-social-media-logo"]');
    this.accountElement = <HTMLParagraphElement>this.#templateFragment.querySelector('[data-id="web-social-media-account"]');
    this.valueElement = <HTMLParagraphElement>this.#templateFragment.querySelector('[data-id="web-social-media-value"]');
    this.typeElement = <HTMLParagraphElement>this.#templateFragment.querySelector('[data-id="web-social-media-type"]');
    this.updateElement = <HTMLDivElement>this.#templateFragment.querySelector('[data-id="web-social-media-update"]');
    this.updateIconElement = <SVGUseElement>this.#templateFragment.querySelector('[data-id="web-social-media-update-icon"]');
    this.updateValueElement = <HTMLParagraphElement>this.#templateFragment.querySelector('[data-id="web-social-media-update-value"]');
  }

  get socialMedia(): AppData.SocialMediaWithIcons {
    if (this.#socialMedia) {
      return this.#socialMedia;
    } else {
      throw new Error("The social media is not valid");
    }
  }

  set socialMedia(newSocialMedia: AppData.SocialMediaWithIcons) {
    this.#socialMedia = newSocialMedia;
    this.classList.add(`web-social-media--${this.#socialMedia.name}`);
    this.logoElement.setAttribute("href", `#logo-${this.#socialMedia.name}`);
    this.accountElement.textContent = this.#socialMedia.account;
    this.typeElement.textContent = this.#socialMedia.type;
    this.updateElement.classList.add(`web-social-media__update--${this.#socialMedia.update > 0 ? "increase" : "decrease"}`);
    this.updateIconElement.setAttribute("href", this.#socialMedia.carret);
    this.updateValueElement.textContent = `${String(Math.abs(this.#socialMedia.update))} Today`;
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("web-social-media");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
    this.upgradeProperty("socialMedia");
    const end = Number(this.socialMedia.value.replaceAll(/\D/g, ""));
    const unit = this.socialMedia.value.replaceAll(/\d/g, "");
    animateNumbers(this.valueElement, 0, end, 1000, unit);
  }

  upgradeProperty(prop: string) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }
}

export default WebSocialMedia;