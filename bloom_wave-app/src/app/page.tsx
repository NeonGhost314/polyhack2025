import Image from "next/image";

export default function HomePage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <Image
          src="globe.svg"
          alt="Logo BloomWave" 
          width={400} 
          height={200}
          className="mb-4"
        />
        <h1 className="text-6xl sm:text-8xl font-extrabold text-center">
          BloomWave
        </h1>
      </main>
    </div>
  );
}