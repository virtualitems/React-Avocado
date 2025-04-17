import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import { usersContext } from '@/stores/users';

export default function UsersLayout(): React.ReactElement {
  const [users, setUsers] = useState<User[]>([]);

  const value = {
    users,
    setUsers,
  };

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((response) => {
        if (response.ok === false)
          throw new Error('Network response was not ok');
        return response.json();
      })
      .then((json) => {
        setUsers(json.data);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [setUsers]);

  return (
    <div className="relative min-h-screen">
      <header className="bg-gray-800 p-4 text-white">Usuarios</header>
      <main className="pb-5">
        <usersContext.Provider value={value}>
          <Outlet />
        </usersContext.Provider>
      </main>
      <footer className="bottom-0 left-0 absolute bg-gray-800 p-4 w-full text-white">
        Footer
      </footer>
    </div>
  );
}
