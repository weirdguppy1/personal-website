import React from "react";
import { motion } from "framer-motion";
import {
  PROJECTS_INTRO,
  PROJECT_1,
  PROJECT_2,
  PROJECT_3,
  PROJECT_4,
  PROJECT_5,
  PROJECT_6,
  PROJECT_7,
} from "../content/content";
import Navbar from "../components/Navbar";
import CheckInProjectImg from "../media/checkinproject.png";
import PersonalWebsiteImg from "../media/personalwebsite.png";
import QuotesImg from "../media/quotesapp.png";
import MyBioImg from "../media/mybio.png";
import ImageSharingImg from "../media/plumapp.png";
import ChatAppImg from "../media/chat-app.png";
import PGBIMg from "../media/pgb.png";
import Card from "./Card";

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
          <Card
            link="https://check-in-prj2.vercel.app/"
            title="School Check-in System"
            img={CheckInProjectImg}
          >
            {PROJECT_1}
          </Card>
          <Card link="/" title="Personal Website" >
            {PROJECT_2}
          </Card>
          <Card link="" title="Bio Link SAAS" img={MyBioImg}>
            {PROJECT_3}
          </Card>
          <Card
            link="https://quotes-app-sigma.vercel.app/"
            title="Quotes App"
            img={QuotesImg}
          >
            {PROJECT_4}
          </Card>

          <Card
            link="https://plum-weirdguppy1.vercel.app/"
            title="Plum: Image Sharing App"
            img={ImageSharingImg}
          >
            {PROJECT_5}
          </Card>
          <Card
            link="https://chat-app-alpha-wheat.vercel.app/"
            title="Chat App"
            img={ChatAppImg}
          >
            {PROJECT_6}
          </Card>
          {/* <Card
            link="https://definitions-app.vercel.app"
            title="Dictionary App"
            img={DictAppImg}
          >
            {PROJECT_7}
          </Card> */}
          <Card
            link="https://project-green-balloon.vercel.app/"
            title="Project Green Balloon"
            img={PGBIMg}
          >
            {PROJECT_7}
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
