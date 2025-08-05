import {getPortfolioItems, getPortfolioTags} from "@/api/strapi";
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

  // Get tags
  const tags = await getPortfolioTags(locale);

  // Return
  return new Response(JSON.stringify(tags), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
