import { createHashRouter } from 'react-router';

import { Root } from '@/routes/root';

export const router = createHashRouter([
  {
    path: '/',
    Component: Root,
    children: [],
  },
]);
