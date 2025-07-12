
import React, { useEffect } from 'react';
import './LoaderAnimation.css';
import { ring2 } from 'ldrs';
const LoaderAnimation = () => {
  useEffect(() => {
    ring2.register()
  }, []);

  return (
    <>
      <div className="body">
        <l-ring-2
          size="103"
          bg-opacity="0.3"
          speed="0.8"
          stroke="10"
          color="#FFD700"
        ></l-ring-2>

        <h2>Loading...</h2>
      </div>
    </>
  );
};




export default LoaderAnimation;
