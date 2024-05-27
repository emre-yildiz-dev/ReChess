import { SparklesCore } from "~/components/ui/sparkles";
import { Container } from "./ui/container";

export function RootBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative w-full overflow-hidden rounded-md ">
      <div className="w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={20}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="z-10 relative">{children}</div>
    </div>
  );
}
