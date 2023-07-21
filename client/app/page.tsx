import getCurrentUser from './utils/current-user';

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <h1>Home</h1>
      <p>
        {currentUser?.email ? 'You are signed in' : 'You are not signed in'}
      </p>
    </div>
  );
}
