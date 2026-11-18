import { redirect } from "next/navigation";
import { JOURNAL_ARTICLES } from "@/data/journalArticles";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return JOURNAL_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default function BlogSlugRedirectPage({ params }: PageProps) {
  redirect(`/journal/${params.slug}`);
}
