'use client';

import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <Image src="/background.png" alt="World map background" fill className="object-cover"/>
      </div>

      <div className="absolute top-0 left-20 m-8 z-40">
        <a href="/" className="text-white font-bold hover:underline">Home</a>
      </div>

      <div className="absolute top-0 right-0 m-8 z-40">
        <a href="/contact" className="text-white font-bold hover:underline">Contact Us</a>
      </div>

      <div className="absolute inset-0 bg-black opacity-20 z-10"></div>

      <div className="absolute top-0 left-9 m-7 z-40">
        <Image src="/home.png" alt="home logo" width={40} height={40}/>
      </div>

      <div className="absolute top-0 right-20 m-6 z-40">
        <Image src="/note.png" alt="profile logo" width={40} height={40}/>
      </div>

      <div className="relative z-30 flex items-center justify-center min-h-screen">
        <form className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-lg w-full mx-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Your profile</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email :</label>
            <input type="email" id="email" name="email" placeholder="Your email" className="mt-1 w-full p-2 border rounded-md text-black" required/>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password :</label>
            <input type="password" id="password" name="password" placeholder="Password" className="mt-1 w-full p-2 border rounded-md text-black" required/>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Register</button>
        </form>
      </div>
    </div>
  );
}
