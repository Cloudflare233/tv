import Head from "next/head";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Transition } from "@headlessui/react";
import Player from "../components/Player";
import Link from "next/link";

const data = [
  {
    title: "百 变 法 君",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZnUlk5N09OLU5Xc3BxN2hFP2U9alk5YXhQ.mp4",
    tag: "f",
  },
  {
    title: "iPhone SE 2",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZjaWlVWk4ydzAtUGFDMVk_ZT1jdm1zNks.mp4",
    tag: "f",
  },
  {
    title: "The Street of World War II",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZnU0t2MFg5RHFPamlOd3lCP2U9OTluZFRq.mp4",
    tag: "f",
  },
  {
    title: "You Were Meant for Me",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZnUjdVX21XRzJjUjBuenZBP2U9cDBjZlNz.mp4",
    tag: "m",
  },
  {
    title: "Beautiful Girl",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZnUnJVc3BlNk9KQ2hDRFd1P2U9MGdBMWZm.mp4",
    tag: "m",
  },
  {
    title: "Good Morning",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZnUnV5cmdVejA4OVZkRS1YP2U9RVlBdWRs.mp4",
    tag: "m",
  },
  {
    title: "Singing in the rain",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZnUjIxVE1Nc2dJb01vck5DP2U9dlcxWk1B.mp4",
    tag: "m",
  },
  {
    title: "Make 'Em Laugh",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZnUnlCai1ZaUh6cXlGRGZzP2U9VHFDRGpn.mp4",
    tag: "m",
  },
  {
    title: "Moses Supposes",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZnUmpUT0dPbFVTamw5RE1rP2U9S093eEV3.mp4",
    tag: "m",
  },
  {
    title: "Alaska Airlines Flight 261",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZnUmRaUzZMRzh3ZTlxVTlCP2U9blNzN0Ny.mp4",
    tag: "d",
  },
  {
    title: "S76-B",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZnUlhpeWdGUGdJT3ZCRVREP2U9QlhVeFVv.mp4",
    tag: "d",
  },
  {
    title: "B-2",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZnUl9HcEU0MjlqSzZMaHlMP2U9MzFncWM1.mp4",
    tag: "d",
  },
  {
    title: "Soldiers' Dance",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZnUl9HcEU0MjlqSzZMaHlMP2U9RW03WXFN.mp4",
    tag: "d",
  },
  {
    title: "Fastest Complete GTAIV's Missions",
    url: "https://link.jscdn.cn/sharepoint/aHR0cHM6Ly8ydHFjc3YtbXkuc2hhcmVwb2ludC5jb20vOnY6L2cvcGVyc29uYWwvYW5kcmV3XzJ0cWNzdl9vbm1pY3Jvc29mdF9jb20vRVRLeTlhcWRXSmRJc25UbjNnLVAzeWtCcHBfb3M1RGxCZ2VOZU9PMHdxTWtwdz9lPTIxcXZ4Yw.mp4",
    tag: "g",
  },
  {
    title: "GTAIV Opening",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZjYTBMdENkbGt1QTBWdTQ_ZT1HSmwxZGw.mp4",
    tag: "g",
  },
  {
    title: "Soviet Connection",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZnU0JFemVrU1JOd3MybWRGP2U9WEdrdHBG.mp4",
    tag: "g",
  },
];

function Card({ onClick, title, tag, key }) {
  return (
    <button
      className="hover:scale-[1.015] flex flex-row justify-between px-3 border-b dark:border-b-zinc-800 text-left text-sm opacity-80 font-medium transition-all duration-500 py-3"
      onClick={onClick}
      key={key}
    >
      <span className="flex flex-row space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-75 h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
        {title}
      </span>
      <span>
        {tag === "top" && (
          <div className="opacity-75 text-xs sm:text-sm">Most Popular</div>
        )}
        {tag === "m" && (
          <div className="opacity-50 text-xs sm:text-sm">Movie</div>
        )}
        {tag === "g" && (
          <div className="opacity-50 text-xs sm:text-sm">Game</div>
        )}
        {tag === "d" && (
          <div className="opacity-50 text-xs sm:text-sm">Documentary</div>
        )}
        {tag === "f" && (
          <div className="opacity-50 text-xs sm:text-sm">Famous</div>
        )}
      </span>
    </button>
  );
}

