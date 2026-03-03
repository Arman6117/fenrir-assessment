import LoginCard from "@/components/login-card";
import Logo from "@/components/logo";

export default function Home() {
  return (
    <main className="px-4 sm:px-8 py-4 min-h-screen">
      <Logo />

      <section className="flex ml-10 flex-col lg:flex-row max-w-full mt-12 lg:mt-24 lg:justify-between items-center gap-10 lg:gap-12">
        <div className="hidden lg:flex flex-col flex-1 max-w-xl">
          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-8">
            Expert level Cybersecurity
            <br />
            in {" "}
            <span className="text-primary">hours{" "}</span>
            not weeks.
          </h1>

          <div className="mb-6">
            <p className="text-white font-semibold text-base mb-4">
              What&apos;s included
            </p>
            <ul className="space-y-3">
              {[
                "Effortlessly spider and map targets to uncover hidden security flaws",
                "Deliver high-quality, validated findings in hours, not weeks.",
                "Generate professional, enterprise-grade security reports automatically.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-white/80 text-sm"
                >
                  <span className="text-green-600 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-green-500">★</span>
              <span className="text-white text-sm font-semibold">
                Trustpilot
              </span>
            </div>
            <p className="text-white text-lg">
              <span className="font-bold ">Rated 4.5/5.0</span>{" "}
              <span className="text-white/50 text-[10px] ">(100k+ reviews)</span>
            </p>
          </div>
        </div>

        <LoginCard />
      </section>
    </main>
  );
}
