import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Character {
  id: string;
  name: string;
  thumb: string;
}

const finalSpaceCharacters: Character[] = [
  {
    id: "gary",
    name: "Gary Goodspeed",
    thumb: "../../src/assets/image-1.webp",
  },
  {
    id: "cato",
    name: "Little Cato",
    thumb: "../../src/assets/image-2.webp",
  },
  {
    id: "kvn",
    name: "KVN",
    thumb: "../../src/assets/image-3.webp",
  },
  {
    id: "mooncake",
    name: "Mooncake",
    thumb: "../../src/assets/image-4.webp",
  },
  {
    id: "quinn",
    name: "Quinn Ergon",
    thumb: "../../src/assets/image-5.webp",
  },
];

const Dnd: React.FC = () => {
  const [characters, updateCharacters] = useState<Character[]>(finalSpaceCharacters);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided: any) => (
            <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
              {characters.map(({ id, name, thumb }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided: any) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="characters-thumb">
                          <img width="150px" src={thumb} alt={`${name} Thumb`} />
                        </div>
                        <p>{name}</p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Dnd;
