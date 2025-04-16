import { type ReactElement } from 'react';
import { Outlet } from 'react-router';

export default function AppLayout(): ReactElement {
  return (
    <div>
      <header>Header</header>
      <Outlet />
      <footer>Footer</footer>;
    </div>
  );
}
