'use client';

import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
            <Image
            src="/background.png"
            alt="World map background"
            fill
            className="object-cover"
            />
        </div>
        <div className="absolute top-0 left-20 m-8 z-40">
            <a href="/main" className="text-white font-bold hover:underline">Home</a>
        </div>
        <div className="absolute top-0 right-5 m-8 z-40">
            <a href="/contact" className="text-white font-bold hover:underline">Contact Us</a>
        </div>
        <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
            <div className="absolute top-0 left-9 m-7 z-40">
                <Image
                  src="/home.png"
                  alt="home logo"
                  width={40}
                  height={40}
                />
            </div>
            <div className="absolute top-0 right-9 m-7 z-40">
                <Image
                  src="/home.png"
                  alt="home logo"
                  width={40}
                  height={40}
                />
            </div>
    </div>
  );
}