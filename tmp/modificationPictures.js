import Jimp from "jimp";

export const modificationPicture = async (path, savePath) => {
  return Jimp.read(path)
    .then((image) => {
      image.resize(250, 250).write(savePath);
      console.log("zapisano w public");
    })
    .catch((err) => {
      console.log(err);
    });
};
