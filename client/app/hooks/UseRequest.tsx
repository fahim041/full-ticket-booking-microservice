'use client';
import axios from 'axios';
import { ReactNode, useState } from 'react';

type Methods = 'head' | 'options' | 'put' | 'post' | 'patch' | 'delete' | 'get';

interface UseRequestProps {
  url: string;
  method: Methods;
  body: { [key: string]: string | number };
  onSuccess: () => void;
}

export default function UseRequest({
  url,
  method,
  body,
  onSuccess,
}: UseRequestProps) {
  const [errors, setErrors] = useState<ReactNode>([]);

  const doRequest = async () => {
    try {
      setErrors([]);
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess();
      }
      return response.data;
    } catch (err: any) {
      setErrors(
        <div className="alert alert-danger">
          <ul className="my-0">
            {err.response?.data.errors.map((err: any) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
}
