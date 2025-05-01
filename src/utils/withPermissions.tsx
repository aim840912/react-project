import React from 'react';

const withPermissions = (required: string[], current: string[]) => {
  return function <P extends object>(Component: React.FC<P>): React.FC<P> {
    const WrappedComponent: React.FC<P> = (props) =>
      required.every((key) => current.includes(key)) ? <Component {...props} /> : null;

    WrappedComponent.displayName = `WithPermissions(${Component.displayName || Component.name || 'Component'})`;

    return WrappedComponent;
  };
};

export default withPermissions;
