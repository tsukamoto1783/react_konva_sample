import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Line, Text, Rect, Group } from 'react-konva';
import { buildGrid, GridLine } from '../grid';
import { GridSpanForm } from '../gridInputForm';

export const App: React.FC = () => {
    const [state, setState] = useState<{
        x: number;
        y: number;
        width: number;
        height: number;
        grid: GridLine[];
    }>({
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        grid: buildGrid(window.innerWidth, window.innerHeight, [], []),
    });

    useEffect(() => {
        window.addEventListener('resize', updateDimensions);
        updateDimensions();

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    const updateDimensions = () => {
        console.log("updateDimensions");
        setState(prevState => ({
            ...prevState,
            width: window.innerWidth,
            height: window.innerHeight,
            grid: buildGrid(window.innerWidth, window.innerHeight, [], []),
        }));
    };

    const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
        let node = e.target as Konva.Container;
        let shape: Konva.Shape | null = null;
        // console.log(node.getType());
        if (node.getType() === "Group") {
            shape = node.findOne((node: Konva.Node) => {
                return node.getType() === "Shape";
            }) as Konva.Shape;
            // console.log(shape);
        }
        if (shape) {
            shape.setAttrs({
                shadowEnabled: true,
                shadowOffset: {
                    x: 1,
                    y: 1
                }
            });
        }
        setState({
            x: 0,
            y: 0,
            width: state.width,
            height: state.height,
            grid: state.grid,
        });
    };

    const handleDragMove = (e: Konva.KonvaEventObject<DragEvent | TouchEvent>) => {
        let node = e.target as Konva.Container;
        let shape: Konva.Shape | null = null;
        if (node.getType() === "Group") {
            shape = node.findOne((node: Konva.Node) => {
                return node.getType() === "Shape";
            }) as Konva.Shape;
        }
        const {
            attrs: { x: posX, y: posY }
        } = e.target as Konva.Shape;
        const x = 25 - (posX % 50);
        const y = 25 - (posY % 50);
        if (shape) {
            shape.shadowOffset({
                x: x,
                y: y
            });
        }
    };

    const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent | TouchEvent>) => {
        let node = e.target as Konva.Container;
        let shape: Konva.Shape | null = null;
        if (node.getType() === "Group") {
            shape = node.findOne((node: Konva.Node) => {
                return node.getType() === "Shape";
            }) as Konva.Shape;
        }
        const {
            attrs: { x: posX, y: posY }
        } = e.target as Konva.Shape;
        if (shape) {
            shape.shadowEnabled(false);
        }
        const x = posX + 25 - (posX % 50);
        const y = posY + 25 - (posY % 50);
        e.target.to({
            duration: 0.5,
            easing: Konva.Easings.EaseInOut,
            x: x,
            y: y
        });
        setState({
            x: x,
            y: y,
            width: state.width,
            height: state.height,
            grid: state.grid,
        });
    };

    const { width, height, grid } = state;

    return (
        <Stage
            width={width}
            height={height}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
        // onTouchStart={this.handleDragStart}
        // onTouchMove={this.handleDragMove}
        // onTouchEnd={this.handleDragEnd}
        >
            <Layer>
                {/* <Line points={[73, 70, 340, 23, 450, 60, 500, 20]} stroke="grey" strokeWidth={1} x={0} y={50} /> */}
                {grid.map(({ key, points, x, y }) => (
                    <Line key={key} points={points} stroke="grey" strokeWidth={1} x={x} y={y} />
                ))}
            </Layer>
            {/* <Layer>
        <Text text={`X: ${state.x} Y: ${state.y}`} />
        <Group
          x={225}
          y={225}
          width={120}
          height={60}
          fill="red"
          draggable
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        // onTouchStart={this.handleDragStart}
        // onTouchMove={this.handleDragMove}
        // onTouchEnd={this.handleDragEnd}
        >
          <Rect
            name="rect"
            // x={0}
            // y={0}
            fill="red"
            width={50}
            height={50}
            shadowColor="black"
            shadowBlur={5}
            shadowOpacity={0.3}
            cornerRadius={50}
          />
          <Text
            // x={0}
            // y={0}
            fontSize={16}
            fontFamily="Calibri"
            fill="#555"
            width={50}
            padding={8}
            align="center"
            text="object"
          />
        </Group>
      </Layer> */}
        </Stage>
    );
};