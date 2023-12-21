import { GridLine } from "../types/grid_line";

// GridLineオブジェクトの配列を生成する関数
export function buildCirclePoints(
    xGridSpan: number[],
    yGridSpan: number[],
): GridLine[] {
    // 最初の始点のオフセットを追加
    const xSpan = [100, ...xGridSpan];
    const ySpan = [100, ...yGridSpan];

    // 交点のオブジェクトの配列を生成
    let xOffset = 0;
    let yOffset = 0;

    const points: GridLine[] = [];

    for (let i = 0; i < xSpan.length; i++) {
        xOffset += xSpan[i];
        yOffset = 0; // y軸のオフセットをリセット

        for (let j = 0; j < ySpan.length; j++) {
            yOffset += ySpan[j];
            points.push({
                key: `point-${i}-${j}`,
                x: xOffset,
                y: yOffset,
            });
        }
    }

    return points;
}
