import Image from "next/image";
import Link from "next/link";

type Props = {
  name: string;
  slug: string;
  img: string;
};

export default function CategoryCard({ name, slug, img }: Props) {
  return (
    <Link href={`/categories/${slug}`}>
      <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
        <Image src={img} alt={name} fill className="object-cover" />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xl font-semibold capitalize">
          {name}
        </div>
      </div>
    </Link>
  );
}
