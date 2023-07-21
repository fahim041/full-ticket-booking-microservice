import apiClient from '../api-client/apiClient';
import { cookies } from 'next/headers';

export default async function getCurrentUser() {
  const cookieList = cookies();
  const val = cookieList.get('session')?.value || '';
  let res;
  try {
    res = await apiClient('/api/users/currentuser', val);
  } catch (error: any) {
    console.log('error', error.message);
  }

  return res.currentUser;
}
