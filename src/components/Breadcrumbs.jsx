import React from 'react';

const Breadcrumbs = ({ paths }) => {
  return (
    <nav className="flex py-3 text-sm">
      {paths.map((path, index) => (
        <React.Fragment key={index}>
          <a 
            href={path.url} 
            className={`hover:text-blue-600 ${index === paths.length - 1 ? 'font-medium text-gray-700' : 'text-gray-500'}`}
          >
            {path.name}
          </a>
          {index < paths.length - 1 && (
            <span className="mx-2 text-gray-400">&gt;</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;