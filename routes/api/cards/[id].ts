import { Handlers } from "$fresh/server.ts";
import { CardStore } from "../../../db/cards.ts";

export const handler: Handlers = {
  async PUT(req, ctx) {
    const id = ctx.params.id;
    const card = await req.json();
    const kv = await Deno.openKv();
    const store = new CardStore(kv);

    // recheck02
    const deck = await store.getDeck(card.deckId);
    if (deck) {
      deck.cards = deck.cards.map((c) => c.id === id ? { ...c, ...card } : c);
      await store.saveDeck(deck);
    }

    // await store.updateCard(id, card);  // recheck01

    return new Response("OK");
  },
};

// routes/api/cards/[id].ts
