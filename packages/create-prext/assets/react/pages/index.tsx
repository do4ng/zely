import React from 'react';
import { Counter } from '../components/counter';

export function data() {
  return {
    props: {
      message: 'Hello World!',
    },
  };
}

export default function app({ message }) {
  return (
    <>
      <h1>{message}</h1>
      <div className="counter">
        <Counter />
      </div>
    </>
  );
}
