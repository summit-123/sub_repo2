import { useState, useEffect } from "preact/hooks";
import { Deck } from "../types.ts";

export default function DeckList() {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    fetch('/api/decks')
      .then(response => response.json())
      .then(data => setDecks(data));
  }, []);

  return (
    <ul>
      {decks.map(deck => (
        <li key={deck.id}>{deck.name}</li>
      ))}
    </ul>
  );
}