/// <reference lib="deno.unstable" />
import { Deck } from "../types.ts";
// import { Card, Deck } from "../types.ts";

export class CardStore {
  private kv: Deno.Kv;

  constructor(kv: Deno.Kv) {
    this.kv = kv;
  }

  async getDeck(id: string): Promise<Deck | null> {
    const result = await this.kv.get(["decks", id]);
    return result.value as Deck;
  }

  async saveDeck(deck: Deck): Promise<void> {
    await this.kv.set(["decks", deck.id], deck);
  }

  async getAllDecks(): Promise<Deck[]> {
    const decks: Deck[] = [];
    const entries = this.kv.list({ prefix: ["decks"] });
    for await (const entry of entries) {
      decks.push(entry.value as Deck);
    }
    return decks;
  }

  async deleteDeck(id: string): Promise<void> {
    await this.kv.delete(["decks", id]);
  }
}
