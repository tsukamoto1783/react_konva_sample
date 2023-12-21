import { createRoot } from 'react-dom/client';
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { GridPage } from './pages/grid';
import { ObjectScalingPage } from './pages/object_scaling';
import { GridObjectPage } from './pages/grid_object';
import { LayerCanvas } from './pages/layer_canvas';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grid" element={<GridPage />} />
        <Route path="/scaling" element={<ObjectScalingPage />} />
        <Route path="/grid_object" element={<GridObjectPage />} />
        <Route path="/layer_canvas" element={<LayerCanvas />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
