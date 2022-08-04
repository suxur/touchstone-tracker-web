import * as React from "react";
import { AppLayout } from "@/Layouts/AppLayout";
import { Sidebar } from "@/Layouts/Sidebar";
import { EncounterView } from "@/Components/Encounter/EncounterView";
import { CodexProvider } from "@/Components/Codex/CodexContext";

export default function EncounterPage() {
  return (
    <AppLayout>
      <CodexProvider>
        <div className="h-full w-full flex flex-row">
          <Sidebar />
          <main className="w-full flex flex-row py-4 px-2">
            <EncounterView />
          </main>
        </div>
      </CodexProvider>
    </AppLayout>
  );
}
