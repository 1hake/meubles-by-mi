import React from "react";
import useCategorie from "../hooks/useCategorie";
import { useParams } from "react-router-dom";
import { DisplayCategory } from "../components/DisplayCategorie";
import { SectionTitle } from "../components/SectionTitle";

export const Category = () => {
  const params = useParams();
  if (!params) {
    return <div>404</div>;
  }
  return (
    <section className="py-8 col-span-10 col-start-2 col-end-12">
      <SectionTitle id="showcase">
        {params.category?.toUpperCase()}
      </SectionTitle>
      <main className="py-8  grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 w-full">
        <DisplayCategory
          limit={false}
          category={params.category}
        ></DisplayCategory>
      </main>
    </section>
  );
};
