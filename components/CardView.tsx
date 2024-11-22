import { useState, useEffect } from "preact/hooks";
import { Deck, Flashcard } from "../types.ts";
import CardView from "../components/CardView.tsx";
import { Button } from "../components/Button.tsx";

interface DeckViewProps {
  initialDeck: Deck;
}

export default function DeckView({ initialDeck }: DeckViewProps) {
  const [deck, setDeck] = useState<Deck>(initialDeck);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    // Fetch the latest deck data from the API
    fetch(`/api/decks/${initialDeck.id}`)
      .then(response => response.json())
      .then(data => setDeck(data));
  }, [initialDeck.id]);

  const currentCard = deck.flashcards[currentCardIndex];

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleReview = async (quality: number) => {
    await fetch(`/api/flashcards/${currentCard.id}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quality }),
    });

    setShowAnswer(false);
    if (currentCardIndex < deck.flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // End of deck
      alert("You've finished reviewing this deck!");
    }
  };

  if (!currentCard) {
    return <div>No cards in this deck.</div>;
  }

  return (
    <div class="max-w-2xl mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">{deck.name}</h1>
      <div class="mb-4">
        Card {currentCardIndex + 1} of {deck.flashcards.length}
      </div>
      <CardView
        card={currentCard}
        showAnswer={showAnswer}
        onShowAnswer={handleShowAnswer}
        onReview={handleReview}
      />
    </div>
  );
}