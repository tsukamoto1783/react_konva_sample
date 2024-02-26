import { Box } from "@mui/material";
import { Layer, Stage } from "react-konva";
import { SvgImage } from "../components/SvgImage";
import { FC, ReactElement } from "react";

export const SvgKonvaPage: FC = (): ReactElement => {
  const padding = 50;
  const stageWidth = window.innerWidth - padding * 2;
  const stageHeight = window.innerHeight - padding * 2;

  return (
    <Box sx={outerBoxStyles}>
      <Box sx={innerBoxStyles(stageWidth, stageHeight)}>
        <Stage width={stageWidth} height={stageHeight}>
          <Layer>
            <SvgImage />
          </Layer>
        </Stage>
      </Box>
    </Box>
  );
};

const outerBoxStyles = {
  bgcolor: "grey",
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const innerBoxStyles = (width: number, height: number) => ({
  width: width,
  height: height,
  bgcolor: "white",
});
