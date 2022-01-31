import * as React from 'react';
import { Card } from './Card';

type Props = {
  children: JSX.Element[];
};

const Header = ({ children }: { children?: JSX.Element }) => children || null;
const Body = ({ children }: { children: JSX.Element }) => children || null;

export const ScrollContent = ({ children }: Props) => {
  const header = children.find(child => child.type.name === 'Header');
  const body = children.find(child => child.type.name === 'Body');
  return (
    <Card>
      <Card.Header>
        <div className="flex justify-between items-center min-h-10">
          {header ? header.props.children : null}
        </div>
      </Card.Header>
      <Card.Body>
        <div className="relative flex flex-grow rounded-md overflow-hidden">
          <div className="absolute inset-0 divide-y divide-gray-200 flex flex-col">
            <div className="flex flex-grow flex-col min-h-full">
              {body ? body.props.children : null}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

ScrollContent.Header = Header;
ScrollContent.Body = Body;
