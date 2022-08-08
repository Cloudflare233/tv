import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import remarkMath from "remark-math";
import CustomLink from "../../components/CustomLink";
import Layout from "../../components/Layout";
import Image from "next/image";
import { postFilePaths, POSTS_PATH } from "../../utils/mdxUtils";
import { useRouter } from "next/router";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: CustomLink,
  img: Image,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  ReactKatex: dynamic(() => import("@pkasila/react-katex")),
  Head,
};

export default function PostPage({ source, frontMatter }) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <Head>
        <title>{frontMatter.title} | Cloudflare233</title>
        <link
          href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/katex@0.16.0/dist/katex.min.css"
        ></link>
      </Head>
      <div className="max-w-2xl mx-auto p-8 py-8 sm:py-16 sm:p-0">
        <div className="">
          <Link href="/">
            <a className="opacity-50 text-sm">← Go back home</a>
          </Link>
        </div>
        <div className="py-2 border-b dark:border-b-zinc-800 flex flex-row space-x-4 justify-between">
          <span>
            <h1 className="text-base sm:text-lg">{frontMatter.title}</h1>
            <p className="text-xs sm:text-sm opacity-50">
              posted on {frontMatter.date}
            </p>
          </span>
          <span>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="opacity-50 appearance-none bg-white dark:bg-black focus:outline-none text-xs sm:text-sm mt-4 sm:mt-5"
            >
              <option value="light">☀️ Light</option>
              <option value="dark">🌙 Dark</option>
              <option value="system">🖥 System</option>
            </select>
          </span>
        </div>
        <main className="p-3 mt-8">
          <MDXRemote {...source} components={components} />
        </main>
        <div className="flex flex-row space-x-4 border-b dark:border-b-zinc-800 py-3">
          <Link href="/">
            <a className="opacity-50 text-sm">← Go back home</a>
          </Link>
          <Link
            href={`https://github.com/Cloudflare233/blog/tree/master/${router.asPath}.mdx`}
          >
            <a className="opacity-50 text-sm">Edit on GitHub</a>
          </Link>
        </div>
        <h2 className="mt-5 ml-4 font-medium opacity-40 text-xs sm:text-sm">
          Copyright ©️ 2022 Cloudflare233.
        </h2>
      </div>
    </div>
  );
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
