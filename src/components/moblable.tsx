import React, { useRef, useEffect, useState } from 'react';
import Moveable from 'react-moveable';

const Moblable: React.FC = () => {
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
            {/* canvas */}
            <svg
                ref={svgRef}
                width={200}
                height={200}
                style={{ border: '1px solid #000' }}
            >
                <circle
                    ref={circleRef}
                    cx={100}
                    cy={100}
                    r="50"
                    fill="white"
                    stroke="black"
                    strokeWidth="2"
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

export default Moblable;
