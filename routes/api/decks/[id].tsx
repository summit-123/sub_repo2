import { Handlers, PageProps } from "$fresh/server.ts";
import DeckView from "../../islands/DeckView.tsx";
import { Deck } from "../../types.ts";

export const handler: Handlers<Deck | null> = {
  async GET(_, ctx) {
    const { id } = ctx.params;
    const resp = await fetch(`http://localhost:8000/api/decks/${id}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const deck: Deck = await resp.json();
    return ctx.render(deck);
  },
};

export default function DeckPage({ data }: PageProps<Deck | null>) {
  if (!data) {
    return <h1>Deck not found</h1>;
  }

  return <DeckView initialDeck={data} />;
}