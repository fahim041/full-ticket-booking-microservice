import axios from 'axios';

export default async function apiClient(url: string, cookie: string) {
  const baseUrl = 'http://ingress-nginx-controller.ingress-nginx';
  const res = await axios.get(`${baseUrl}${url}`, {
    headers: {
      Host: 'ticket.localdev.me',
      Cookie: `session=${cookie}`,
    },
  });
  return res.data;
}
