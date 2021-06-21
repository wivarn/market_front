import Image from "next/image";
import Link from "next/link";
import { Listing } from "types/listings";
import ListingBasicInfo from "./basicInfo";

const ListingPreview = (props: Listing): JSX.Element => {
  return (
    <div className="mt-4">
      <div>
        <Link href={`/listings/${props.id}`}>
          <a>
            <div className="flex flex-wrap bg-white rounded-md shadow-md w-80 hover:shadow-xl">
              <div className="container relative w-80 h-80">
                {props.photos.length ? (
                  <Image
                    src={props.photos[0]}
                    alt={props.title}
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFfSURBVHgBDY7LTuJQAEBP22uhLVpoGYQZF5MMk0kmsxhiYowf4NKFf+UP+Bm60I0uTUzUhAXEiIrv+ObValsLFa49+5NzlLX1DWlbWYpGwmc0JH7vkiQjJsmQYBRz0DjnIxwgXMemOpth8f8vnvYOeIg9TGbodJqIXJ4jUiYT1L/fJBVjDKeH/CwLaiur1BbKnHyfx7R0qkXBj2kFoYoMilCQqS3nfvNy1sWayrH8Z4R/5zNjeqgFF7VUKmLbNvghRAEOA4xCAcfQ0NJ309DRSBB23kEGHa6PG1R0lcd2m0F/SL5sIuOQyO/h+31UMaUjsianJ8+0Nptsb9VxTZv2zi5h+MHN7RXem48aBO9IoSOzUCm65OUr0+4s1YUlrDQNCnEyRnR7A9RhH3F5zJ0o8JbEdJp1otY+svaPsaKkQg4lDkL5cNHi9f4CTdNJPiMyloPXe5GB59Go1ylV5vgCEoaUs5iMbFwAAAAASUVORK5CYII="
                    className="rounded-t-md"
                  />
                ) : null}
              </div>
              <div className="w-full px-2 py-1">
                <ListingBasicInfo
                  title={props.title}
                  price={props.price}
                  currency={props.currency}
                  domestic_shipping={props.domestic_shipping}
                  international_shipping={props.international_shipping}
                  grading_company={props.grading_company}
                  condition={props.condition}
                />
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ListingPreview;
