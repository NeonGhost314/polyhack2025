'use client';

import Image from "next/image";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute top-0 left-8 m-7 z-40">
        <Image
          src="/profile.png"
          alt="Logo BloomWave"
          width={50}
          height={50}
        />
      </div>
      <div className="absolute top-0 left-20 m-8 z-40">
        <a href="/profile" className="text-white font-bold hover:underline">Profile</a>
      </div>
      <div className="absolute top-0 right-5 m-8 z-40">
        <a href="/contact" className="text-white font-bold hover:underline">Contact Us</a>
      </div>

      <div className="absolute inset-0 z-0">
        <Image
          src="/background.png"
          alt="World map background"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
      <div className="relative z-20 items-center min-h-screen p-20 pb-20 gap-15">
        <main className="flex flex-col gap-8 row-start-2 items-center justify-center animate-slideDown1">
          <Image
            src="/logo.png"
            alt="Logo BloomWave"
            width={200} 
            height={200}
            className="mb-4"
          />
          <div className="flex">
            <h1 className="text-6xl sm:text-7xl font-extrabold text-left text-white animate-slideDown2">Bloom</h1>
            <h1 className="text-6xl sm:text-7xl font-extrabold text-left text-blue-400 animate-slideDown2">Wave</h1>
          </div>
          <p className="text-1xl text-center text-white animate-slideDownSlogan animate-slideDown3">A wave of positive change and technological growth.</p>
          <div className="flex gap-7">
              <a href="/main" className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-5 px-20 rounded-lg animate-slideDown3">Start now</a>
              <a href="/profile" className="bg-white hover:bg-gray-300 text-blue-400 font-bold py-5 px-20 rounded-lg animate-slideDown3">Log in</a>
          </div>
        </main>
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
        .animate-slideDown1 {
          animation: slideDown 1s ease-out;
        }
      `}</style>

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
        .animate-slideDown2 {
          animation: slideDown 2s ease-out;
        }
      `}</style>

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
        .animate-slideDown3 {
          animation: slideDown 3s ease-out;
        }
      `}</style>
    </div>
  );
}