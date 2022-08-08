import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import Head from "next/head";
import { useTheme } from "next-themes";
import { useState } from "react";
import path from "path";
import { postFilePaths, POSTS_PATH } from "../utils/mdxUtils";

function Card({ href, title, key, date, as }) {
  return (
    <Link as={as} href={href}>
      <button
        className="flex flex-row justify-between px-3 border-b dark:border-b-zinc-800 text-left text-sm opacity-80 font-medium transition-all duration-500 py-3"
        key={key}
      >
        <span>{title}</span>
        <span>{date}</span>
      </button>
    </Link>
  );
}

export default function Index({ posts }) {
  const { theme, setTheme } = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const SearchFiltered = posts.filter((post) =>
    post.data.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <div className="max-w-2xl mx-auto p-8 py-8 sm:py-16 sm:p-0">
        <Head>
          <title>Blog | Cloudflare233</title>
        </Head>
        <h1 className="font-medium text-3xl sm:text-4xl mb-2">Blog</h1>
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
          {SearchFiltered.map((post) => (
            <Card
              as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
              key={post.data.id}
              title={post.data.title}
              date={post.data.date}
              href={`/posts/[slug]`}
            />
          ))}
          {!SearchFiltered.length && (
            <p className="text-sm opacity-80 py-3 border-b dark:border-b-zinc-800 font-medium">
              No posts were found.
            </p>
          )}
        </span>
        <center>
          <footer className="flex flex-row space-x-4 mt-4 sm:mt-8 mb-2 sm:mb-4">
            <h2 className="ml-8 font-medium opacity-40 text-xs sm:text-sm">
              Copyright ©️ 2022 Cloudflare233.
            </h2>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="opacity-50 appearance-none bg-white dark:bg-black focus:outline-none text-xs sm:text-sm"
            >
              <option value="light">☀️ Light</option>
              <option value="dark">🌙 Dark</option>
              <option value="system">🖥 System</option>
            </select>
          </footer>
        </center>
      </div>
    </div>
  );
}

export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { posts } };
}
