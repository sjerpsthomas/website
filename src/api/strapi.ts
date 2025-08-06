import {Locale} from "@/i18n/routing";
import {strapi} from "@strapi/client";
import {cache} from "react";
import {PortfolioItem, PortfolioTag} from "@/api/types";


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


// Reduce items response
type PortfolioItemResponse = { image: { url: string } } & PortfolioItem;
function reduceItems(items: PortfolioItemResponse[]): PortfolioItem[] {
  return items.map(item => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    image: item.image.url,
    tags: reduceTags(item.tags),
    description: item.description,
    links: item.links,
  }));
}

// Get all portfolio items
export const getPortfolioItems = cache(async (locale: Locale) => {
  const res = (await client.collection('portfolio-items').find({
    populate: ['image', 'tags', 'links'],
    locale: getStrapiLocale(locale),
  })).data as unknown as PortfolioItemResponse[];

  return reduceItems(res);
})

// Reduce tags response
type PortfolioTagResponse = {
  id: number;
  name: string;
}
function reduceTags(tags: PortfolioTag[]): PortfolioTag[] {
  return tags.map(({ id, name }) => ({ id, name }))
}

// Get all portfolio tags
export const getPortfolioTags = cache(async (locale: Locale) => {
  const res = (await client.collection('tags').find({
    locale: getStrapiLocale(locale),
  })).data as unknown as PortfolioTagResponse[];

  return reduceTags(res);
})
