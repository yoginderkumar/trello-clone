import { useState } from "react";
import { getColorForString } from "generate-colors";
import { Draggable, Droppable } from "react-beautiful-dnd";

import Card from "./Card";
import { Column as ColumnType, Card as CardType } from "./types";
import { PlusIcon } from "./Common";

interface ColumnProps {
  column: ColumnType;
  updateColumn: (updatedColumn: {
    id: string;
    title: string;
    cards: CardType[];
  }) => void;
}

const Column: React.FC<ColumnProps> = ({ column, updateColumn }) => {
  const [newCardText, setNewCardText] = useState("");
  const [newCardTitle, setNewCardTitle] = useState("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      const newCard: CardType = {
        id: `new-card-${Date.now()}`,
        title: newCardTitle.trim(),
        text: newCardText?.trim() || "",
        columnId: column.id,
      };

      const updatedColumn = {
        ...column,
        cards: [...column.cards, newCard],
      };

      setIsAdding(false);
      setNewCardText("");
      setNewCardTitle("");
      updateColumn(updatedColumn);
    }
  };
  return (
    <div className="flex flex-col gap-6 rounded w-[320px] mr-3 min-w-xs">
      <ColumnHeading id={column.id} title={column.title} />
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex w-full flex-col gap-3"
          >
            {column.cards?.length ? (
              column.cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card card={card} />
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <Draggable
                key="empty_id"
                draggableId={"empty_id"}
                index={column?.cards.length}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    className="h-10"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  ></div>
                )}
              </Draggable>
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="border-2 rounded flex items-center justify-center min-h-40 py-6 border-dashed">
        {isAdding ? (
          <div className="flex flex-col gap-2">
            <input
              value={newCardTitle}
              placeholder="Enter title..."
              onChange={(e) => setNewCardTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddCard();
                }
              }}
              className="border-[1px] rounded py-1 px-3"
            />
            <textarea
              value={newCardText}
              placeholder="Enter content..."
              onChange={(e) => setNewCardText(e.target.value)}
              className="border-[1px] rounded py-1 px-3"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddCard();
                }
              }}
            />
            <button
              className="bg-blue-500 rounded py-2 text-white"
              onClick={handleAddCard}
            >
              Add
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-3"
          >
            <PlusIcon size={20} />
            <p className="text-md">Add new card</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default Column;

function ColumnHeading({ id, title }: { id: string; title: string }) {
  const [r, g, b] = getColorForString(id);
  return (
    <div
      className="py-2 px-4 rounded font-semibold"
      style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.8)` }}
    >
      <h5 className="text-white">{title}</h5>
    </div>
  );
}
