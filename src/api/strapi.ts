import {Locale} from "@/i18n/routing";
import {strapi} from "@strapi/client";
import {cache} from "react";
import {PortfolioItem} from "@/api/types";


// Strapi API .env values
export const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
export const STRAPI_API_URL = process.env.STRAPI_API_URL;

// Strapi client
const client = strapi({
  baseURL: STRAPI_API_URL! as string,
  auth: STRAPI_API_TOKEN! as string,
});

// Strapi locale conversion
const getStrapiLocale = (locale: Locale) => ({
  nl: 'nl-NL',
  en: 'en',
}[locale]);


// Get all portfolio items
export const getPortfolioItems = cache(async (locale: Locale) => {
  return (await client.collection('portfolio-items').find({
    populate: ['image', 'tags', 'links'],
    locale: getStrapiLocale(locale),
  })).data.map((item) => ({
      ...item,
      image: item.image.url
    })
  ) as PortfolioItem[]
})

// Get all portfolio tags
export const getPortfolioTags = cache(async (locale: Locale) => {
  return (await client.collection('tags').find({
    locale: getStrapiLocale(locale),
  })).data as PortfolioItem[]
})
