import { Box } from "@mui/material";
import { Layer, Stage, Image } from "react-konva";
import useImage from "use-image";
import svgImage from "../assets/demo.svg";
// import svgImage2 from "../assets/demo2.svg";
// import svgImage3 from "../assets/demo3.svg";
// import svgImage4 from "../assets/demo4.svg";
import { FC, ReactElement, useEffect, useState } from "react";
import { createSvgString } from "../feature/create_svg_image";
import { createSvgUrl } from "../feature/create_svg_url";

// 画像を読み込んでから描画する例
// export const SvgImage: FC = (): ReactElement | null => {
//   const [image, setImage] = useState<HTMLImageElement | null>(null);

//   console.log("page");

//   useEffect(() => {
//     const img = new window.Image();

//     console.log("Image load start");
//     img.src = svgImage;

//     img.onload = () => {
//       setImage(img);
//       console.log("Image loaded");
//     };

//     console.log("useEffect end");
//   }, []);

//   console.log("image: ", image);

//   return image ? <Image image={image} draggable x={40} y={40} /> : null;
// };

// =================================

// 読み込みが重い場合は描画されない例（アンチパターン）
// export const SvgImage: FC = (): ReactElement => {
//   const img = new window.Image();

//   console.log("Image load start");
//   img.src = svgImage;

//   img.onload = () => {
//     console.log("Image loaded");
//   };

//   console.log("img.src: ", img.src);
//   console.log("img: ", img);

//   return <Image image={img} draggable x={40} y={40} />;
// };

// =================================

// useImageを使用して描画する例
// export const SvgImage: FC = (): ReactElement | null => {
//   const [image] = useImage(svgImage);
//   console.log("hoge");
//   return <Image image={image} draggable x={40} y={40}></Image>;
// };

// =================================

// svgの中身を動的に変更して読み込む例
export const SvgImage: FC = (): ReactElement | null => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  // 以下はpropsに渡すようにすれば、動的にsvg画像を加工してから描画できる。今回は例なので固定値。
  const svgSetting = {
    boxSize: 240,
    boxFillColor: "#9EB2B2",
    leftBoxSize: 70,
    leftBoxFillColor: "blue",
    rightBoxSize: 70,
    rightBoxFillColor: "red",
  };

  useEffect(() => {
    const svgString = createSvgString(svgSetting);
    const imageSrc = createSvgUrl(svgString);

    const img = new window.Image();
    img.src = imageSrc;

    img.onload = () => {
      setImage(img);
    };
  }, []);

  return image ? <Image image={image} draggable x={40} y={40} /> : null;
};

// =================================
