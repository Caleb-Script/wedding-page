import { NextResponse } from "next/server";

import { minioClient } from "@/lib/minio";

type GalleryImage = {
  id: string;
  url: string;
};

export async function GET() {
  try {
    const bucketName = "cgr";

    /**
     * Only images inside:
     *
     * wedding-assets/gallery/
     */
    const folderPrefix = "gallery/";

    const images: GalleryImage[] = [];

    /**
     * Recursive listing
     */
    const stream = minioClient.listObjectsV2(bucketName, folderPrefix, true);

    let index = 0;

    await new Promise<void>((resolve, reject) => {
      stream.on("data", (object) => {
        if (!object.name) {
          return;
        }

        /**
         * Ignore folders
         */
        if (object.name.endsWith("/")) {
          return;
        }

        /**
         * Optional:
         * Only allow image files
         */
        const isImage =
          object.name.endsWith(".jpg") ||
          object.name.endsWith(".jpeg") ||
          object.name.endsWith(".png") ||
          object.name.endsWith(".webp");

        if (!isImage) {
          return;
        }

        index++;

        images.push({
          id: String(index),

          url:
            `${process.env.MINIO_PUBLIC_URL}` + `/${bucketName}/${object.name}`,
        });
      });

      stream.on("end", () => {
        /**
         * Sort alphabetically
         *
         * gallery-1.jpg
         * gallery-2.jpg
         * etc.
         */
        images.sort((a, b) => {
          return a.url.localeCompare(b.url);
        });

        resolve();
      });

      stream.on("error", (error) => {
        reject(error);
      });
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error("[Gallery API]", error);

    return NextResponse.json(
      {
        message: "Failed to load gallery images",
      },
      {
        status: 500,
      },
    );
  }
}
