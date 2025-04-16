import { HashRouter, Route, Routes } from 'react-router';

import AppLayout from '@/components/shared/AppLayout';
import UsersListPage from '@/components/users/UsersListPage';

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/users" element={<UsersListPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
