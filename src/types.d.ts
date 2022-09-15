declare namespace AppData {
  interface Stat {
    name: string;
    value: string;
    type: string;
    update: number;
  }

  interface StatWithIcons extends Stat {
    logo: string;
    carret: string;
  }
  
  interface SocialMedia {
    name: string;
    account: string;
    value: string;
    type: string;
    update: number;
  }

  interface SocialMediaWithIcons extends SocialMedia {
    logo: string;
    carret: string;
  }
}
