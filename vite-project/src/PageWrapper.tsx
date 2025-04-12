import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  bgGradient: string;
};

const PageWrapper = ({ children, bgGradient }: Props) => {
  return (
    <div
      style={{
        backgroundImage: bgGradient,
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  );
};

export default PageWrapper;