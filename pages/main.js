import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useReducer,
  useRef,
} from "react";
import { RangeDatePicker, useOutsideClick } from "../lib/DatePicker";

export const MainSearchContext = createContext();

const mainSearchStateReducer = (state, action) => {
  const { location, checkInDate, checkOutDate, headCount } = state;
  const { type, ...rest } = action;
  switch (type) {
    case "SET_STATE":
      return { ...state, ...rest };
    case "RESET_STATE":
      return {
        location: "",
        checkInDate: null,
        checkOutDate: null,
        headCount: 0,
      };
    default:
      return state;
  }
};

const MainSearchContextProvider = ({ children }) => {
  const [mainSearchState, mainSearchStateDispatch] = useReducer(
    mainSearchStateReducer,
    {
      location: "",
      checkInDate: null,
      checkOutDate: null,
      headCount: 0,
    }
  );
  return (
    <MainSearchContext.Provider
      value={{ mainSearchStateDispatch, mainSearchState }}
    >
      {children}
    </MainSearchContext.Provider>
  );
};

function LocationSearch(props) {
  const [locations, setLocations] = useState([1, 2, 3]);
  const [popState, setPopState] = useState(false);

  const outsideRef = useRef(null);
  useOutsideClick(outsideRef, () => {
    setPopState(false);
  });

  const onClickLocationSearch = () => {
    setPopState(true);
  };

  return (
    <div className={props.className} ref={outsideRef}>
      <div
        className="flex flex-col mx-6 my-2 h-[100%]"
        onClick={onClickLocationSearch}
      >
        <text className="text-xs">위치</text>
        <input></input>
      </div>
      {popState ? (
        <div className="absolute w-[500px] px-6 bg-white rounded-3xl">
          {locations.map((value, idx) => (
            <div key={`LocationSearch_${idx}`} className="">
              {value}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function HeadCountSearch(props) {
  const [popState, setPopState] = useState(false);
  const [adultsCount, setAdultsCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);
  const [petsCount, setPetsCount] = useState(0);
  const [headCount, setHeadCount] = useState(0);

  const outsideRef = useRef(null);
  useOutsideClick(outsideRef, () => {
    setPopState(false);
  });

  const onClickHeadCountSearch = () => {
    setPopState(true);
  };

  useEffect(() => {
    setHeadCount(adultsCount + childrenCount);
  }, [adultsCount, childrenCount]);

  return (
    <div className={props.className}>
      <div className="mx-6 my-2" onClick={onClickHeadCountSearch}>
        <text className="text-xs">인원</text>
        <div className="text-xs">{headCount}명</div>
      </div>
      {popState ? (
        <div
          className="relative top-[1rem] right-[150px] w-96 p-3 my-3 justify-self-end bg-white rounded-3xl z-10"
          ref={outsideRef}
        >
          <div className="border-y-1 border-gray-200">
            <div className="flex m-3 content-center">
              <div className="w-[100%]">
                <div>성인</div>
                <div>만 13세 이상</div>
              </div>
              <button
                className="w-mb h-mb rounded-full border"
                disabled={adultsCount == 0}
                onClick={() => setAdultsCount(adultsCount - 1)}
              >
                -
              </button>
              <div>{adultsCount}</div>
              <button
                className="w-mb rounded-full border"
                onClick={() => setAdultsCount(adultsCount + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="h-px m-3 bg-gray-400"></div>
          <div className="border-y-1 border-gray-200">
            <div className="flex m-3">
              <div className="w-[100%]">
                <div>어린이</div>
                <div>만 2~12세</div>
              </div>
              <button
                class="w-mb rounded-full border"
                disabled={childrenCount == 0}
                onClick={() => setChildrenCount(childrenCount - 1)}
              >
                -
              </button>
              <div>{childrenCount}</div>
              <button
                class="w-mb rounded-full border"
                onClick={() => setChildrenCount(childrenCount + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="h-px m-3 bg-gray-400"></div>
          <div className="border-y-1 border-gray-200">
            <div className="flex m-3">
              <div className="w-[100%]">
                <div>유아</div>
                <div>만 2세 미만</div>
              </div>
              <button
                class="w-mb rounded-full border"
                disabled={infantsCount == 0}
                onClick={() => setInfantsCount(infantsCount - 1)}
              >
                -
              </button>
              <div>{infantsCount}</div>
              <button
                class="w-mb rounded-full border"
                onClick={() => setInfantsCount(infantsCount + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="h-px m-3 bg-gray-400"></div>
          <div className="border-y-1 border-gray-200">
            <div className="flex m-3">
              <div className="w-[100%]">
                <div>반려동물</div>
                <div>도우미 반려동물을 동반하시나요?</div>
              </div>
              <button
                class="w-mb rounded-full border"
                disabled={petsCount == 0}
                onClick={() => setPetsCount(petsCount - 1)}
              >
                -
              </button>
              <div>{petsCount}</div>
              <button
                class="w-mb rounded-full border"
                onClick={() => setPetsCount(petsCount + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MainSearchBar() {
  const { mainSearchState, mainSearchStateDispatch } =
    useContext(MainSearchContext);

  return (
    <div className="flex h-[64px] w-[848px] bg-white rounded-full">
      <LocationSearch className="flex-initial w-[270px] rounded-full hover:shadow-md"></LocationSearch>
      <div className="w-px mx-1 my-4 bg-slate-400"></div>
      <RangeDatePicker
        className="flex-initial w-[360px] rounded-full place-content-center"
        startName="체크인"
        endName="체크아웃"
      ></RangeDatePicker>
      <div className="w-px mx-1 my-4 bg-slate-400"></div>
      <HeadCountSearch className="flex-initial w-[170px] rounded-full hover:shadow-md"></HeadCountSearch>
      <button className="m-1 w-[60px] rounded-full bg-red-400">검색</button>
    </div>
  );
}

export default function MainPage() {
  return (
    <MainSearchContextProvider>
      <div className="flex w-[100%] h-[100%] bg-black place-content-center">
        <MainSearchBar />
      </div>
    </MainSearchContextProvider>
  );
}
