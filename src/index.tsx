import React from 'react';
import ReactDOM from 'react-dom';
import { DeckList } from './components/DeckList';
import { Deck } from './types';

declare global {
  interface Window {
    INITIAL_DATA: {
      decks: string;
      user: { id: number; username: string } | null;
    };
  }
}

const initialDecks: Deck[] = JSON.parse(window.INITIAL_DATA.decks);

ReactDOM.hydrate(
  <DeckList initialDecks={initialDecks} />,
  document.getElementById('deck-list-root')
);