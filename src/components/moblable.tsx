import React, { useRef, useEffect, useState } from 'react';
import Moveable from 'react-moveable';

const MyComponent: React.FC = () => {
    const [target, setTarget] = useState<SVGElement | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const circleRef = useRef<SVGCircleElement>(null);

    useEffect(() => {
        if (circleRef.current) {
            setTarget(circleRef.current);
        }
    }, []);

    return (
        <>
            <svg
                ref={svgRef}
                width={400}
                height={400}
                style={{ border: '1px solid #000' }}
            >
                <circle
                    ref={circleRef}
                    // cx={window.innerWidth / 2}
                    cx={400 / 2}
                    cy={400 / 2}
                    r="50"
                    fill="white"
                    stroke="black"
                    strokeWidth="4"
                />
            </svg>
            {target && (
                <Moveable
                    target={target}
                    draggable={true}
                    resizable={true}
                    onDrag={({ beforeTranslate }) => {
                        target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
                    }}
                    onResize={({ target, width, height, drag }) => {
                        const beforeTranslate = drag.beforeTranslate;
                        target.setAttribute('r', String(Math.max(width, height) / 2));
                        target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
                    }}
                />
            )}
        </>
    );
};

export default MyComponent;
