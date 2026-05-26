import { NextResponse } from "next/server";

import { minioClient } from "@/lib/minio";

type HeroImage = {
  url: string;
};

export async function GET() {
  try {
    const bucketName = "cgr";

    const images: string[] = [];

    const stream = minioClient.listObjectsV2(
      bucketName,
      "hero/",
      true
    );

    await new Promise<void>((resolve, reject) => {
      stream.on("data", (object) => {
        if (!object.name) {
          return;
        }

        if (object.name.endsWith("/")) {
          return;
        }

        const isImage =
          object.name.endsWith(".jpg") ||
          object.name.endsWith(".jpeg") ||
          object.name.endsWith(".png") ||
          object.name.endsWith(".webp");

        if (!isImage) {
          return;
        }

        images.push(object.name);
      });

      stream.on("end", () => {
        resolve();
      });

      stream.on("error", (error) => {
        reject(error);
      });
    });

    if (images.length === 0) {
      return NextResponse.json(
        {
          message: "No hero images found",
        },
        {
          status: 404,
        }
      );
    }

    /**
     * Random image
     */
    const randomImage =
      images[Math.floor(Math.random() * images.length)];

    const response: HeroImage = {
      url:
        `${process.env.MINIO_PUBLIC_URL}` +
        `/${bucketName}/${randomImage}`,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[Hero API]", error);

    return NextResponse.json(
      {
        message: "Failed to load hero image",
      },
      {
        status: 500,
      }
    );
  }
}