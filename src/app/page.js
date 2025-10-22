import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"], // or any of the available weights
});

export default function Home() {
  return (
    <div className="bg-black h-full p-10">
      <div className="p-10 max-w-[1200px] mx-auto bg-white rounded">
        <h1 className={`text-3xl font-bold  ${poppins.className} `}>
          Next js!
        </h1>
      </div>
    </div>
  );
}
