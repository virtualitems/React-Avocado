import { createContext } from 'react';

export const usersContext = createContext<{
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  addUser: (user: User) => void;
  updateUser: (index: number, user: User) => void;
  deleteUser: (index: number) => void;
}>({
  users: [],
  setUsers: () => {},
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
});
