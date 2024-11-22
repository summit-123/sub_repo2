import { Handlers } from "$fresh/server.ts";
import { CardStore } from "../../../db/cards.ts";

export const handler: Handlers = {
  async GET(_, ctx) {
    const id = ctx.params.id;
    const kv = await Deno.openKv();
    const store = new CardStore(kv);
    const deck = await store.getDeck(id);

    if (!deck) {
      return new Response("Deck not found", { status: 404 });
    }

    return Response.json(deck);
  },

  async PUT(req, ctx) {
    const id = ctx.params.id;
    const updatedDeck = await req.json();
    const kv = await Deno.openKv();
    const store = new CardStore(kv);

    await store.saveDeck({ ...updatedDeck, id });

    return new Response("OK");
  },

  async DELETE(_, ctx) {
    const id = ctx.params.id;
    const kv = await Deno.openKv();
    const store = new CardStore(kv);

    await store.deleteDeck(id);

    return new Response("OK");
  },
};
