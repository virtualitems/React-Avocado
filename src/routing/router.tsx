import { HashRouter, Route, Routes } from 'react-router';

import AppLayout from '@/components/shared/AppLayout';
import UsersCreatePage from '@/components/users/UsersCreatePage';
import UsersDetailPage from '@/components/users/UsersDetailPage';
import UsersEditPage from '@/components/users/UsersEditPage';
import UsersListPage from '@/components/users/UsersListPage';

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/users" element={<UsersListPage />} />
          <Route path="/users/create" element={<UsersCreatePage />} />
          <Route path="/users/:id" element={<UsersDetailPage />} />
          <Route path="/users/:id/edit" element={<UsersEditPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
