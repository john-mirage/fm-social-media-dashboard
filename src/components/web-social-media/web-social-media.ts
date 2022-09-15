class WebSocialMedia extends HTMLLIElement {
  [key: string]: any;
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #socialMedia?: AppData.SocialMediaWithIcons;
  headerElement: HTMLDivElement;
  logoElement: HTMLImageElement;
  accountElement: HTMLParagraphElement;
  countElement: HTMLParagraphElement;
  typeElement: HTMLParagraphElement;
  carretElement: HTMLImageElement;
  updateElement: HTMLParagraphElement;

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-social-media");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.headerElement = <HTMLDivElement>this.#templateFragment.querySelector('[data-id="web-social-media-header"]');
    this.logoElement = <HTMLImageElement>this.#templateFragment.querySelector('[data-id="web-social-media-logo"]');
    this.accountElement = <HTMLParagraphElement>this.#templateFragment.querySelector('[data-id="web-social-media-account"]');
    this.countElement = <HTMLParagraphElement>this.#templateFragment.querySelector('[data-id="web-social-media-count"]');
    this.typeElement = <HTMLParagraphElement>this.#templateFragment.querySelector('[data-id="web-social-media-type"]');
    this.carretElement = <HTMLImageElement>this.#templateFragment.querySelector('[data-id="web-social-media-carret"]');
    this.updateElement = <HTMLParagraphElement>this.#templateFragment.querySelector('[data-id="web-social-media-update"]');
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
    this.headerElement.classList.add(`web-social-media__header--${this.#socialMedia.name}`);
    this.logoElement.setAttribute("src", this.#socialMedia.logo);
    this.logoElement.setAttribute("alt", this.#socialMedia.name);
    this.accountElement.textContent = this.#socialMedia.account;
    this.countElement.textContent = this.#socialMedia.value;
    this.typeElement.textContent = this.#socialMedia.type;
    this.carretElement.setAttribute("src", this.#socialMedia.carret);
    this.updateElement.classList.add(this.#socialMedia.update > 0 ? "web-social-media__update--increase" : "web-social-media__update--decrease");
    this.updateElement.textContent = `${String(Math.abs(this.#socialMedia.update))} Today`;
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
}

export default WebSocialMedia;