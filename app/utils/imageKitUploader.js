"use server";
import ImageKit from "imagekit";

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default async function uploadFile(fileName, fileData) {
  // Read the file data
  const result = await new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: fileData,
        fileName: fileName,
        extensions: [
          {
            name: "google-auto-tagging",
            maxTags: 5,
            minConfidence: 95,
          },
        ],
      },
      function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });

  return result;
}
