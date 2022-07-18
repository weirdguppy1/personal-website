import React from "react";

export const WHO_AM_I = `Hi! I'm Mark Fang. I'm a high schooler who enjoys 
  coding, napping, writing, or shooting some hoops in the driveway. St.Louis is my city.
`;

export const PROJECTS_INTRO = `
  I am an avid coder. I love to create websites, command line interfaces, and other awesome 
  sh*t. I'm not always a couch potato, here are some of my projects I created. 
`;

export const PROJECT_1 = `
  I go to mandarin language school on Sundays. I noticed that their COVID check-in system is super slow.
  So I created a website that helps our school check-in faster with custom QR codes. 
`;

export const PROJECT_2 = `
  The website you are viewing right now is one of my projects! My personal website is created with 
  React, Tailwind CSS, and Framer Motion.
`;

export const PROJECT_3 = `
  I created a CRUD website sort of like linktr.ee, where you can introduce yourself with a link. Disclaimer: 
  The Project is not in production yet. 
`;

export const PROJECT_4 = `
  One of the first projets I've attempted in web development. Like and share your favorite quotes.
`;

export const PROJECT_5 = `
  I believe in freedom and security of the internet. I created a website to share images with a link. The catch is that the image is 
  deleted after a viewer has seen the image. Make your image transfers quick and private. (Secure file uploading app in development!)
`;

export const PROJECT_6 = `
  I built a chat app that uses chat rooms with a chat filter for students. Sign up with Google and join a chat room with a code.
`;

export const PROJECT_7 = `
  I created this app for a mental health organization called Project Green Balloon. They help Asian Americans discuss their problems about mental health and culture.
`;

export const SERVICES_INTRO = () => {
  return (
    <p>
      I am a passionate developer always ready to find some work. I'm always
      ready to tackle any web project that would help elevate your business to
      the next level. You can contact me at my work email{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-teal-800">
        mfangcoding@gmail.com
      </span>
      .
    </p>
  );
};

export const SERVICES_HELPYOU = `
  With my flexible schedules and coding expertise, I can help develop websites or 
  applications that can help reach your audience online 🌎. Let me help you create
  and manage your websites. 
`;

export const SERVICES_WHY = () => {
  return (
    <ol className="flex flex-col max-w-lg space-y-3 text-sm">
      <li>
        1. Your website will help establish your brand as it conveys
        professionalism.
      </li>
      <li>
        2. Reach potential customers from the internet, and build a strong
        community.
      </li>
      <li>
        3. Showcase and get people actually <strong>EXCITED</strong> about your
        product.
      </li>
      <li>
        4. With a website, customer service and announcements have never been
        easier.
      </li>
      <li>5. Generate leads and sales while your asleep 💤.</li>
    </ol>
  );
};

export const SERVICES_SKILLS = [
  { skill: "HTML + CSS", level: 100, color: "red", duration: 1 },
  { skill: "React", level: 90, color: "indigo", duration: 1.5 },
  { skill: "Server Development", level: 70, color: "pink", duration: 2 },
  { skill: "Python", level: 40, color: "green", duration: 2.5 },
];
