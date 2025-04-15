import { HashRouter, Route, Routes } from 'react-router';

import { AppLayout } from '@/layouts/app.layout';

export function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
        </Route>
      </Routes>
    </HashRouter>
  );
}
