import { Outlet } from 'react-router';

export default function AppLayout(): React.ReactElement {
  return (
    <div className="relative min-h-screen">
      <header className="bg-gray-800 p-4 text-white">Header</header>
      <main className="pb-5">
        <Outlet />
      </main>
      <footer className="bottom-0 left-0 absolute bg-gray-800 p-4 w-full text-white">
        Footer
      </footer>
    </div>
  );
}
