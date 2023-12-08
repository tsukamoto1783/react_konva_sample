export type GridLine = {
    key: string;
    points: number[];
    x: number;
    y: number;
};

// GridLineオブジェクトの配列を生成する関数
export function buildGrid(screenWidth: number, screenHeight: number): GridLine[] {
    const lines: GridLine[] = [];
    const gridSize = 50;
    const verticalLines = Math.ceil(screenWidth / gridSize);
    const horizontalLines = Math.ceil(screenHeight / gridSize);
    console.log("verticalLines: " + verticalLines);
    console.log("horizontalLines: " + horizontalLines);


    for (let i = 0; i <= verticalLines; i++) {
        lines.push({
            key: `grid-line-vertical-${i}`,
            points: [0, 0, 0, screenHeight],
            x: gridSize * i,
            y: 0,
        });
    }

    for (let i = 0; i <= horizontalLines; i++) {
        lines.push({
            key: `grid-line-horizontal-${i}`,
            points: [0, 0, screenWidth, 0],
            x: 0,
            y: gridSize * i,
        });
    }

    return lines;
}
