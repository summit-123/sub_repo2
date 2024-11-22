import { useState, useEffect } from "preact/hooks";
import { Deck } from "../types.ts";

export default function DeckUpdater({ initialDeck }: { initialDeck: Deck }) {
  const [deck, setDeck] = useState(initialDeck);

  useEffect(() => {
    const fetchUpdates = async () => {
      const response = await fetch(`/api/decks/${initialDeck.id}/updates`);
      const updates = await response.json();
      setDeck({ ...deck, ...updates });
    };
    fetchUpdates();
  }, []);

  return (
    <div>
      <h2>{deck.name}</h2>
      <p>Last updated: {deck.lastUpdated}</p>
      {/* Render deck content */}
    </div>
  );
}