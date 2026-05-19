import { notFound } from "next/navigation";
import { MODULES, getModule, getNextModule } from "@/lib/modules";
import ModuleClient from "./ModuleClient";

export function generateStaticParams() {
  return MODULES.map(m => ({ slug: m.slug }));
}

export default function ModulePage({ params }: { params: { slug: string } }) {
  const mod = getModule(params.slug);
  if (!mod) notFound();
  const next = getNextModule(params.slug);
  return <ModuleClient module={mod} nextSlug={next?.slug} />;
}
