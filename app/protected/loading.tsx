import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {

  return (
    <>
        <main className="z-[999999999999999999] w-full h-full bg-[#f2f2f2] flex text-center items-center justify-center">
  <div className="w-full h-full bg-[#f2f2f2]">
    <div className="flex justify-center items-center w-full h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
    </div>
  </div>
</main>

    </>
  );
};

export default Loading;
