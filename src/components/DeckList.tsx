import React, { useState, useEffect } from 'react';
import { Deck } from '../types';

interface DeckListProps {
  initialDecks: Deck[];
}

export const DeckList: React.FC<DeckListProps> = ({ initialDecks }) => {
  const [decks, setDecks] = useState(initialDecks);

  useEffect(() => {
    // Fetch updated deck list if needed
    const fetchDecks = async () => {
      const response = await fetch('/api/decks');
      const updatedDecks = await response.json();
      setDecks(updatedDecks);
    };
    fetchDecks();
  }, []);

  return (
    <ul>
      {decks.map(deck => (
        <li key={deck.id}>
          <a href={`/decks/${deck.id}`}>{deck.name}</a>
        </li>
      ))}
    </ul>
  );
};