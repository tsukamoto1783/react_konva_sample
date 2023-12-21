import React, { useState } from 'react';
import { buildGrid } from '../feature/build_grid';
import { Stage, Layer, Line, Circle, Rect, RegularPolygon } from 'react-konva';
import { GridLine } from '../types/grid_line';
import { buildCirclePoints } from '../feature/build_circle_points';
import { buildSquarePoints } from '../feature/build_square_points';

export const GridSpanForm = () => {
    const [xGridSpan, setXGridSpan] = useState<string>('50,50,50,50');
    const [yGridSpan, setYGridSpan] = useState<string>('50,50,50,50');

    const [createdGrid, setCreateGrid] = useState<GridLine[]>([]);

    const [createdCirclePoints, setCreateCirclePoints] = useState<GridLine[]>([]);

    const [createdSquarePoints, setCreateSquarePoints] = useState<GridLine[]>([]);

    const squareSide = 20;

    const createGrid = () => {

        // 文字列を数値の配列に変換
        const xSpanArray = xGridSpan.split(',').map(Number);
        const ySpanArray = yGridSpan.split(',').map(Number);

        // grid作成
        const grid = buildGrid(
            window.innerWidth,
            window.innerHeight,
            xSpanArray,
            ySpanArray,
        );

        setCreateGrid(grid);
    };
    const createCirclePoints = () => {
        // 文字列を数値の配列に変換
        const xSpanArray = xGridSpan.split(',').map(Number);
        const ySpanArray = yGridSpan.split(',').map(Number);

        // 交点オブジェクトを作成
        const points = buildCirclePoints(
            xSpanArray,
            ySpanArray,
        );

        setCreateCirclePoints(points);
    };

    const createSquarePoints = () => {
        // 文字列を数値の配列に変換
        const xSpanArray = xGridSpan.split(',').map(Number);
        const ySpanArray = yGridSpan.split(',').map(Number);

        // 交点オブジェクトを作成
        const points = buildSquarePoints(
            squareSide,
            xSpanArray,
            ySpanArray,
        );

        setCreateSquarePoints(points);
    };

    const handleObjectTap = (i: number) => {
        console.log(i);
        // createdSquarePointsのi番目のGridLineのisTriangleを反転させる。
        const newCreatedSquarePoints = createdSquarePoints.map((point, index) => {
            if (index === i) {
                return { ...point, isTriangle: !point.isTriangle };
            } else {
                return point;
            }
        });
        setCreateSquarePoints(newCreatedSquarePoints);
    }


    return (
        console.log("ビルド"),
        <div>
            <form>
                <label>
                    X Grid Span (comma separated):
                    <input type="text" value={xGridSpan} onChange={e => setXGridSpan(e.target.value)} />
                </label>
                <br />
                <label>
                    Y Grid Span (comma separated):
                    <input type="text" value={yGridSpan} onChange={e => setYGridSpan(e.target.value)} />
                </label>
                <br />
                <br />
                <button type="button" onClick={createGrid}>Layer Index1: Build Grid</button>
                <br />
                <br />
                <button type="button" onClick={createCirclePoints}>Layer Index2: Build Circle Points</button>
                <br />
                <br />
                <button type="button" onClick={createSquarePoints}>Layer Index3: Build Square Points</button>
            </form>
            {/* createGridが空の場合は、グリッドを表示しない */}
            {createdGrid.length > 0 && (
                <Stage
                    // width={window.innerWidth} height={window.innerHeight}
                    width={800} height={600} // canvas表示サイズを指定
                >
                    <Layer>
                        {createdGrid.map(({ key, points, x, y }) => (
                            <Line key={key} points={points} stroke="grey" strokeWidth={1} x={x} y={y} />
                        ))}
                    </Layer>
                    {createdCirclePoints.length > 0 && (
                        <Layer>
                            {createdCirclePoints.map((point, i) => (
                                <Circle
                                    key={`circle-${i}`}
                                    x={point.x}
                                    y={point.y}
                                    radius={15} // 半径を適宜調整
                                    fill="red"
                                />
                            ))}
                        </Layer>
                    )}

                    {createdSquarePoints.length > 0 && (
                        <Layer>
                            {createdSquarePoints.map((point, i) => (
                                point.isTriangle ?
                                    <RegularPolygon
                                        key={point.key}
                                        x={point.x + squareSide / 2}
                                        y={point.y + squareSide / 2}
                                        sides={3}
                                        radius={squareSide}
                                        fill="green"
                                        onClick={() => handleObjectTap(i)
                                        }
                                    />
                                    : <Rect
                                        key={`circle-${i}`}
                                        x={point.x}
                                        y={point.y}
                                        width={squareSide} // 半径を適宜調整
                                        height={squareSide} // 半径を適宜調整
                                        fill="blue"
                                        onClick={() => handleObjectTap(i)
                                        }
                                    />

                            ))}
                        </Layer>
                    )}
                </Stage>
            )}
        </div>
    );
}

