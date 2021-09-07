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
import Image, { ImageLoaderProps, ImageProps } from "next/image";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { RemoveButton } from "./buttons";
import { XIconSm } from "./icons";

type SortableImagesProps = {
  imageMetas: { url: string }[];
  setImageMetas: Dispatch<SetStateAction<{ url: string }[]>>;
  imageData: (File | string)[];
  setImageData: Dispatch<SetStateAction<(File | string)[]>>;
};

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

  async function removeImage(id: string) {
    const index = imageMetas.findIndex((meta) => meta.url == id);
    setImageMetas((imageMetas) => imageMetas.filter((_, i) => i != index));
    setImageData((imageData) => imageData.filter((_, i) => i != index));
    URL.revokeObjectURL(id);
  }

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
      <div className="p-2">
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className="relative p-2 border-2 rounded-md hover:border-primary bg-accent-lightest"
        >
          {renderImage(props.url)}
          <span className="absolute top-0 right-1">
            <RemoveButton
              text={<XIconSm />}
              onClick={() => removeImage(props.url)}
            />
          </span>
        </div>
      </div>
    );
  }
  function renderImage(url: string) {
    const attributes: ImageProps = {
      src: url,
      layout: "intrinsic",
      height: "200",
      width: "200",
      objectFit: "contain",
    };

    if (url.startsWith("blob:")) {
      return (
        <Image
          {...attributes}
          unoptimized={true}
          loader={({ src }: ImageLoaderProps) => {
            return src;
          }}
        />
      );
    }
    return (
      <Image
        {...attributes}
        placeholder="blur"
        blurDataURL="/assets/image-loader.svg"
      />
    );
  }
}
