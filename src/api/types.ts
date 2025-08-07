import {BlocksContent} from "@strapi/blocks-react-renderer";

export type PortfolioTag = {
  id: number;
  name: string;
}

export type PortfolioLink = {
  text: string;
  href: string;
}

export type PortfolioItem = {
  id: number;
  title: string;
  subtitle: BlocksContent;
  image: string;
  tags: PortfolioTag[];
  description: BlocksContent;
  links: PortfolioLink[];
  date: Date,
}
