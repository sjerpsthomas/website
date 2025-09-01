import {NextRequest} from "next/server";
import {Locale} from "@/api/locale";
import {getPortfolioItems} from "@/api/portfolio";

interface Node {
  text?: string;
  type: string;
  children: Node[];
}


export async function GET(request: NextRequest) {
  // Get locale
  const searchParams = request.nextUrl.searchParams;
  const locale = searchParams.get('locale') as Locale;

  // Error handling
  if (locale == null)
    return new Response("Unspecified locale", {status: 422})

  // Get items, reduce
  const portfolioItems = getPortfolioItems(locale);

  // Return
  return new Response(JSON.stringify(portfolioItems), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
