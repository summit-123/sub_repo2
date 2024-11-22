export interface Card {
  id: string;
  front: string;
  back: string;
  tags: string[];
  lastReview?: Date;
  nextReview?: Date;
  repetitions: number;
}

export interface Deck {
  id: string;
  name: string;
  cards: Card[];
}
