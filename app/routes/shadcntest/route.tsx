import { Button } from "~/components/ui/button";

export default function Index() {
  return (
    <div className="h-screen bg-slate-700 flex justify-center items-center">
      <h2 className="text-blue-600 font-extrabold text-5xl">
        TailwindCSS Is Working!
      </h2>
      <Button onClick={() => console.log("clicked")}>Click me</Button>
    </div>
  );
}
