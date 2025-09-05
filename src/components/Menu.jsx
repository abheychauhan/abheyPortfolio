import React, { useState } from 'react';
import 'remixicon/fonts/remixicon.css'


const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
                {
                  name:"in",
                  link:"https://www.linkedin.com/in/abhey-singh172/",
                  icon:"ri-linkedin-line"
                 },
                                 {
                  name:"in",
                  link:"https://github.com/abheychauhan",
                  icon:"ri-github-line"

                 }
                ]

        const menu = [
          {
            name:"Home",
            link: "#home",
          },
          {
            name:"About",
            link: "#about",
          },
          {
            name:"Projects",
            link: "#projects",
          },
          {
            name:"Contact",
            link: "#contact",
          }
        ]

  return (
    <div className="relative w-[100%] z-[9]  font-retro text-beige ">
      {/* Top Bar */}
      <div className=" fixed w-fit flex items-center justify-center gap-1  p-4  pt-10 pl-10 z-[99]  ">
        <button onClick={() => setIsOpen(!isOpen)}  className={`hover:scale-110 flex items-center  justify-center border  aspect-square w-10  text-2xl text-center  transition-colors duration-200 ease-in ${isOpen ? " shadow text-[#525252] border-[#525252] bg-[#FF861A]" :"border-[#FF861A] bg-[#525252] text-[#FF861A]"} shadow-block`}><i className="ri-menu-line"></i></button>
        {links.map((item,index)=>
            (
          <div key={index} className='w-fit bg-[#525252]  flex items-center'>
              <a href={item.link} className={`hover:scale-110 flex items-center justify-center aspect-square w-10 text-2xl text-center border transition-colors duration-200 ease-in  ${isOpen ? " shadow text-[#525252] border-[#525252] bg-[#FF861A]" :"border-[#FF861A] bg-[#525252] text-[#FF861A]"} shadow-block`}><i className={`${item.icon}`}></i></a>
          </div>
            )                
        )}
      </div>

      {/* Slide-in Menu */}
      <div className={` w-[100%] h-screen fixed top-0 left-0 bg-[#525252] p-6 pl-10 transition-all duration-500 ease-in-out ${isOpen ? 'left-[0]' : 'left-[-100vw]'}`}>
        <nav className="flex w-full flex-col text-2xl md:text-5xl gap-2 mt-20">
        {menu.map((item,index)=>
            (
           <a key={index} href={item.link} onClick={()=>(setIsOpen(false))} className="w-full font-bold heading  border-b hover:border-[#FF861A] border-[#525252] text-[#FF861A] ">{item.name}</a>  
            )                
        )} 
        </nav>
      </div>
    </div>
  );
};

export default Menu;