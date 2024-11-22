import { Handlers, PageProps } from "$fresh/server.ts";
import { Deck } from "../../types.ts";
import { ContextualData } from "../../plugins/contextual-data.ts";
import DeckUpdater from "../../islands/DeckUpdater.tsx";

interface Data {
  deck: Deck;
  contextualData: ContextualData;
  isPrerendered: boolean;
}

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const { id } = ctx.params;
    const isPrerendered = id === "featured"; // Example condition

    if (isPrerendered) {
      // Use prerendered data
      const { deck, contextualData } = await Deno.readTextFile(`./prerendered/decks/${id}.json`)
        .then(JSON.parse);
      return ctx.render({ deck, contextualData, isPrerendered });
    } else {
      // Fetch at runtime
      const response = await fetch(`${DJANGO_API_URL}/api/decks/${id}`);
      const { _context, ...deck } = await response.json();
      return ctx.render({ deck, contextualData: _context, isPrerendered: false });
    }
  },
};

export default function DeckPage({ data }: PageProps<Data>) {
  const { deck, contextualData, isPrerendered } = data;
  return (
    <div>
      {contextualData.user && <p>Welcome, {contextualData.user.username}!</p>}
      {isPrerendered ? (
        <div>
          <h1>{deck.name}</h1>
          {/* Render prerendered content */}
          <DeckUpdater initialDeck={deck} />
        </div>
      ) : (
        <DeckUpdater initialDeck={deck} />
      )}
    </div>
  );
}