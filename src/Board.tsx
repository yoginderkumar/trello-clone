import { useCallback, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import Column from "./Column";
import { PlusIcon } from "./Common";
import { Card as CardType, Column as ColumnType } from "./types";

const initialColumns = [
  {
    id: "to_do",
    title: "To Do",
    cards: [
      {
        id: "card-1",
        title: "Create a new project",
        text: "Create a new project",
        columnId: "to_do",
      },
      {
        id: "card-2",
        title: "Refactor existing code",
        text: "Refactor existing code",
        columnId: "to_do",
      },
    ],
  },
  {
    id: "in_progress",
    title: "In Progress",
    cards: [
      {
        id: "card-3",
        title: "Implement new feature",
        text: "Implement new feature",
        columnId: "in_progress",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [],
  },
];

const Board: React.FC = () => {
  const [newColumn, setNewColumn] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [data, setData] = useState<ColumnType[]>(initialColumns);

  const updateColumn = (updatedColumn: {
    id: string;
    title: string;
    cards: CardType[];
  }) => {
    const updatedData = data.map((column) =>
      column.id === updatedColumn.id ? updatedColumn : column
    );
    setData(updatedData);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = data.find(
        (column) => column.id === source.droppableId
      );
      const destColumn = data.find(
        (column) => column.id === destination.droppableId
      );
      const sourceItems = [...sourceColumn!.cards];
      const destItems = [...destColumn!.cards];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      const updatedData = data.map((column) => {
        if (column.id === source.droppableId) {
          return { ...column, cards: sourceItems };
        } else if (column.id === destination.droppableId) {
          return { ...column, cards: destItems };
        } else {
          return column;
        }
      });

      setData(updatedData);
    } else {
      const column = data.find((column) => column.id === source.droppableId);
      const copiedItems = [...column!.cards];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      const updatedData = data.map((column) => {
        if (column.id === source.droppableId) {
          return { ...column, cards: copiedItems };
        } else {
          return column;
        }
      });

      setData(updatedData);
    }
  };

  const handleAddNewColumn = useCallback((title: string) => {
    setNewColumn("");
    setIsAdding(false);
    setData((prev) => [
      ...prev,
      { id: `card_${title}`, title: title, cards: [] },
    ]);
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col gap-4 m-8">
        {isAdding ? (
          <div className="flex gap-2 h-10">
            <input
              value={newColumn}
              onChange={(e) => setNewColumn(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newColumn.length > 3) {
                  handleAddNewColumn(newColumn);
                }
              }}
              placeholder="Enter heading..."
              className="border-[1px] w-max rounded px-3"
            />
            <button
              onClick={() => handleAddNewColumn(newColumn)}
              className="w-fit bg-blue-500 px-4 text-white font-medium rounded"
            >
              Add
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center justify-center gap-2 font-medium border-[1px] h-fit w-fit rounded py-2 px-4"
          >
            <PlusIcon size={20} /> Add Column
          </button>
        )}
        <div className="overflow-x-auto whitespace-nowrap pb-3">
          <div className="inline-flex flex-row gap-2 rounded">
            {data.map((column) => (
              <Column
                key={column.id}
                column={column}
                updateColumn={updateColumn}
              />
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
