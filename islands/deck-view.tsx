import { useSignal } from "@preact/signals";
import { Card, Deck } from "../types.ts";
import CardView from "../components/card-view.tsx";
import { calculateNextReview } from "../utils/srs.ts";

interface DeckViewProps {
  initialDeck: Deck;
}

export default function DeckView({ initialDeck }: DeckViewProps) {
  const deck = useSignal(initialDeck);
  const currentCardIndex = useSignal(0);

  const currentCard = () => deck.value.cards[currentCardIndex.value];

  const handleReview = (quality: number) => {
    const card = currentCard();
    const { interval, repetitions } = calculateNextReview(
      quality,
      card.repetitions,
      (card.nextReview?.getTime() ?? Date.now()) -
        (card.lastReview?.getTime() ?? Date.now()),
    );

    const updatedCard: Card = {
      ...card,
      lastReview: new Date(),
      nextReview: new Date(Date.now() + interval * 24 * 60 * 60 * 1000),
      repetitions,
    };

    deck.value = {
      ...deck.value,
      cards: deck.value.cards.map((c) =>
        c.id === updatedCard.id ? updatedCard : c
      ),
    };

    if (currentCardIndex.value < deck.value.cards.length - 1) {
      currentCardIndex.value++;
    } else {
      // End of deck
      alert("You've finished reviewing this deck!");
    }
  };

  return (
    <div>
      {currentCard() && (
        <CardView card={currentCard()} onReview={handleReview} />
      )}
    </div>
  );
}
