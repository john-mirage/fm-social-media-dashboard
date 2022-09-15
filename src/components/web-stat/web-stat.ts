import animateNumbers from "@utils/numbers";

class WebStat extends HTMLLIElement {
  [key: string]: any;
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #socialMediaStat?: AppData.StatWithIcons;
  nameElement: HTMLParagraphElement;
  logoElement: SVGUseElement;
  valueElement: HTMLParagraphElement;
  updateElement: HTMLDivElement;
  updateIconElement: SVGUseElement;
  updateValueElement: HTMLParagraphElement;

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-stat");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.nameElement = <HTMLParagraphElement>this.#templateFragment.querySelector('[data-id="web-stat-name"]');
    this.logoElement = <SVGUseElement>this.#templateFragment.querySelector('[data-id="web-stat-logo"]');
    this.valueElement = <HTMLParagraphElement>this.#templateFragment.querySelector('[data-id="web-stat-value"]');
    this.updateElement = <HTMLDivElement>this.#templateFragment.querySelector('[data-id="web-stat-update"]');
    this.updateIconElement = <SVGUseElement>this.#templateFragment.querySelector('[data-id="web-stat-update-icon"]');
    this.updateValueElement = <HTMLParagraphElement>this.#templateFragment.querySelector('[data-id="web-stat-update-value"]');
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
    this.logoElement.setAttribute("href", `#logo-${this.#socialMediaStat.name}`);
    this.valueElement.textContent = this.#socialMediaStat.value;
    this.updateElement.classList.add(`web-stat__update--${this.#socialMediaStat.update > 0 ? "increase" : "decrease"}`);
    this.updateIconElement.setAttribute("href", this.#socialMediaStat.carret);
    this.updateValueElement.textContent = `${String(Math.abs(this.#socialMediaStat.update))}%`;
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