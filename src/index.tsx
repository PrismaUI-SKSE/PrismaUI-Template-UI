import './index.css';

import { createRoot } from 'react-dom/client';

import { App } from '@/app';
import { SKSE_API } from '@/lib/skse-api';

SKSE_API.init();

const root = createRoot(document.querySelector('#app') as HTMLElement);

root.render(<App />);
