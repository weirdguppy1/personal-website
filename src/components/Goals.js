import React from "react";
import { motion } from "framer-motion";
import {
 
} from "../content/content";

const Projects = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col p-4"
    >
      <h1 className="font-bold font-mono text-2xl sm:text-3xl md:text-4xl">
        Projects<span className="text-primary">.</span>
      </h1>
      <div className="flex flex-col items-center max-w-xl">
        {"  "}
        <div>{PROJECTS_INTRO}</div>
      </div>
      <div className="flex flex-col mt-4">
        <div className="lg:grid lg:gap-4 lg:grid-cols-3 lg:grid-rows-3 flex flex-col space-y-8 lg:space-y-0">
          
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
