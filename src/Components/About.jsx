import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-12 px-4 sm:mt-16 md:mt-24 md:mb-20 mb-44">
      <h1 className="text-3xl font-bold text-[#6200ea] mb-4">About PassStore</h1>
      <p className="text-center text-gray-700 max-w-xl leading-6">
        PassStore is a simple password manager application created by a learner for practice purposes. 
        This app securely stores your passwords locally in your browser's <span className="font-semibold">localStorage</span>.
        It does not currently have a backend connection, which means your data remains only on your device.
        <br />
        <br />
        In the future, the app will be upgraded to include backend connectivity, providing additional features like 
        cloud synchronization, advanced encryption, and multi-device access.
      </p>
      <p className="text-center text-gray-500 mt-6">
        Created with 💻 by <span className="font-medium">A Learner</span>.
      </p>
    </div>
  );
};

export default About;
