import {getPortfolioTags} from "@/api/strapi";
import {NextRequest} from "next/server";
import {Locale} from "@/api/locale";


export async function GET(request: NextRequest) {
  // Get locale
  const searchParams = request.nextUrl.searchParams;
  const locale = searchParams.get('locale') as Locale;

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
