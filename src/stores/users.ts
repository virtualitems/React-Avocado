import { createContext } from 'react';

export const usersContext = createContext<{
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}>({
  users: [],
  setUsers: () => {},
});
