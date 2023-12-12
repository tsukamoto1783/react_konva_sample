import { createRoot } from 'react-dom/client';
import { GridSpanForm } from './components/gridInputForm';
import { InteractiveShape } from './components/objectSample';
import MyComponent from './components/moblable';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <div>
    <InteractiveShape />
    {/* <MyComponent /> */}
    {/* <GridSpanForm /> */}

    {/* <App /> */}

  </div>
);
