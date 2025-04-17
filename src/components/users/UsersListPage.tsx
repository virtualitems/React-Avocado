import { usersContext } from '@/stores/users';
import { useContext } from 'react';
import { Link } from 'react-router';

export default function UsersListPage(): React.ReactElement {
  const { users, setUsers } = useContext(usersContext);

  const onDelete = (_event: React.MouseEvent, index: number) => {
    const usersList = users.slice();

    usersList.splice(index, 1);

    setUsers(usersList);
  };

  return (
    <div className="bg-white mx-auto mt-4 p-4 rounded container">
      <table className="w-full text-center">
        <thead>
          <tr className="bg-gray-200 pb-2">
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Show</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <ListUsersRow
              key={user.id}
              index={index}
              user={user}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ListUsersRow(props: {
  index: number;
  user: { id: number; email: string; first_name: string; last_name: string };
  onDelete?: (event: React.MouseEvent, index: number) => void;
}) {
  const { user, index, onDelete } = props;

  return (
    <tr className="hover:bg-gray-100">
      <td className="py-2">{user.id}</td>
      <td className="py-2">{user.email}</td>
      <td className="py-2">{user.first_name}</td>
      <td className="py-2">{user.last_name}</td>
      <td className="py-2">
        <Link
          className="bg-blue-500 hover:bg-blue-700 active:opacity-75 px-4 py-2 rounded font-bold text-white cursor-pointer"
          to={`/users/${user.id}`}
        >
          Show
        </Link>
      </td>
      <td className="py-2">
        <Link
          className="bg-yellow-500 hover:bg-yellow-700 active:opacity-75 px-4 py-2 rounded font-bold text-white cursor-pointer"
          to={`/users/${user.id}/edit`}
        >
          Edit
        </Link>
      </td>
      <td className="py-2">
        <button
          className="bg-red-500 hover:bg-red-700 active:opacity-75 px-4 py-2 rounded font-bold text-white cursor-pointer"
          onClick={(event) => onDelete?.(event, index)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
