"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { categories } from "@/lib/data";
import Link from "next/link";
import { Button } from "../ui/button";

const ShowCategories = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{ align: "start" }}
      className="w-full max-w-xl mx-auto my-20">
      <CarouselContent>
        {categories.map((category, index) => (
          <CarouselItem
            key={category + index}
            className="md:basis-1/3">
            <Link
              href={`/findjobs?${category}`}
              className="p-1 flex justify-around">
              <Button className="rounded-full bg-black/50 text-green-400 duration-400">
                {category}
              </Button>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ShowCategories;
