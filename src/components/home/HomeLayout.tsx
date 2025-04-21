import { Outlet } from 'react-router';

export default function HomeLayout(): React.ReactElement {
  return (
    <div className="relative min-h-screen">
      <Outlet />
    </div>
  );
}
