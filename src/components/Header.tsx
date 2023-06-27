import { useTheme } from "@/store/theme";
import { Button } from "./ui/button";
import { HeroIcon } from "./HeroIcon";
import { useRouter } from "next/router";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useSearch } from "@/store/search";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const isHome = router.pathname === "/";

  return (
    <header
      className={`fixed top-0 z-40 flex h-header w-full items-center justify-between gap-12
        bg-background px-6 ${!isHome ? "drop-shadow-sm" : ""}`}
    >
      <Logo />

      <div className="w-full">
        <div className="flex w-full sm:w-3/5">{!isHome && <Search />}</div>
      </div>

      <ThemeToggle />
    </header>
  );

  function Logo() {
    if (isHome) return <> </>;

    return (
      <button
        onClick={() => {
          router.push("/").catch(console.error);
        }}
        className="transition-all duration-200 ease-in-out hover:scale-105 hover:transform hover:opacity-80"
      >
        <Image
          alt="T3 Logo"
          src={theme == "light" ? "/t3-dark.svg" : "/t3-light.svg"}
          width={50}
          height={50}
        />
      </button>
    );
  }
  function ThemeToggle() {
    return (
      <Button
        onClick={toggleTheme}
        variant="ghost"
        className="h-8 w-8 transition-all duration-200 ease-in-out hover:scale-105 hover:transform hover:opacity-80"
      >
        <HeroIcon
          className="absolute mx-auto my-auto h-8 w-8"
          shape={theme == "light" ? "sun" : "moon"}
        />
      </Button>
    );
  }
}

function Search() {
  const router = useRouter();

  const { setSearchQuery } = useSearch();
  const [query, setQuery] = useState("");

  const searchCallback = () => {
    if (!query) return;

    setSearchQuery(query);
    router
      .push({
        pathname: "/search",
        query: { query },
      })
      .catch(console.error);
  };

  return (
    <>
      <SearchBar
        searchCallback={searchCallback}
        query={query}
        setQuery={setQuery}
        alwaysShowIcons={true}
      />
    </>
  );
}
