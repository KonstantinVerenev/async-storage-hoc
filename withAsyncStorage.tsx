import React from 'react';

export default function withAsyncStorage<P>(Component: React.ComponentType<P>) {
  return (props: P) => {
    return <Component {...props} />;
  };
}
