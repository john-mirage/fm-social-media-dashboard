import animateNumbers from "@utils/numbers";

class WebStat extends HTMLLIElement {
  [key: string]: any;
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #socialMediaStat?: AppData.StatWithIcons;
  nameElement: HTMLParagraphElement;
  logoElement: HTMLImageElement;
  valueElement: HTMLParagraphElement;
  carretElement: HTMLImageElement;
  updateElement: HTMLParagraphElement;

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-stat");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.nameElement = <HTMLParagraphElement>this.#templateFragment.querySelector('[data-id="web-stat-name"]');
    this.logoElement = <HTMLImageElement>this.#templateFragment.querySelector('[data-id="web-stat-logo"]');
    this.valueElement = <HTMLParagraphElement>this.#templateFragment.querySelector('[data-id="web-stat-value"]');
    this.carretElement = <HTMLImageElement>this.#templateFragment.querySelector('[data-id="web-stat-carret"]');
    this.updateElement = <HTMLParagraphElement>this.#templateFragment.querySelector('[data-id="web-stat-update"]');
  }

  get socialMediaStat(): AppData.StatWithIcons {
    if (this.#socialMediaStat) {
      return this.#socialMediaStat;
    } else {
      throw new Error("The stat is not valid");
    }
  }

  set socialMediaStat(newSocialMediaStat: AppData.StatWithIcons) {
    this.#socialMediaStat = newSocialMediaStat;
    this.nameElement.textContent = this.#socialMediaStat.type;
    this.logoElement.setAttribute("src", this.#socialMediaStat.logo);
    this.logoElement.setAttribute("alt", this.#socialMediaStat.name);
    this.valueElement.textContent = this.#socialMediaStat.value;
    this.carretElement.setAttribute("src", this.#socialMediaStat.carret);
    this.updateElement.textContent = `${String(Math.abs(this.#socialMediaStat.update))}%`;
    this.updateElement.classList.add(this.#socialMediaStat.update > 0
      ? "web-stat__update--increase"
      : "web-stat__update--decrease"
    );
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("web-stat");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
    this.upgradeProperty("socialMediaStat");
    const end = Number(this.socialMediaStat.value.replaceAll(/\D/g, ""));
    const unit = this.socialMediaStat.value.replaceAll(/\d/g, "");
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

export default WebStat;