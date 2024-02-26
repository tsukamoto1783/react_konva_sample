import React, { useState } from "react";
import Konva from "konva";
import { Stage, Layer, Rect, Circle } from "react-konva";

export const InteractiveShape: React.FC = () => {
  const initialRadius = 20;
  const [circleRadius, setCircleRadius] = useState<number>(initialRadius);
  // const [isDragging, setIsDragging] = useState<boolean>(false);
  const squareSize = 200; // 四角のサイズ
  const maxRadius = squareSize / 2; // 四角の中に収まる最大半径

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    const scaleBy = 1.05;
    const direction = e.evt.deltaY > 0 ? -1 : 1;
    const newRadius = circleRadius * (direction > 0 ? scaleBy : 1 / scaleBy);
    if (newRadius <= maxRadius && newRadius >= initialRadius) {
      setCircleRadius(newRadius);
    }
  };

  // Circleをdrag可能にする場合はコメントを外す
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect
          x={window.innerWidth / 2 - squareSize / 2}
          y={window.innerHeight / 2 - squareSize / 2}
          width={squareSize}
          height={squareSize}
          fill="lightblue"
          stroke="black"
          strokeWidth={4}
        />
        <Circle
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          radius={circleRadius}
          fill="white"
          stroke="black"
          strokeWidth={4}
          // draggable
          onWheel={handleWheel}
          // onDragStart={() => setIsDragging(true)}
          // onDragEnd={() => setIsDragging(false)}
          // dragBoundFunc={(pos) => {
          //     const x = pos.x;
          //     const y = pos.y;
          //     // 円が四角形の内部に収まるように制限を加える
          //     const newX = Math.max(
          //         window.innerWidth / 2 - squareSize / 2 + circleRadius,
          //         Math.min(x, window.innerWidth / 2 + squareSize / 2 - circleRadius)
          //     );
          //     const newY = Math.max(
          //         window.innerHeight / 2 - squareSize / 2 + circleRadius,
          //         Math.min(y, window.innerHeight / 2 + squareSize / 2 - circleRadius)
          //     );
          //     return { x: newX, y: newY };
          // }}
        />
      </Layer>
    </Stage>
  );
};
