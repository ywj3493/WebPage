import MobileSearchNav from "../Search/MobileSearchNav";
import { useState, useEffect } from "react";
import MobileSearchSlide from "../Search/MobileSearchSlide";
export default function MobileNav() {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  document.addEventListener("scroll", function () {
    let scrollY = document.documentElement.scrollTop;
    if (scrollY > 81) setIsScrolledDown(true);
    else setIsScrolledDown(false);
  });
  const onClickSearch = () => {
    console.log("onClickSearch");
    setIsSlideOpen(true);
  };

  return (
    <div>
      <aside className="bg-black flex items-center justify-center py-4 px-6">
        <a className="px-6 text-center">
          <span className="text-white underline text-sm">
            에어비앤비의 코로나19 대응 방안에 대한 최신 정보를 확인하세요.
          </span>
        </a>
      </aside>
      <MobileSearchNav
        onClickSearch={onClickSearch}
        isScrolledDown={isScrolledDown}
      />
      <MobileSearchSlide
        setIsSlideOpen={setIsSlideOpen}
        isSlideOpen={isSlideOpen}
      />
    </div>
  );
}
