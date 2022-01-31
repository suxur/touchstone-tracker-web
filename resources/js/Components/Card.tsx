import * as React from 'react';

interface Props {
  children: JSX.Element[];
}

const Header = ({ children }: { children: JSX.Element }) => children || null;
const Body = ({ children }: { children: JSX.Element }) => children || null;

export const Card = ({ children }: Props) => {
  const header = children?.find(child => child.type.name === 'Header');
  const body = children?.find(child => child.type.name === 'Body');
  return (
    <div className="flex flex-col flex-grow h-full">
      <div className="relative text-gray-600 min-h-10">
        {header ? header.props.children : null}
      </div>
      {body ? body.props.children : null}
    </div>
  );
};

Card.Header = Header;
Card.Body = Body;
