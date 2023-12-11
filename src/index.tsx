import { createRoot } from 'react-dom/client';
import { GridSpanForm } from './components/gridInputForm';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <div>
    <GridSpanForm />

    {/* <App /> */}

  </div>
);
