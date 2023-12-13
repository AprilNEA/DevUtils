import Link from "next/link";
import meta from "./meta.json";

export default function Home() {
  return (
    <div>
      {Object.keys(meta).map((key) => (
        <Link href={key} key={key}>
          {(meta as any)[key].title}
        </Link>
      ))}
    </div>
  );
}
