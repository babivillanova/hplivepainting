import Image from "next/image";

export default function Home() {
  return (
   <div className="w-full h-screen relative">
    <div className="w-full h-full z-10">
      Sou uma TV velha
      <Image src="/frame2.png" alt="frame" fill className="object-cover"/>
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <video autoPlay loop muted playsInline className="w-[96%] ">
        <source src="/frame--d0.mp4" type="video/mp4"/>
      </video>
    </div>
   </div>
  );
}
