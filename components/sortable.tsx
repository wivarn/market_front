import { Dispatch, SetStateAction } from "react";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Image, { ImageLoaderProps } from "next/image";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

type SortableImagesProps = {
  imageMetas: { url: string }[];
  setImageMetas: Dispatch<SetStateAction<{ url: string }[]>>;
  imageData: File[];
  setImageData: Dispatch<SetStateAction<File[]>>;
};

function SortableImage(props: { id: string; url: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition?.toString(),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Image
        src={props.url}
        layout="intrinsic"
        height="150"
        width="150"
        objectFit="contain"
        className="p-2 my-4 hover:opacity-50"
        loader={({ src }: ImageLoaderProps) => {
          return src;
        }}
      />
    </div>
  );
}

export function SortableImages({
  imageMetas,
  setImageMetas,
  imageData,
  setImageData,
}: SortableImagesProps): JSX.Element {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const ids = imageMetas.map((meta) => {
    return meta.url;
  });
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={ids} strategy={rectSortingStrategy}>
        <div className="flex flex-wrap p-2 bg-white border rounded-md">
          {imageMetas.map(({ url }) => (
            <SortableImage key={url} id={url} url={url} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = imageMetas.findIndex((meta) => meta.url == active.id);
      const newIndex = imageMetas.findIndex((meta) => meta.url == over?.id);
      setImageMetas(arrayMove(imageMetas, oldIndex, newIndex));
      setImageData(arrayMove(imageData, oldIndex, newIndex));
    }
  }
}
