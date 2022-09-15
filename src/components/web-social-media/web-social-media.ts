class WebSocialMedia extends HTMLLIElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #socialMedia?: AppData.SocialMedia;

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-social-media");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
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
    // TODO
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("web-social-media");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
  }
}

export default WebSocialMedia;