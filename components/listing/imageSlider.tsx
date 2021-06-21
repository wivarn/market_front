import { ChevronLeftIcon, ChevronRightIcon } from "components/icons";

import Image from "next/image";

export interface Props {
  src: string;
  alt: string;
}

export function ImageSlider(props: Props): JSX.Element {
  return (
    <div>
      <div className="container relative flex flex-initial mx-auto md:w-600 md:h-600 w-96 h-96">
        <div className="">
          <Image
            src={props.src}
            alt={props.alt}
            layout="fill"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFfSURBVHgBDY7LTuJQAEBP22uhLVpoGYQZF5MMk0kmsxhiYowf4NKFf+UP+Bm60I0uTUzUhAXEiIrv+ObValsLFa49+5NzlLX1DWlbWYpGwmc0JH7vkiQjJsmQYBRz0DjnIxwgXMemOpth8f8vnvYOeIg9TGbodJqIXJ4jUiYT1L/fJBVjDKeH/CwLaiur1BbKnHyfx7R0qkXBj2kFoYoMilCQqS3nfvNy1sWayrH8Z4R/5zNjeqgFF7VUKmLbNvghRAEOA4xCAcfQ0NJ309DRSBB23kEGHa6PG1R0lcd2m0F/SL5sIuOQyO/h+31UMaUjsianJ8+0Nptsb9VxTZv2zi5h+MHN7RXem48aBO9IoSOzUCm65OUr0+4s1YUlrDQNCnEyRnR7A9RhH3F5zJ0o8JbEdJp1otY+svaPsaKkQg4lDkL5cNHi9f4CTdNJPiMyloPXe5GB59Go1ylV5vgCEoaUs5iMbFwAAAAASUVORK5CYII="
            objectFit="contain"
            className="rounded-md"
          />
          <div className="absolute bottom-0 right-0 flex text-primary">
            <div className=" hover:text-primary-dark">
              <ChevronLeftIcon />
            </div>
            <div className="hover:text-primary-dark">
              <ChevronRightIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
