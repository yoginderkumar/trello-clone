export interface Card {
  id: string;
  title: string;
  text?: string;
  columnId: string;
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
}
