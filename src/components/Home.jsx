import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import solar from "../assets/solar.png";
import figma from "../assets/figma.png";
import insta from "../assets/insta.png";
import Contact from "./Contact";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const bgRef = useRef(null);

  useEffect(() => {

      
    gsap.to(bgRef.current, {
      opacity: 1, // final opacity
      scrollTrigger: {
        trigger: document.querySelector(".home"), // entire page
        start: "-30px 50%",
        end: "2% 20%",
        scrub: true, // smooth animation
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative home w-full  ">
      {/* Background overlay */}
      <div
        ref={bgRef}
        className="absolute shadow-[0_-900px_200px_-10px_#FF861A] top-0 left-0 w-full h-full bg-[#FF861A] opacity-[0]"
      ></div>

      {/* Content */}
      <div className="relative mt-[-300px]">
        {/* About section */}
        <div id="about" className="flex flex-col items-center justify-center py-10">
          <h1 className="heading shadow-head text-3xl md:text-6xl font-bold w-fit h-fit text-[#ff861a] text-center bg-[#525252] p-2">
            Hi there
          </h1>
          <div className="md:w-2/3 p-10 md:text-xl text-[#525252] font-bold text-justify flex flex-col gap-10">
            <p>
              My name is Abhey Singh, I’m a passionate full stack developer with a strong focus on React.js, Node.js, Express, MongoDB and mobile development (React Native). I have a deep interest in building modern applications that combine scalable backends, engaging user interfaces.
            </p>
            <p>
              Below, you’ll find details of some of the projects I’ve built while sharpening my skills and broadening my expertise across web, mobile
            </p>
          </div>

          <h1 className="md:text-2xl shadow-head text-xl font-bold w-fit h-fit text-[#ff861a] text-center bg-[#525252] mt-10 p-2">
            Technical Skills
          </h1>

          <div className="md:w-2/3 p-10 text-xl text-[#525252] font-bold text-justify flex flex-col gap-10 border-b-3 border-dashed border-[#525252]">
            <div className="flex items-center flex-wrap gap-2 text-sm md:text-xl">
              <span className="p-2 rounded-xl border-1 w-fit">Javascript</span>
              <span className="p-2 rounded-xl border-1">React.js , Next.js</span>
              <span className="p-2 rounded-xl border-1 w-fit">Three.js</span>
              <span className="p-2 rounded-xl border-1 w-fit">Tailwind CSS</span>
              <span className="p-2 rounded-xl border-1">Node.js</span>
              <span className="p-2 rounded-xl border-1">Express.js</span>
              <span className="p-2 rounded-xl border-1">MongoDB</span>
              <span className="p-2 rounded-xl border-1">Authentication (JWT, bcrypt.js, Cookies)</span>
              <span className="p-2 rounded-xl border-1 w-fit">Python</span>
              <span className="p-2 rounded-xl border-1 w-fit">Git , Github</span>
              <span className="p-2 rounded-xl border-1 w-fit">Vercel , Render</span>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div id="projects" className="w-full flex flex-col items-center justify-center py-15">
          <h1 className="md:text-6xl shadow-head heading text-3xl font-bold w-fit h-fit text-[#ff861a] text-center bg-[#525252] p-2">
            Projects
          </h1>
          <div className="w-1/4 border-b-3 border-[#525252] border-dashed p-5"></div>

          {/* 3D Solar System */}
          <h1 className="md:text-2xl shadow-head shadow-head font-bold w-fit h-fit text-[#ff861a] text-center bg-[#525252] mt-10 p-2">
            3D Solar System View
          </h1>
          <div className="md:w-2/3 p-10 md:text-xl text-[#525252] font-bold text-justify flex flex-col gap-10">
            <p>
              An interactive 3D solar system visualization built using Three.js and React, designed to showcase the planets, their orbits, and relative scales in an engaging and educational way. The model allows users to explore planetary motion, zoom in/out for different perspectives, and experience space in a dynamic, browser-based environment.
            </p>
            <div className="flex flex-wrap text-sm md:text-xl items-center gap-2">
              <span className="tech font-semibold">Tech Stack: </span>
              <span className="p-2 rounded-xl border-1">React</span>
              <span className="p-2 rounded-xl border-1">Three.js</span>
              <span className="p-2 rounded-xl border-1">Tailwind CSS</span>
              <span className="p-2 rounded-xl border-1">vercel</span>
            </div>
            <div className="flex text-sm md:text-xl flex-wrap items-center gap-2">
              <span className="tech font-semibold">Live-link : </span>
              <a href="https://3d-solar-model.vercel.app" className="transform transition-transform duration-300 hover:scale-103 p-2 border-1 rounded-2xl">
                <img src={solar} className="md:w-100 rounded-2xl" alt="" />
              </a>
            </div>
          </div>

          <div className="w-1/4 border-b-3 border-[#525252] border-dashed p-5"></div>

          {/* Figma Project */}
          <h1 className="md:text-2xl shadow-head font-bold w-fit h-fit text-[#ff861a] text-center bg-[#525252] mt-10 p-2">
            Figma to Website Conversion
          </h1>
          <div className="md:w-2/3 p-10 md:text-xl text-[#525252] font-bold text-justify flex flex-col gap-10">
            <p>
              I developed a fully responsive website by translating a Figma design into a modern, production-ready web experience. The project focuses on pixel-perfect UI implementation, ensuring that every detail from the design — including typography, colors, spacing, and animations — was faithfully brought to life.
            </p>
            <div className="flex flex-wrap text-sm md:text-xl items-center gap-2">
              <span className="tech font-semibold">Tech Stack: </span>
              <span className="p-2 rounded-xl border-1">React</span>
              <span className="p-2 rounded-xl border-1 w-fit">Tailwind CSS</span>
              <span className="p-2 rounded-xl border-1">vercel</span>
            </div>
            <div className="flex text-sm md:text-xl flex-wrap items-center gap-2">
              <span className="tech font-semibold">Live-link : </span>
              <a href="https://quadb-training-ibw2mobileapp.vercel.app/" className="transform transition-transform duration-300 hover:scale-103 p-2 border-1 rounded-2xl">
                <img src={figma} className="md:w-100 rounded-2xl" alt="" />
              </a>
            </div>
          </div>

          <div className="w-1/4 border-b-3 border-[#525252] border-dashed p-5"></div>

          {/* Instagram Clone */}
          <h1 className="md:text-2xl shadow-head text-lg font-bold w-fit h-fit text-[#ff861a] text-center bg-[#525252] mt-10 p-2">
            Instagram Clone
          </h1>
          <div className="md:w-2/3 p-10 md:text-xl text-[#525252] font-bold text-justify flex flex-col gap-10 border-b-3 border-dashed border-[#525252]">
            <p>
              I built a full-stack social media application inspired by Instagram, with features that enable real-time interaction and content sharing. The app supports user authentication, chatting, posts with images, likes, comments, and follow/unfollow functionality, along with a fully responsive UI for a smooth user experience.
            </p>
            <div className="flex items-center text-sm md:text-xl flex-wrap gap-2">
              <span className="tech font-semibold">Tech Stack: </span>
              <span className="p-2 rounded-xl border-1">React</span>
              <span className="p-2 rounded-xl border-1 w-fit">Tailwind CSS</span>
              <span className="p-2 rounded-xl border-1">Node.js</span>
              <span className="p-2 rounded-xl border-1">Express.js</span>
              <span className="p-2 rounded-xl border-1">MongoDB</span>
              <span className="p-2 rounded-xl border-1">JWT</span>
              <span className="p-2 rounded-xl border-1 w-fit">Vercel , Render</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="tech font-semibold">Live-link : </span>
              <a href="https://quadb-training-ibw2mobileapp.vercel.app/" className="transform transition-transform duration-300 hover:scale-103 p-2 border-1 rounded-2xl">
                <img src={insta} className="w-100 rounded-2xl" alt="" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Section */}
          <div id="about" className="flex flex-col items-center justify-center py-10">
          <h1 className="heading shadow-head text-3xl md:text-6xl font-bold w-fit h-fit text-[#ff861a] text-center bg-[#525252] p-2">
            Contact
          </h1>
           <Contact/>
        </div>
        
      </div>
    </div>
  );
}

export default Home;
