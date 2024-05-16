import React from "react";
import { getColorForString } from "generate-colors";

import { Card as CardType } from "./types";

const Card: React.FC<{ card: CardType }> = ({ card }) => {
  const [r, g, b] = getColorForString(card.id);
  return (
    <div
      style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.18)` }}
      className="rounded py-3 flex flex-col gap-px px-4 text-gray-900"
    >
      <h4 className="text-md font-medium">{card.title}</h4>
      {card.text?.length ? (
        <p className="text-sm text-gray-500">{card.text}</p>
      ) : null}
    </div>
  );
};

export default Card;
