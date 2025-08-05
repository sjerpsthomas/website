import {Locale} from "@/i18n/routing";
import {strapi} from "@strapi/client";


// Strapi API .env values
export const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
export const STRAPI_API_URL = process.env.STRAPI_API_URL;

// Strapi client
const client = strapi({
  baseURL: STRAPI_API_URL,
  auth: STRAPI_API_TOKEN,
});

// Strapi locale conversion
const getStrapiLocale = (locale: Locale) => ({
  nl: 'nl-NL',
  en: 'en',
}[locale]);


// Get all portfolio items
export async function getPortfolioItems(locale: Locale, parameters: any = {}) {
  return await client.collection('portfolio-items').find({
    locale: getStrapiLocale(locale),
  });
}
