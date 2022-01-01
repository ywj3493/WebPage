import Link from "next/link";

export default function MainPage() {
  return (
    <div className="flex-col">
      <div className="bg-gray-500 text-center p-5 rounded-xl text-white ">This is MainPage!</div>
      <div className="flex space-x-5 mt-10">
        <Link href="/public" passHref>
          <button className="underline">Go to Public Page</button>
        </Link>
        <Link href="/private" passHref>
          <button className="underline">Go to Private Page</button>
        </Link>
      </div>
    </div>
  );
}
