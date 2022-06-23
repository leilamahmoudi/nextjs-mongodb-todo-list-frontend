import { useRouter } from "next/router";

export default function Toolbar() {
  const router = useRouter();
  return (
    <div className="main_toolbar">
      <div onClick={() => router.push("/")}>Home</div>
      <div onClick={() => router.push("/todos")}>Todo List</div>
      <div
        onClick={() => (window.location.href = "https://twitter.com/leillonn")}
      >
        Twitter
      </div>
      <div
        onClick={() =>
          (window.location.href =
            "https://www.linkedin.com/in/leila-mahmoudi-96a417202/")
        }
      >
        linkedin
      </div>
    </div>
  );
}
