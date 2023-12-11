import React, { useState } from 'react';
import { GridLine, buildGrid } from './grid';
import { Stage, Layer, Line, Text, Rect, Group } from 'react-konva';

export const GridSpanForm = () => {
    const [xGridSpan, setXGridSpan] = useState<string>('');
    const [yGridSpan, setYGridSpan] = useState<string>('');
    const [createdGrid, setCreateGrid] = useState<GridLine[]>([]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // 文字列を数値の配列に変換
        const xSpanArray = xGridSpan.split(',').map(Number);
        const ySpanArray = yGridSpan.split(',').map(Number);

        // buildGrid 関数を呼び出す
        setCreateGrid(buildGrid(
            window.innerWidth,
            window.innerHeight,
            xSpanArray,
            ySpanArray,
        ));
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Build Grid</button>
            </form>
            {/* createGridが空の場合は、グリッドを表示しない */}
            {createdGrid.length > 0 && (
                <Stage
                    // width={window.innerWidth} height={window.innerHeight}
                    width={800} height={600}
                >
                    <Layer>
                        {createdGrid.map(({ key, points, x, y }) => (
                            <Line key={key} points={points} stroke="grey" strokeWidth={1} x={x} y={y} />
                        ))}
                    </Layer>
                </Stage>
            )}
        </div>
    );
};
