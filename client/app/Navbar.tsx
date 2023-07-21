'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar(user: any) {
  const [currentUser, setCurrentUser] = useState(user);
  console.log('navbar', currentUser);

  return (
    <nav className="navbar navbar-light bg-light px-4">
      <a href="/" className="navbar-brand">
        Ticket
      </a>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          <li className="nav-item">
            {!currentUser.user && (
              <a className="p-2" href="/auth/signin">
                Sign In
              </a>
            )}
            {!currentUser.user && (
              <a className="p-2 " href="/auth/signup">
                Sign Up
              </a>
            )}
            {currentUser.user && (
              <a className="p-2" href="/auth/signout">
                Sign Out
              </a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
