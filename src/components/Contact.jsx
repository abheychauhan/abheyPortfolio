import { useRef } from "react";
import emailjs from "@emailjs/browser";

function Contact() {

  const formref = useRef(null)

  const sendEmail=(e)=>{
       e.preventDefault();
       console.log("aaa")

       emailjs
      .sendForm(
        "service_wmhl6io", // 🔹 Replace with your EmailJS Service ID
        "template_9urjihl", // 🔹 Replace with your Template ID
        formref.current,
        {
          publicKey: "u_r1g_DH6dtUHqQhz", // 🔹 Replace with your Public Key
        }
      )
      .then(
        () => {
          alert("✅ Email sent successfully!");
          e.target.reset();
        },
        (error) => {
          console.error("FAILED...", error);
          alert("❌ Failed to send email. Please try again.");
        }
      );
  }

  return (
    <div className='contact w-full'>
           <p className="text-xl  text-center text-[#525252] mt-5">
            Let’s connect and build something amazing together!
          </p>
      <div className="w-full flex items-start justify-evenly gap-5 md:flex-nowrap flex-wrap mt-30">
        <div className="social w-fit flex flex-col gap-5">
          <h1 className='text-xl text-[#525252]'>Talk to me</h1>
          <div className="info grid gap-4">
            <div className="card w-[300px]  bg-white h-fit border-black rounded-xl p-2">
              <i className="text-lg ri-mail-send-fill"></i>
              <h3 className='text-lg'>Email</h3>
              <div className="flex">

                <span className='mr-2'>abheys172@gmail.com</span>
                <a className='text-blue-500 flex' href="mailto:abheys172@gmail.com">Write me <i className="ri-arrow-right-line"></i></a>
              </div>
            </div>
            <div className="card w-[300px]  bg-white h-fit rounded-xl p-2">
              <i className="text-lg ri-whatsapp-line"></i>
              <h3 className='text-lg'>Whatsapp</h3>
              <div className='flex'>
                <span className='mr-2'>+91 9306634564</span>
                <a className='text-blue-500 flex ' href="https://wa.me/+919306634564" target='_blank'>Write me <i className="ri-arrow-right-line"></i></a>

              </div>
            </div>

          </div>
        </div>
        <div className="write_me md:w-1/2 flex flex-col gap-5  ">
          <h1 className='text-xl text-[#525252]'>Write me your project</h1>
          <form ref={formref} onSubmit={sendEmail} className="relative p-5 rounded-xl bg-white flex flex-col gap-4">
            <div className="border rounded p-2 relative mt-5 border-[#525252]">
              <label className="absolute top-[-30%] bg-white px-2 ">Name</label>
              <input required className="outline-none" type="text" placeholder="enter your name" name="name" />
            </div>
            <div className="border rounded p-2 relative border-[#525252]">
              <label className="absolute top-[-30%] bg-white px-2 ">Mail</label>
              <input required className="outline-none" type="email" placeholder="enter email" name="email" />
            </div>
            <div className="border rounded p-2 relative border-[#525252]">
              <label  className="absolute top-[-10%] bg-white px-2 ">Project</label>
              <textarea
                required
                className="resize-none w-full outline-none"
                name="project"
                cols="30"
                rows="5"
                placeholder="write your project"
              ></textarea>
            </div>
            <div className="flex w-full  justify-center items-center">
            <button className="button cursor-pointer border border-[#525252] text-[#525252] hover:bg-[#FF861A] rounded-lg p-2 px-3  hover:border-[#FF861A] hover:text-white transition-all duration-300" type="submit">
                Submit
            </button>

            </div>
          </form>

        </div>
      </div>
      <footer className="mt-30 text-center md:text-xl text-lg text-gray-800 p-5">
        © {new Date().getFullYear()} Abhey Singh. All rights reserved.
      </footer>

    </div>
  )
}

export default Contact