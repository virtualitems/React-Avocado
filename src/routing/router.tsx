import { HashRouter, Route, Routes } from 'react-router';

import HomeLayout from '@/components/home/HomeLayout';
import UsersCreatePage from '@/components/users/UsersCreatePage';
import UsersDetailPage from '@/components/users/UsersDetailPage';
import UsersEditPage from '@/components/users/UsersEditPage';
import UsersLayout from '@/components/users/UsersLayout';
import UsersListPage from '@/components/users/UsersListPage';

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<div>Home</div>} />
        </Route>
        <Route element={<UsersLayout />}>
          <Route path="/users" element={<UsersListPage />} />
          <Route path="/users/create" element={<UsersCreatePage />} />
          <Route path="/users/:id" element={<UsersDetailPage />} />
          <Route path="/users/:id/edit" element={<UsersEditPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
