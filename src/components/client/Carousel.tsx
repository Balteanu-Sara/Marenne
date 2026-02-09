/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

type SliderProps = {
  arrows: boolean;
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  autoplay: boolean;
  autoplaySpeed: number;
  swipeToSlide: boolean;
  cssEase: string;
};

export default function Carousel() {
  const pathName = usePathname();
  const [slides, setSlides] = useState(5);

  console.log("slides: ", slides);

  useEffect(() => {
    function handleScreenSize() {
      if (window.innerWidth < 500) setSlides(2);
      else if (window.innerWidth < 768) setSlides(3);
      else if (window.innerWidth < 1024) setSlides(4);
      else if (window.innerWidth >= 1024) setSlides(5);
    }

    handleScreenSize();
    window.addEventListener("resize", handleScreenSize);

    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);

  const settings: SliderProps = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 23000,
    slidesToShow: slides,
    autoplay: true,
    autoplaySpeed: 0,
    swipeToSlide: false,
    cssEase: "linear",
  };

  if (
    !pathName.includes("/newsletter") &&
    !(!pathName.endsWith("/books") && pathName.includes("/books"))
  ) {
    return (
      <Link href="/newsletter" className="">
        <Slider
          {...settings}
          className="bg-yellow text-center whitespace-nowrap lg:h-[35px] lg:text-lg"
        >
          <p className="font-garamond translate-y-[0.12em]">
            Sign up to our Newsletter
          </p>
          <p className="font-title">MARENNE BOOKS</p>
          <p className="font-garamond translate-y-[0.12em]">
            Sign up to our Newletter
          </p>
          <p className="font-title">MARENNE BOOKS</p>
          <p className="font-garamond translate-y-[0.12em]">
            Sign up to our Newletter
          </p>
          <p className="font-title ">MARENNE BOOKS</p>
          <p className="font-garamond translate-y-[0.12em]">
            Sign up to our Newletter
          </p>
          <p className="font-title">MARENNE BOOKS</p>
        </Slider>{" "}
      </Link>
    );
  }
}
