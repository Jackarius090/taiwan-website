import Image from "next/image";

export default function mapgame() {
  return (
    <div className="flex justify-center items-center h-screen bg-amber-200">
      <div className="bg-blue-200">
        <Image
          src="/tw.svg"
          alt="tw-map"
          width={0}
          height={0}
          className="m-auto w-3/4 h-auto"
        />
      </div>
    </div>
  );
}
