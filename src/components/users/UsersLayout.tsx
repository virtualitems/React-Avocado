import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import { usersContext } from '@/stores/users';
import { listUsers } from '@/providers/users.service';
import Loader from '../Loader';

export default function UsersLayout(): React.ReactElement {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const value = {
    users,
    setUsers,
    addUser: (user: User) => {
      setUsers((prev) => [...prev, user]);
    },
    updateUser: (index: number, user: User) => {
      setUsers((prev) => {
        const newUsers = [...prev];
        newUsers[index] = user;
        return newUsers;
      });
    },
    deleteUser: (index: number) => {
      setUsers((prev) => {
        const newUsers = [...prev];
        newUsers.splice(index, 1);
        return newUsers;
      });
    },
  };

  useEffect(() => {
    setLoading(true);
    listUsers(1, 12)
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch(console.warn)
      .finally(() => setLoading(false));
  }, [setUsers]);

  if (loading === true) {
    return <Loader />;
  }

  return (
    <div className="relative min-h-screen">
      <header className="bg-gray-800 p-4 text-white">Usuarios</header>
      <main className="pb-16">
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
