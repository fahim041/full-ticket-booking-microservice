'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface User {
  id?: string;
  email?: string;
}

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User>({});

  const getData = async () => {
    const res = await axios.get('/api/users/currentuser');
    return res.data;
  };

  useEffect(() => {
    // const getData = async () => {
    //   const res = await axios.get('/api/users/currentuser');
    //   console.log(res.data);
    //   setCurrentUser(res.data.currentUser);
    // };

    getData().then((data) => {
      console.log(data);
      setCurrentUser(data.currentUser);
    });
  }, []);

  return (
    <main>
      <h1>Home</h1>
      <h2>{currentUser?.email}</h2>
    </main>
  );
}
