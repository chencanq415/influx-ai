import { FreeToolWorkspace } from "@/components/free-tools/free-tool-workspace";
import { freeTools, getFreeTool } from "@/lib/free-tools";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return freeTools.map((tool) => ({ slug: tool.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getFreeTool(slug);
  if (!tool) notFound();
  return <FreeToolWorkspace tool={tool} />;
}
