'use client';

import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <Image src="/background.png" alt="World map background" fill className="object-cover"/>
      </div>

      <div className="absolute top-0 left-20 m-8 z-40">
        <a href="/" className="inline-block text-white font-bold transition-transform duration-300 transform hover:scale-110">Home</a>
      </div>

      <div className="absolute top-0 left-9 m-7 z-40">
        <Image src="/home.png" alt="home logo" width={40} height={40} className="filter brightness-0 invert"/>
      </div>

      <div className="absolute inset-0 bg-black opacity-20 z-10"></div>

      <div className="relative z-30 flex items-center justify-center min-h-screen animate-slideDown">
        <form className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-lg w-full mx-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Us</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name :</label>
            <input type="text" id="name" name="name" placeholder="Your name" className="mt-1 w-full p-2 border rounded-md text-black" required/>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email :</label>
            <input type="email" id="email" name="email" placeholder="Your email" className="mt-1 w-full p-2 border rounded-md text-black" required/>
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700">Message :</label>
            <textarea id="message" name="message" rows={5} placeholder="Message" className="mt-1 w-full p-2 border rounded-md resize-none text-black" required></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Send</button>
        </form>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 2s ease-out;
        }
      `}</style>

    </div>
  );
}
