import Feed from "@components/Feed";
import Nav from "@components/Nav";
import { Post } from "@utils/type";
import React from "react";

type Props = {};

const Home = (props: Props) => {

  return (
    <section className="p-4 flex-col">
      <h4 className="text-4xl text-center">Discover & Share</h4>
      <h3 className="text-orange-500 text-3xl text-center">
        AI-Powered Prompts
      </h3>
      <br />
      <p className="text-center">
        Promptopia is an open-source AI-powered prompt generation engine.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
