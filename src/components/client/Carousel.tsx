"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  responsive: [{ breakpoint: number; settings: { slidesToShow: number } }];
};

export default function Carousel() {
  const pathName = usePathname();
  const settings: SliderProps = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 23000,
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 0,
    swipeToSlide: false,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  if (!pathName.includes("/newsletter")) {
    return (
      <Link href="/newsletter" className="">
        <Slider
          {...settings}
          className="bg-yellow text-center whitespace-nowrap"
        >
          <p className="font-garamond">Sign up to our Newsletter</p>
          <p className="font-title">MARENNE BOOKS</p>
          <p className="font-garamond">Sign up to our Newletter</p>
          <p className="font-title">MARENNE BOOKS</p>
          <p className="font-garamond">Sign up to our Newletter</p>
          <p className="font-title">MARENNE BOOKS</p>
        </Slider>{" "}
      </Link>
    );
  }
}
