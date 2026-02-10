import { redirect } from "next/navigation";

/** Canonical expert profile is /uzmanlar/[slug]. This route redirects for compatibility. */
export default async function RehberSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/uzmanlar/${slug}`);
}
