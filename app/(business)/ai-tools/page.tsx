import { FreeToolsCatalog } from "@/components/free-tools/free-tools-catalog";

export default function AIToolsPage() {
  return (
    <main className="min-h-full bg-surface px-6 py-5 lg:px-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <FreeToolsCatalog />
      </div>
    </main>
  );
}
