import {getPortfolioItems} from "@/api/strapi";
import {BlocksContent} from "@strapi/blocks-react-renderer";
import {NextRequest} from "next/server";


function blocksToString(block: BlocksContent) {
  return block.reduce((acc, node) => {
    if (node.type === 'text') {
      return acc + (node as { text: string }).text;
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
  const locale = searchParams.get('locale');

  // Error handling
  if (locale == null)
    return new Response("Unspecified locale", {status: 422})

  // Get items, reduce
  const portfolioItems: PortfolioItemResponse = (
    await getPortfolioItems(locale)
  ).map(it => ({
    id: it.id,
    title: it.title,
    subtitle: blocksToString(it.subtitle),
    image: it.image,
    tagIds: it.tags.map(tag => tag.id),
    description: blocksToString(it.description),
    linkTexts: it.links.map(link => link.text),
  }))

  // Return
  return new Response(JSON.stringify(portfolioItems), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
