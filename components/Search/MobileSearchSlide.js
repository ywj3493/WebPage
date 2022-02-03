import { classnames } from "tailwindcss-classnames";
export default function MobileSearchSlide({ isSlideOpen, setIsSlideOpen }) {
  return (
    <div
      className={classnames(
        isSlideOpen
          ? "transition-height duration-500 ease-in-out bg-white absolute bottom-0 w-full h-full"
          : "transition-height duration-500 ease-in-out bg-white absolute bottom-0 w-full h-0"
      )}
    >
      <button onClick={() => setIsSlideOpen(false)}>go back</button>
    </div>
  );
}
