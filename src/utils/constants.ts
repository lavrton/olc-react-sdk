export const PROD_API_BASE_URL = 'https://api.openletterconnect.com/api/v1/sdk';
export const STAGE_API_BASE_URL = 'https://stageapi.openletterconnect.com/api/v1/sdk';

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

export const defaultTemplateTypes: TemplateTypes [] = [
  {
    id: "1",
    label: "My Templates",
  },
  {
    id: "2",
    label: "Team Templates",
  }
];

export const sortOrderForTemplates: string[] = [
  "Postcards",
  "Personal Letters",
  "Professional Letters",
  "Bi-Fold Self-Mailers",
  "Tri-Fold Self-Mailers",
  "Real Penned Letter",
];

