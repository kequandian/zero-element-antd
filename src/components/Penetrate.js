import React from 'react';

export default function Penetrate({ children, ...rest }) {
  return <>
    {React.Children.toArray(children).map(child => React.cloneElement(child, rest))}
  </>
}