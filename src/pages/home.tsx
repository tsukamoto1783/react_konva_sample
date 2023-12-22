import React from 'react'
import { useNavigate } from 'react-router-dom';

const style = {
    width: '200px',
    height: '50px',
    fontSize: '20px',
    backgroundColor: 'lightgreen',
    borderRadius: '10px',
}



export const Home: React.FC = () => {
    const navigate = useNavigate();

    const onClickGrid = () => {
        navigate('/grid');
    };
    const onClickScaling = () => {
        navigate('/scaling');
    }
    const onClickGridObject = () => {
        navigate('/grid_object');
    }

    const onClickLayerCanvas = () => {
        navigate('/layer_canvas');
    }

    return (
        <div>
            <h1>react-konva sample</h1>
            <button onClick={onClickGrid}>マス目生成demo</button>
            <br />
            <br />
            <button onClick={onClickScaling}>オブジェクト縮小拡大demo</button>
            <br />
            <br />
            <button onClick={onClickGridObject}>Gridの交点にObjedct配置demo</button>
            <br />
            <br />
            <button onClick={onClickLayerCanvas} style={style}>Layer挙動demo</button>
            <br />
            <br />
        </div >
    )
}