import { GridPoint } from "../types/shape_indices";

export function buildBackgroundPoints(
    xGridSpan: number[],
    yGridSpan: number[],
): number[] {
    // 最初の始点のオフセットを追加
    const xSpan = [100, ...xGridSpan];
    const ySpan = [100, ...yGridSpan];

    // 交点のオブジェクトの配列を生成
    let xOffset = 0;
    let yOffset = 0;

    const points: GridPoint[] = [];

    for (let i = 0; i < xSpan.length; i++) {
        xOffset += xSpan[i];
        yOffset = 0; // y軸のオフセットをリセット


        for (let j = 0; j < ySpan.length; j++) {
            yOffset += ySpan[j];
            points.push({ x: i, y: j, xPoint: xOffset, yPoint: yOffset });
        }
    }

    const outerPointes = createOutlineFromCorners(points);
    return outerPointes;
}

function createOutlineFromCorners(gridPoint: GridPoint[]): number[] {
    // 全てのxPointとyPointの値を取得
    const xPoints = gridPoint.map(p => p.xPoint);
    const yPoints = gridPoint.map(p => p.yPoint);

    // 最小値と最大値を求める
    const minXPoint = Math.min(...xPoints);
    const maxXPoint = Math.max(...xPoints);
    const minYPoint = Math.min(...yPoints);
    const maxYPoint = Math.max(...yPoints);

    // 四隅の点を順に繋げる
    const outlinePoints = [
        minXPoint, minYPoint, // 左上
        minXPoint, maxYPoint, // 左下
        maxXPoint, maxYPoint, // 右下
        maxXPoint, minYPoint, // 右上
        minXPoint, minYPoint  // 閉じるために左上に戻る
    ];

    return outlinePoints;
}