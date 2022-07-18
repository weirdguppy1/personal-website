import React from "react";
import { motion } from "framer-motion";
import { WHO_AM_I } from "../content/content";
import Navbar from "./Navbar";
import Image from "../media/IMG_1945.jpg";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col max-w-lg p-4"
    >
      <h1 className="font-bold font-mono text-2xl sm:text-3xl md:text-4xl">
        About Me<span className="text-primary">.</span>
      </h1>
      <div className="flex flex-col items-center max-w-xl">
        {"  "}
        <div>{WHO_AM_I}</div>
      </div>
    </motion.div>
  );
};

export default About;
