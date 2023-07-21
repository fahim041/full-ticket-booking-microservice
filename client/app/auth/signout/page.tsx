'use client';

import axios from 'axios';
import { useEffect } from 'react';

export default function SignOut() {
  useEffect(() => {
    axios.post('/api/users/signout', {}).then((res) => {
      window.location.href = '/';
    });
  }, []);

  return <h3>Signing out...</h3>;
}
