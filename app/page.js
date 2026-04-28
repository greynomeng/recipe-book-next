import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <Image
          src="/recipeBook.jpg"
          alt=""
          width={600}
          height={500}
          className="max-w-xl rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Recipes!</h1>
          <p className="py-6">A collection of simple, tasty recipes.</p>
          <Link href="/recipes" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
