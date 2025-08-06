import {getPortfolioItems} from "@/api/strapi";
import {NextRequest} from "next/server";
import {Locale} from "@/i18n/routing";

interface Node {
  text?: string;
  type: string;
  children: Node[];
}

function blocksToString(block: Node[]): string {
  return block.reduce((acc, node) => {
    if (node.type === 'text') {
      return acc + node.text;
    }
    return acc + blocksToString(node.children);
  }, '');
}

type PortfolioItemResponse = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  tagIds: number[];
  description: string;
  linkTexts: string[];
}


export async function GET(request: NextRequest) {
  // Get locale
  const searchParams = request.nextUrl.searchParams;
  const locale = searchParams.get('locale') as Locale;

  // Error handling
  if (locale == null)
    return new Response("Unspecified locale", {status: 422})

  // Get items, reduce
  const portfolioItems: PortfolioItemResponse[] = (
    await getPortfolioItems(locale)
  ).map(it => ({
    id: it.id,
    title: it.title,
    subtitle: blocksToString(it.subtitle as Node[]),
    image: it.image,
    tagIds: it.tags.map(tag => tag.id),
    description: blocksToString(it.description as Node[]),
    linkTexts: it.links.map(link => link.text),
  }))

  // Return
  return new Response(JSON.stringify(portfolioItems), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
