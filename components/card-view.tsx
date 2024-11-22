import { Card } from "../types.ts";
import { Button } from "./button.tsx";
import { useState } from "preact/hooks";
import Markdown from "./markdown.tsx";

interface CardViewProps {
  card: Card;
  onReview: (quality: number) => void;
}

export default function CardView({ card, onReview }: CardViewProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div class="mb-6">
        <Markdown content={card.front} />
      </div>
      
      {!showAnswer ? (
        <Button 
          onClick={() => setShowAnswer(true)}
          class="w-full"
        >
          Show Answer
        </Button>
      ) : (
        <div>
          <div class="mb-6 pt-4 border-t">
            <Markdown content={card.back} />
          </div>
          
          <div class="grid grid-cols-4 gap-2">
            <Button onClick={() => onReview(0)}>Again</Button>
            <Button onClick={() => onReview(1)}>Hard</Button>
            <Button onClick={() => onReview(2)}>Good</Button>
            <Button onClick={() => onReview(3)}>Easy</Button>
          </div>
        </div>
      )}
    </div>
  );
}