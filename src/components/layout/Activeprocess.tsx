// import Image from 'next/image';
// import React from 'react';
// import img from "../../../public/idk.png";

// const ActiveProcess = () => {
//   return (
//     <div className="relative mt-[100px]">
//       <div className="relative">
//         <Image src={img} alt="background image" className="w-full object-cover"/>
//       </div>

//       {/* Content Overlay */}
//       <div className="absolute top-0 left-0 flex flex-col justify-end items-end text-end w-full py-[30px] px-[130px] text-white">
//         <h1 className="text-bordercoloryello font-greatVibes text-[32px] leading-[40px] font-medium">
//           Restaurant Active Process
//         </h1>
//         <h1 className="font-helvetica font-bold text-[40px] leading-[45px] md:w-[700px]">
//           <span className="text-bordercoloryello">We</span> Document Every Food
//           Bean Process until it is saved
//         </h1>
//         <p className="font-normal text-[16px] leading-6 mt-4 md:w-[600px]">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam
//           pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit
//           augue urna, vitae feugiat pretium donec id elementum. Ultrices mattis
//           sed vitae mus risus. Lacus nisi, et ac dapibus sit eu velit in
//           consequat.
//         </p>

//         {/* Buttons */}
//         <div className="flex flex-row justify-center mt-8 space-x-6">
//           <button className="bg-bordercoloryello text-black font-bold py-3 px-8 rounded-full text-[16px] leading-[24px] shadow-md hover:bg-yellow-500">
//             Read More
//           </button>
//           <button className="bg-transparent border border-bordercoloryello text-bordercoloryello font-bold py-3 px-8 rounded-full text-[16px] leading-[24px] shadow-md hover:bg-bordercoloryello hover:text-black">
//             Play Video
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActiveProcess;

import Image from 'next/image';
import React from 'react';
import img from "../../../public/idk.png";

const ActiveProcess = () => {
  return (
    <div className="relative mt-10 md:mt-16 lg:mt-24">
      {/* Background Image */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <Image src={img} alt="background image" layout="fill" objectFit="cover" priority />
      </div>
      
      {/* Content Overlay */}
      <div className="absolute top-0 left-0 flex flex-col justify-center items-center text-center w-full h-full px-6 md:px-12 lg:px-32 text-white">
        <h1 className="text-bordercoloryello font-greatVibes text-lg md:text-xl lg:text-2xl font-medium">
          Restaurant Active Process
        </h1>
        <h1 className="font-helvetica font-bold text-2xl md:text-3xl lg:text-4xl mt-2">
          <span className="text-bordercoloryello">We</span> Document Every Food Bean Process Until It Is Served
        </h1>
        <p className="font-normal text-sm md:text-base lg:text-lg mt-4 max-w-lg lg:max-w-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum. 
          Urna, elit augue urna, vitae feugiat pretium donec id elementum.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center items-center mt-6 space-y-3 md:space-y-0 md:space-x-4">
          <button className="bg-bordercoloryello text-black font-bold py-2 px-6 rounded-full text-sm md:text-base shadow-md hover:bg-yellow-500">
            Read More
          </button>
          <button className="bg-transparent border border-bordercoloryello text-bordercoloryello font-bold py-2 px-6 rounded-full text-sm md:text-base shadow-md hover:bg-bordercoloryello hover:text-black">
            Play Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveProcess;
