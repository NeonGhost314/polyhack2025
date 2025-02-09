import Image from "next/image";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">

      <div className="absolute inset-0 z-0">
        <Image
          src="/world-map.jpg"
          alt="World map background"
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-black opacity-95 z-10"></div>

      <div className="relative z-20 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-8 row-start-2 items-center justify-center">
          <Image
            src="/image.png"
            alt="Logo BloomWave" 
            width={200} 
            height={200}
            className="mb-4"
          />
          <h1 className="text-6xl sm:text-8xl font-extrabold text-left  text-blue-300">
            BloomWave
          </h1>
        </main>
      </div>
    </div>
  );
}
