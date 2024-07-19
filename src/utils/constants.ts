export const API_BASE_URL = 'https://api.openletterconnect.com/api/v1/sdk';

export const DPI: number = 96;

export const Barcode: string = 'https://api.openletterconnect.com/api/v1/download/s3/openletterconnect/assets/preview/one-barcode.png';
export const PRODUCT_LEARN_URL: string = "https://help.openletterconnect.com/getting-support/designing-your-mailers/wip-designing-mail-creatives/wip-mail-piece-design-specs";

export const multiPageLetters: string[] = [
  "Postcards",
  "Tri-Fold Self-Mailers",
  "Bi-Fold Self-Mailers",
];

interface TemplateTypes {
  id: string;
  label: string;
}

export const templateTypes: TemplateTypes [] = [
  {
    id: "1",
    label: "My Templates",
  },
  {
    id: "2",
    label: "Team Templates",
  },
  {
    id: "3",
    label: "OLC Templates",
  },
];

export const sortOrderForTemplates: string[] = [
  "Postcards",
  "Personal Letters",
  "Professional Letters",
  "Bi-Fold Self-Mailers",
  "Tri-Fold Self-Mailers",
  "Real Penned Letter",
];

