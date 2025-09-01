import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {Locale} from "@/api/locale";

const itemDirectories = {
  nl: path.join(process.cwd(), "content/portfolio_items/nl"),
  en: path.join(process.cwd(), "content/portfolio_items/en"),
};

export type PortfolioLink = {
  text: string;
  href: string;
}

export type PortfolioItem = {
  title: string;
  subtitle: string;
  image: string;
  tags: string[];
  description: string;
  links: PortfolioLink[];
  date: string,
}

export function getPortfolioItems(locale: Locale): PortfolioItem[] {
  const directory = itemDirectories[locale];

  const files = fs.readdirSync(directory);

  return files.map((file) => {
    const fileContent = fs.readFileSync(path.join(directory, file), "utf8");
    const { data, content } = matter(fileContent, { language: "json" });

    return {
      title: data.title as string,
      subtitle: data.subtitle as string,
      image: data.image as string,
      tags: data.tags as string[],
      description: content,
      links: data.links as PortfolioLink[],
      date: data.date as string,
    };
  }).sort((a, b) => Number(b.date) - Number(a.date));
}

const tagsFiles = {
  nl: path.join(process.cwd(), "content/portfolio_tags/nl.json"),
  en: path.join(process.cwd(), "content/portfolio_tags/en.json"),
}

export function getPortfolioTags(locale: Locale) {
  const fullPath = tagsFiles[locale];
  const fileContent = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(fileContent);
}