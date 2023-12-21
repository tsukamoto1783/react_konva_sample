import { GridLine } from "../types/grid_line";

// GridLineオブジェクトの配列を生成する関数
export function buildGrid(
    screenWidth: number,
    screenHeight: number,
    xGridSpan: number[] = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
    yGridSpan: number[] = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
): GridLine[] {
    const lines: GridLine[] = [];
    const xSpan = [0, ...xGridSpan];
    const ySpan = [0, ...yGridSpan];

    // 開始線の位置
    let xOffset = 50;
    let yOffset = 50;

    // y軸線を生成
    for (let i = 0; i < xSpan.length; i++) {
        lines.push({
            key: `grid-line-vertical-${i}`,
            points: [50, 50, 50, screenHeight - 50],
            x: xOffset + xSpan[i],
            y: 0,
        });
        xOffset += xSpan[i];
    }


    // x軸線を生成
    for (let i = 0; i < ySpan.length; i++) {
        lines.push({
            key: `grid-line-horizontal-${i}`,
            points: [50, 50, screenWidth - 50, 50],
            x: 0,
            y: yOffset + ySpan[i],
        });
        yOffset += ySpan[i];
    }

    return lines;
}
