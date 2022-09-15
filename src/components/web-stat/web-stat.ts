class WebStat extends HTMLLIElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #stat?: AppData.Stat;

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-stat");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
  }

  get stat(): AppData.Stat {
    if (this.#stat) {
      return this.#stat;
    } else {
      throw new Error("The stat is not valid");
    }
  }

  set stat(newStat: AppData.Stat) {
    this.#stat = newStat;
    // TODO
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("web-stat");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
  }
}

export default WebStat;