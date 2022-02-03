import { classnames } from "tailwindcss-classnames";

export default function MobileSearchNav({ onClickSearch, isScrolledDown }) {
  return (
    <div
      className={classnames(
        isScrolledDown ? "px-6 py-6 bg-black" : "px-6 py-6 bg-blue"
      )}
    >
      <div className="rounded-[24px] bg-slate-200 h-[48px] flex justify-center items-center">
        <button onClick={onClickSearch}>
          <div className="flex">어디로 여행가세요?</div>
        </button>
      </div>
    </div>
  );
}
