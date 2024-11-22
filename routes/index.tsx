/// <reference lib="deno.ns" />

// YOU CAN ALSO USE DENO DIRECTIVES deno-lint-ignore
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
// import { CardStore } from "../db/cards.ts";
// import Layout from "../components/layout.tsx";
// import DeckList from "../islands/deck-list.tsx";
// import { openKv } from "kv";

interface InitialData {
  decks: string;
  user: { id: number; username: string } | null;
}

export const handler: Handlers<InitialData> = {
  GET(req, ctx) {
    // In a real scenario, this data would come from the Django template
    const initialData: InitialData = {
      decks: '[]',
      user: null,
    };
    return ctx.render(initialData);
  },
};

export default function Home({ data }: PageProps<InitialData>) {
  return (
    <>
      <Head>
        <script id="initial-data" type="application/json">
          {JSON.stringify(data)}
        </script>
      </Head>
      <div>
        {/* Your app content */}
      </div>
    </>
  );
}