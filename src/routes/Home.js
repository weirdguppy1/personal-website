import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Projects from "../components/Projects";

const Home = () => {
  const [list] = useState([
    "dreamer",
    "basketball player",
    "creator",
    "coder",
    "pasta lover",
    "minimalist",
    "sushi connoisseur",
    "ENFJ",
    "writer",
    "gamer",
  ]);
  const [index, setIndex] = useState(Math.floor(Math.random() * list.length));

  useEffect(() => {
    let timer = setTimeout(() => {
      index === list.length - 1 ? setIndex(0) : setIndex(index + 1);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Navbar />
      <div className="container mx-auto px-4 mt-20">
        <h1>
          <span className="text-2xl md:text-4xl lg:text-6xl">
            <span className="text-primary">Hi</span>, I'm Mark Fang
          </span>
        </h1>
        <span className="text-xl md:text-2xl lg:text-3xl">
          I am a{" "}
          <span className="font-bold font-mono italic">{list[index]}</span>
        </span>
        <div className="flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 text-sm md:text-lg mt-3">
          <a>mark.fang.mo@gmail.com</a>
          <h1 className="font-bold">·</h1>
          <a
            className="underline"
            href="github.com/weirdguppy1"
            target="_blank" 
          >
            Github
          </a>
          <h1 className="font-bold">·</h1>
          <a
            className="underline"
            href="https://www.instagram.com/markee_fangee/"
            target="_blank"
          >
            The Gram
          </a>
        </div>
        <div className="flex flex-col space-y-10 mt-12">
          <About />
          <Projects />
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
