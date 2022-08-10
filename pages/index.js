import Head from "next/head";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Transition } from "@headlessui/react";
import Player from "../components/Player";

const data = [
  {
    title: "Beautiful Girl",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZhNDRMUXotX0o3a0ZlR1U_ZT1MZkl0ZTE.mp4",
  },
  {
    title: "Good Morning",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZiU2x0X2c2Q0wzQTRUcjA_ZT1INksxbU8.mp4",
  },
  {
    title: "Singing in the rain",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZielpORmliYnJyUllFZXc_ZT1waEhmdFI.mp4",
  },
  {
    title: "Solders' Dance",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZjeEpueVBfaDk0RC1pUVk_ZT1SWHM2Z1k.mp4",
  },
  {
    title: "GTAIV Opening",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZjYTBMdENkbGt1QTBWdTQ_ZT1HSmwxZGw.mp4",
  },
  {
    title: "Soviet Connection",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZjRkV6TWpEZ1dYMXpNRVk_ZT0yek1GTGw.mp4",
  },
  {
    title: "Make 'Em Laugh",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZidmI3bEYxdTB4di1yMkE_ZT1jZ1dFakY.mp4",
  },
  {
    title: "iPhone SE 2",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3YvcyFBaUV0TzBwNnFvZ1ZjaWlVWk4ydzAtUGFDMVk_ZT1jdm1zNks.mp4",
  },
  {
    title: "Moses Supposes",
    url: "https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBaUV0TzBwNnFvZ1ZiTkFqZlRSVEtXQVFJQUk_ZT16dVNrR0Y.mp4",
  },
];

function Card({ onClick, title, key }) {
  return (
    <button
      className="px-3 border-b dark:border-b-zinc-800 text-left text-sm opacity-80 font-medium transition-all duration-500 py-3"
      key={key}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [style, setStyle] = useState("modern");
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState("");
  const [add, setAdd] = useState(false);
  const [json, setJSON] = useState("");
  const [isPlaying, setIsPlaying] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [addl, setAddl] = useState(false);
  const [playValue, setPlayValue] = useState("/tno.ogg");
  const SearchFiltered = data.filter((data) =>
    data.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <div className="max-w-2xl mx-auto p-8 py-8 sm:py-16 sm:p-0">
        <Head>
          <title>TV | Cloudflare233</title>
        </Head>
        <h1 className="font-medium text-3xl sm:text-4xl mb-2">TV</h1>
        <div className="bg-white dark:bg-black flex opacity-100 flex-row sticky top-0 py-0 sm:py-1 border-b dark:border-b-zinc-800 w-full z-20">
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
              key={item.id}
              title={item.title}
              onClick={() => {
                setPlaying(item.url);
                setIsPlaying(item.title);
                setOpen(true);
              }}
            />
          ))}
          {!SearchFiltered.length && (
            <p className="text-sm opacity-80 py-3 border-b dark:border-b-zinc-800 font-medium">
              No videos were found.
            </p>
          )}
        </span>
        {open === true && (
          <Transition
            show={open}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <>
              <div className="bg-white dark:bg-black text-xs sm:text-sm mt-12 sm:mt-0 absolute top-0 bottom-0 inset-x-0 rounded-lg p-6 sm:p-12 z-30 w-full mx-auto h-full">
                <div className="max-w-2xl mx-auto mt-8 sm:mt-16">
                  <div className="my-5 flex flex-row space-x-4">
                    <button onClick={() => setOpen(false)}>
                      ← Back to index
                    </button>
                    <span className="opacity-60">Now Playing: {isPlaying}</span>
                    <span>
                      <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        className="opacity-50 appearance-none bg-white dark:bg-black focus:outline-none text-xs sm:text-sm"
                      >
                        <option value="light">☀️ Light</option>
                        <option value="dark">🌙 Dark</option>
                      </select>
                    </span>
                  </div>
                  <Player url={playing} />
                </div>
              </div>
            </>
          </Transition>
        )}
        <footer className="bottom-0 sticky flex flex-row space-x-4 mt-4 sm:mt-8 mb-2 sm:mb-4">
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
