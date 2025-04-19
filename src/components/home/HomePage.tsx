import { Link } from 'react-router';

export default function HomePage() {
  return (
    <div className="mx-auto container">
      <h1 className="my-2 font-bold text-3xl">Home Page</h1>
      <Link to="/users">Go to Users</Link>
    </div>
  );
}
