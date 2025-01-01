"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

const Welcome = () => {
  const socialLinks = [
    { icon: <FaFacebook />, url: "#" },
    { icon: <FaInstagram />, url: "#" },
    { icon: <FaTwitter />, url: "#" },
  ];

  const textAnimation = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  const letterAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: (i: any) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 2
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex flex-col items-center justify-between p-6 text-white">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mt-20 md:mt-32"
      >
        <motion.div className="overflow-hidden">
          {"Ekhaya Bar Lounge".split("").map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterAnimation}
              initial="initial"
              animate="animate"
              className="inline-block text-4xl md:text-6xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-[#D62929]"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>
        <motion.p
          variants={textAnimation}
          initial="initial"
          animate="animate"
          className="text-xl md:text-2xl italic text-gray-300 mb-12"
        >
          Home from Home
        </motion.p>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8"
        >
          <button
            className="group relative inline-flex items-center px-8 py-4 text-lg font-bold tracking-widest text-black bg-gradient-to-r from-yellow-600 to-[#D62929] rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-out"
            onClick={() => console.log("New Order Clicked")}
          >
            <span className="relative z-10">NEW ORDER</span>
            <motion.span
              className="absolute right-4 flex items-center"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <BsArrowRight className="ml-2 text-xl" />
            </motion.span>
          </button>
        </motion.div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="w-full max-w-screen-xl mx-auto mt-auto"
      >
        <footer className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4">
            <div className="text-gray-400 text-sm">
              <p>Contact: +1 234 567 890</p>
              <p>Address: 123 Lounge Street, Downtown</p>
            </div>
            <div className="flex gap-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  className="text-gray-400 hover:text-amber-400 text-2xl transition-colors duration-300"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </footer>
      </motion.div>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),rgba(0,0,0,0))] z-0" />
    </div>
  );
};

export default Welcome;