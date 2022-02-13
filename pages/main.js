import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useReducer,
  useRef,
} from "react";
import { RangeDatePicker, useOutsideClick } from "../lib/DatePicker";
import { ReactComponent as Globe } from "../images/globe.svg";

export const MainSearchContext = createContext();

function LocationSearch(props) {
  const [locations, setLocations] = useState([1, 2, 3]);
  const [popState, setPopState] = useState(false);
  const { location, setLocation } = props.locationState;

  const outsideRef = useRef(null);
  useOutsideClick(outsideRef, () => {
    setPopState(false);
  });

  const onClickLocationSearch = () => {
    setPopState(true);
  };

  const onClickLocationResult = (value) => {
    setLocation(value);
    setPopState(false);
  };

  return (
    <div className={props.className} ref={outsideRef}>
      <div
        className="flex flex-col mx-6 my-2 h-[100%]"
        onClick={onClickLocationSearch}
      >
        <text className="text-xs">위치</text>
        <input value={location}></input>
      </div>
      {popState ? (
        <div className="absolute w-[500px] px-6 bg-white rounded-3xl">
          {locations.map((value, idx) => (
            <div
              key={`LocationSearch_${idx}`}
              className=""
              onClick={onClickLocationResult}
            >
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
  // const [headCount, setHeadCount] = useState(0);
  const { headCount, setHeadCount } = props.headCountState;

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
                className="flex-none w-[26px] h-[26px] rounded-full border self-center"
                disabled={adultsCount == 0}
                onClick={() => setAdultsCount(adultsCount - 1)}
              >
                -
              </button>
              <div className="mx-1 self-center">{adultsCount}</div>
              <button
                className="flex-none w-[26px] h-[26px] rounded-full border self-center"
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
                className="flex-none w-[26px] h-[26px] rounded-full border self-center"
                disabled={childrenCount == 0}
                onClick={() => setChildrenCount(childrenCount - 1)}
              >
                -
              </button>
              <div className="mx-1 self-center">{childrenCount}</div>
              <button
                className="flex-none w-[28px] h-[28px] rounded-full border self-center"
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
                className="flex-none w-[26px] h-[26px] rounded-full border self-center"
                disabled={infantsCount == 0}
                onClick={() => setInfantsCount(infantsCount - 1)}
              >
                -
              </button>
              <div className="mx-1 self-center">{infantsCount}</div>
              <button
                className="flex-none w-[26px] h-[26px] rounded-full border self-center"
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
                class="flex-none w-[26px] h-[26px] rounded-full border self-center"
                disabled={petsCount == 0}
                onClick={() => setPetsCount(petsCount - 1)}
              >
                -
              </button>
              <div className="mx-1 self-center">{petsCount}</div>
              <button
                class="flex-none w-[26px] h-[26px] rounded-full border self-center"
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
  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [headCount, setHeadCount] = useState(0);

  const onClickSearch = () => {
    console.dir(
      `위치 : ${location}, 체크인 : ${checkInDate}, 체크아웃 : ${checkOutDate}, 인원 : ${headCount}`
    );
  };

  return (
    <div className="flex flex-initial h-[64px] w-[850px] bg-white rounded-full self-center">
      <LocationSearch
        className="flex-initial w-[270px] rounded-full hover:shadow-md"
        locationState={{ location: location, setLocation: setLocation }}
      ></LocationSearch>
      <div className="w-px mx-1 my-4 bg-slate-400"></div>
      <RangeDatePicker
        className="flex flex-initial flex-col w-[360px] rounded-full content-center"
        startName="체크인"
        endName="체크아웃"
        startState={{
          startDate: checkInDate,
          setStartDate: (value) => setCheckInDate(value),
        }}
        endState={{
          endDate: checkOutDate,
          setEndDate: (value) => setCheckOutDate(value),
        }}
      ></RangeDatePicker>
      <div className="w-px mx-1 my-4 bg-slate-400"></div>
      <HeadCountSearch
        className="flex-initial w-[170px] rounded-full hover:shadow-md"
        headCountState={{ headCount: headCount, setHeadCount: setHeadCount }}
      ></HeadCountSearch>
      <button
        className="m-1 w-[60px] rounded-full bg-red-400"
        onClick={onClickSearch}
      >
        검색
      </button>
    </div>
  );
}

function SmallMainSearchBar() {
  return (
    <div
      className="flex flex-initial w-[850px] h-[64px] bg-white rounded-full self-center
    "
    ></div>
  );
}

function MainGNB() {
  const [isDown, setIsDown] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const onClickIcon = () => {};

  return (
    <>
      <div className="flex w-[100%] h-[80px] px-[80px] justify-between bg-white z-50">
        <div className="flex">
          <button className="flex-start w-[120px]" onClick={onClickIcon}>
            C&Y
          </button>
        </div>
        <div className="flex flex-initial w-[348px] h-[48px] justify-evenly self-center">
          <span className="m-1 p-1 content-center border-b-2 border-black">
            숙소
          </span>
          <span className="m-1 p-1 content-center border-b-2 border-black">
            체험
          </span>
          <span className="m-1 p-1 content-center border-b-2 border-black">
            온라인 체험
          </span>
        </div>
        <div className="flex">
          <button className="w-[120px]">호스트 되기</button>
          <button className="w-[40px]">◎</button>
          <div className=""></div>
        </div>
      </div>
      <MainSearchBar />
    </>
  );
}

function MainPicture() {
  return (
    <div className="flex flex-initial m-[30px] w-[100%] h-[800px] self-center">
      <div className="flex flex-initial mx-[30px] w-[1600px] h-[800px] bg-green-300 self-center"></div>
    </div>
  );
}

export default function MainPage() {
  return (
    <>
      <div className="flex flex-col w-[100%] bg-black">
        <MainGNB />
        <MainPicture />
      </div>
      <div className=""></div>
    </>
  );
}
