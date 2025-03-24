import Image from "next/image";

export default function Home() {
  return (
   <div className="w-full h-screen">
   <video autoPlay loop muted playsInline className="w-full">
      <source src="/frame--d0.mp4" type="video/mp4"/>
   </video>
   </div>
  );
}
