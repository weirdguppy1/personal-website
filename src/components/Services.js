// import React from "react";
// import { motion } from "framer-motion";
// import Section from "../components/Section";
// import ProgressBar from "../components/ProgressBar";

// import {
//   SERVICES_INTRO,
//   SERVICES_SKILLS,
//   SERVICES_WHY,
// } from "../content/content";
// import Navbar from "../components/Navbar";

// const Services = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//       className="flex flex-col justify-center items-center"
//     >
//       <Navbar />
//       <motion.div
//         whileHover={{
//           rotate: 5,
//           transition: { duration: 0.25 },
//         }}
//         className="mt-5"
//       >
//         <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-8xl lg:text-9xl">
//           <span className=" bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-teal-500">
//             Services.
//           </span>
//         </h1>
//       </motion.div>
//       <div className="flex flex-col space-y-6 max-w-xl">
//         <Section title="My Services">
//           <SERVICES_INTRO />
//           {SERVICES_SKILLS.map((element) => {
//             return (
//               <ProgressBar
//                 width={element.level}
//                 title={element.skill}
//                 color={element.color}
//                 duration={element.duration}
//               />
//             );
//           })}
//         </Section>
//         <Section title="How Can I Help your Business?">
//           <SERVICES_WHY />
//         </Section>
//         <Section title="You've come so far 🏃‍♀️...">
//           <button className="hover:bg-gray-800 rounded-xl shadow-xl px-8 py-4 text-white bg-black">
//             <a href="mailto:mfangcoding@gmail.com">Contact Me →</a>
//           </button>
//         </Section>
//       </div>
//     </motion.div>
//   );
// };

// export default Services;