function Suggestion({ onClick, title, tag, key }) {
  return (
    <button
      className="hover:scale-[1.015] flex flex-row justify-between px-3 border-b dark:border-b-zinc-800 text-left text-sm sm:text-base opacity-60 font-medium transition-all duration-500 py-4"
      onClick={onClick}
      key={key}
    >
      <span className="flex flex-row space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-75 h-5 w-5 mr-2 mt-0 sm:mt-0.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
        {title}
      </span>
      <span className="text-sm sm:text-base">
        {tag === "top" && <div className="opacity-75 ">Most Popular</div>}
        {tag === "m" && <div className="opacity-50 ">Movie</div>}
        {tag === "g" && <div className="opacity-50">Game</div>}
        {tag === "d" && <div className="opacity-50 ">Documentary</div>}
        {tag === "f" && <div className="opacity-50 ">Famous</div>}
      </span>
    </button>
  );
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [tag, setTag] = useState("");
  const [openv, setOpenV] = useState(false);
  const [playing, setPlaying] = useState("");
  const [isPlaying, setIsPlaying] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [donate, setDonate] = useState(true);
  const SearchFiltered = data.filter((data) =>
    data.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <div className="max-w-2xl mx-auto p-8 py-8 sm:py-16 sm:p-0">
        <Head>
          <title>TV | Cloudflare233</title>
        </Head>
        <h1 className="text-center font-black text-2xl sm:text-3xl mb-2">
          TV.CF233.GA
        </h1>
        <div
          className={cn(
            "text-sm flex flex-row space-x-4 justify-center bg-white dark:bg-black  border-b py-3 z-50 dark:border-b-zinc-800 sticky top-0",
            openv === false ? "block" : "hidden"
          )}
        >
          <button
            onClick={() => open("https://cf233.ga")}
            className="opacity-60 transition-all duration-500 hover:scale-[1.02] hover:opacity-100"
          >
            Home
          </button>
          <button
            onClick={() => open("https://blog.cf233.ga")}
            className="opacity-60 transition-all duration-500 hover:scale-[1.02] hover:opacity-100"
          >
            Blog
          </button>
          <button
            onClick={() => open("https://music.cf233.ga")}
            className="opacity-60 transition-all duration-500 hover:scale-[1.02] hover:opacity-100"
          >
            Music
          </button>
          <button className="opacity-100 hover:scale-[1.02] transition-all duration-500">
            TV
          </button>
          <button
            className="opacity-60 transition-all duration-500 hover:scale-[1.02] hover:opacity-100"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <>Light</> : <>Dark</>}
          </button>
        </div>
        {donate === true && (
          <div
            className={cn(
              "sticky top-[2.55rem] py-1 border-b dark:border-b-zinc-800 bg-white dark:bg-black z-50",
              openv === false ? "block" : "hidden"
            )}
          >
            <Link href="itmss://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/buyCharityGiftWizard?charity=10220">
              <div className="cursor-pointer flex flex-col sm:flex-row space-y-5 sm:space-y-2 space-x-8 bg-white dark:bg-black p-4 sm:p-8 my-4">
                <img
                  src={theme === "light" ? "/ukraine.png" : "/ukraine_dark.png"}
                  className="w-36 mx-auto sm:w-48"
                />
                <span className="text-xs sm:text-sm text-blue-500 underline">
                  Donate to support families affected by the war in Ukraine,
                  Fight for freedom ↗
                </span>
              </div>
            </Link>
            <button onClick={() => setDonate(false)}>
              <span className="absolute -mt-36 right-8 text-sm  sm:text-base opacity-50">
                [x]
              </span>
            </button>
          </div>
        )}
        {donate === false && (
          <div
            onClick={() => setDonate(true)}
            className={cn(
              "cursor-pointer flex flex-row justify-center mx-auto inset-x-0 sticky top-[2.55rem] border-b dark:border-b-zinc-800 py-2 text-xs sm:text-sm dark:text-zinc-400 text-zinc-600 bg-white dark:bg-black z-50",
              openv === false ? "block" : "hidden"
            )}
          >
            🇺🇦 Support the war in ukraine, fight for freedom.
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:w-5 sm:h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        )}
        <div className="bg-white dark:bg-black flex opacity-100 flex-row py-0 sm:py-1 border-b dark:border-b-zinc-800 w-full z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mt-[1.15rem] sm:mt-[1.9rem] ml-3 absolute opacity-80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="hover:border-zinc-800 dark:hover:border-zinc-500 dark:focus:border-zinc-300 dark:border-zinc-800 dark:bg-black focus:border-black focus:outline-none border opacity-70 rounded-lg px-10 py-2 text-sm my-2 sm:my-5 w-full sm:w-3/4"
            placeholder="Search..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <span className="mt-6 flex flex-col space-y-4 text-left mb-3">
          {SearchFiltered.map((item) => (
            <Card
              key={item.url}
              title={item.title}
              tag={item.tag}
              onClick={() => {
                setPlaying(item.url);
                setIsPlaying(item.title);
                setTag(item.tag);
                setOpenV(true);
              }}
            />
          ))}
          {!SearchFiltered.length && (
            <p className="text-sm opacity-80 py-3 border-b dark:border-b-zinc-800 font-medium">
              No videos were found.
            </p>
          )}
        </span>
        {openv === true && (
          <Transition
            show={openv}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <>
              <div className="bg-white dark:bg-black text-xs sm:text-sm sm:mt-0 fixed top-0 bottom-0 inset-x-0 rounded-lg p-4 sm:p-12 z-30 w-full mx-auto min-h-screen overflow-y-auto">
                <div className="max-w-2xl sm:max-w-3xl mx-auto mt-8">
                  <div className="my-5 flex flex-row space-x-4">
                    <button onClick={() => setOpenV(false)}>
                      ← Back to index
                    </button>
                    <span className="opacity-60">Now Playing: {isPlaying}</span>
                  </div>
                  <div className="opacity-75 border dark:border-zinc-800 text-xs sm:text-sm bg-zinc-100 dark:bg-zinc-900 rounded-lg my-4 px-8 py-2">
                    Important: If you cannot exit fullscreen, try doublepress
                    the "ESC" or "Back" button.
                  </div>
                </div>
                <Player url={playing} />
                <div className="p-4 max-w-2xl sm:max-w-3xl mx-auto">
                  <p className="text-sm sm:text-base opacity-60 my-3">
                    According to this video, you may also like:
                  </p>
                  {SearchFiltered.map((item) => (
                    <>
                      {" "}
                      {tag === item.tag && isPlaying !== item.title && (
                        <div className="max-w-2xl sm:max-w-3xl mx-auto flex flex-col space-y-4">
                          <Suggestion
                            title={item.title}
                            tag={item.tag}
                            key={item.url}
                            onClick={() => {
                              setPlaying(item.url);
                              setIsPlaying(item.title);
                              setTag(item.tag);
                            }}
                          />
                        </div>
                      )}
                    </>
                  ))}
                  <div className="my-4" />
                  <Link href="itmss://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/buyCharityGiftWizard?charity=10220">
                    <div className="cursor-pointer flex flex-col sm:flex-row space-y-5 sm:space-y-2 space-x-8 bg-white dark:bg-black p-4 sm:p-8 my-4">
                      <img
                        src={
                          theme === "light"
                            ? "/ukraine.png"
                            : "/ukraine_dark.png"
                        }
                        className="w-36 mx-auto sm:w-48"
                      />
                      <span className="text-xs sm:text-sm text-blue-500 underline">
                        Donate to support families affected by the war in
                        Ukraine, Fight for freedom ↗
                      </span>
                    </div>
                  </Link>
                  <footer className="bg-white dark:bg-black bottom-0 flex flex-row space-x-4 mt-4 sm:mt-8 mb-2 sm:mb-4 border-t dark:border-t-zinc-800 px-4 py-8">
                    <h2 className="font-medium opacity-40 text-xs sm:text-sm">
                      Copyright ©️ 2022 Cloudflare233.
                    </h2>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="opacity-50 appearance-none bg-white dark:bg-black focus:outline-none text-xs sm:text-sm"
                    >
                      <option value="light">☀️ Light</option>
                      <option value="dark">🌙 Dark</option>
                    </select>
                  </footer>
                </div>
              </div>
            </>
          </Transition>
        )}
        <footer className="bg-white dark:bg-black bottom-0 flex flex-row space-x-4 mt-4 sm:mt-8 mb-2 sm:mb-4 border-t dark:border-t-zinc-800 px-4 py-8">
          <h2 className="font-medium opacity-40 text-xs sm:text-sm">
            Copyright ©️ 2022 Cloudflare233.
          </h2>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="opacity-50 appearance-none bg-white dark:bg-black focus:outline-none text-xs sm:text-sm"
          >
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
          </select>
        </footer>
      </div>
    </div>
  );
}
