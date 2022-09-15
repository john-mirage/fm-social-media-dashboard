declare namespace AppData {
  interface Stat {
    value: string;
    type: string;
    update: number;
  }
  
  interface SocialMedia {
    name: string;
    account: string;
    order: number;
    primary: Stat;
    secondary: Stat[];
  }
}
