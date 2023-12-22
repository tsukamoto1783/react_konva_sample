import { useState } from 'react';
import { buildGrid } from '../feature/build_grid';
import { Stage, Layer, Line, Circle, Rect, RegularPolygon } from 'react-konva';
import { GridLine } from '../types/grid_line';
import { buildCirclePoints } from '../feature/build_circle_points';
import { buildSquarePoints } from '../feature/build_square_points';
import { buildBackgroundPoints } from '../feature/build_background_points';


const style = {
    textAlign: 'left' as 'left',
    width: '400px',
    height: '48px',
    fontSize: '16px',
    backgroundColor: 'lightblue',
}

enum ButtonType {
    Grid,
    Background,
    Circle,
    Square
}

export const GridSpanForm = () => {
    const [xGridSpan, setXGridSpan] = useState<string>('50,50,50,50');
    const [yGridSpan, setYGridSpan] = useState<string>('50,50,50,50');

    const [grid, setGrid] = useState<GridLine[]>([]);

    const [circlePoints, setCirclePoints] = useState<GridLine[]>([]);

    const [squarePoints, setSquarePoints] = useState<GridLine[]>([]);

    const [backgroundPoints, setBackgroundPoints] = useState<number[]>([]);

    const squareSide = 20;

    const handleObjectTap = (i: number) => {
        console.log(i);
        // squarePointsのi番目のGridLineのisTriangleを反転させる。
        const newSquarePoints = squarePoints.map((point, index) => {
            if (index === i) {
                return { ...point, isTriangle: !point.isTriangle };
            } else {
                return point;
            }
        });
        setSquarePoints(newSquarePoints);
    }

    const onClickButton = (type: ButtonType) => {
        // 文字列を数値の配列に変換
        const xSpanArray = xGridSpan.split(',').map(Number);
        const ySpanArray = yGridSpan.split(',').map(Number);

        switch (type) {
            case ButtonType.Grid:
                setGrid(
                    buildGrid(
                        window.innerWidth,
                        window.innerHeight,
                        xSpanArray,
                        ySpanArray,
                    ),
                );
                break;
            case ButtonType.Background:
                setBackgroundPoints(
                    buildBackgroundPoints(xSpanArray, ySpanArray),
                );
                break;
            case ButtonType.Circle:
                setCirclePoints(
                    buildCirclePoints(xSpanArray, ySpanArray),
                );
                break;
            case ButtonType.Square:
                setSquarePoints(
                    buildSquarePoints(squareSide, xSpanArray, ySpanArray),
                );
                break;
        }
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
                <button style={style} type="button" onClick={() => onClickButton(ButtonType.Grid)}>Layer Index1: Build Grid</button>
                <br />
                <br />
                <button style={style} type="button" onClick={() => onClickButton(ButtonType.Background)}>Layer Index2: Build Background Color</button>
                <br />
                <br />
                <button style={style} type="button" onClick={() => onClickButton(ButtonType.Circle)}>Layer Index3: Build Circle Points</button>
                <br />
                <br />
                <button style={style} type="button" onClick={() => onClickButton(ButtonType.Square)}>Layer Index4: Build Square Points</button>
            </form>
            {/* createGridが空の場合は、グリッドを表示しない */}
            {grid.length > 0 && (
                <Stage
                    // width={window.innerWidth} height={window.innerHeight}
                    width={800} height={600} // canvas表示サイズを指定
                >

                    {/* gridレイヤー */}
                    <Layer>
                        {grid.map(({ key, points, x, y }) => (
                            <Line key={key} points={points} stroke="grey" strokeWidth={1} x={x} y={y} />
                        ))}
                    </Layer>

                    {/* backgroundレイヤー */}
                    {backgroundPoints.length > 0 && (
                        <Layer>
                            <Line
                                points={backgroundPoints}
                                stroke="red"
                                strokeWidth={0}
                                closed={true}
                                fill="rgba(160, 145, 145, 0.2)" // 透明度を含む塗りつぶし色
                            />
                        </Layer>
                    )}

                    {/* circleレイヤー */}
                    {circlePoints.length > 0 && (

                        <Layer>
                            {circlePoints.map((point, i) => (
                                <Circle
                                    key={`circle-${i}`}
                                    x={point.x}
                                    y={point.y}
                                    radius={15} // 半径を適宜調整
                                    fill="red"
                                    onClick={() => console.log(i)}
                                />
                            ))}
                        </Layer>


                    )}


                    {/* squareレイヤー */}
                    {squarePoints.length > 0 && (
                        <Layer>
                            {squarePoints.map((point, i) => (
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

