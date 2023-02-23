import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { GetServerSideProps } from "next";
// import "semantic-ui-ember";

interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: string;
}

interface IndexPageProps {
  initialCatImageUrl: string;
}

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = await res.json();
  // console.log(result[0]);
  return result[0];
};

export default function Home({ initialCatImageUrl }: IndexPageProps) {
  const [catImageUrl, setcatImageUrl] = useState(initialCatImageUrl);

  const handleClick = async () => {
    const catImage = await fetchCatImage();
    setcatImageUrl(catImage.url);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>猫画像アプリ</h1>
      <img src={catImageUrl} width={400} height="auto" />
      <button style={{ marginTop: "18px" }} onClick={handleClick}>
        今日の猫さん
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async (
  context
) => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImage.url,
    },
  };
};
