import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useReducer,
  useRef,
} from "react";
import { RangeDatePicker, useOutsideClick } from "../lib/DatePicker";
import { classnames } from "tailwindcss-classnames";
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
        위치
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
        인원
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
        className="m-1 rounded-full aspect-square bg-red-400"
        onClick={onClickSearch}
      >
        검색
      </button>
    </div>
  );
}

function MainGNB() {
  const [isScrollTop, setIsScrollTop] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const onClickIcon = () => {};

  const onScrollMove = () => {
    if (window.pageYOffset == 0) {
      setIsScrollTop(true);
      return;
    } else if (isScrollTop === true) {
      console.dir(`!isScrollTop`);
      setIsScrollTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScrollMove);

    return () => {
      window.removeEventListener("scroll", onScrollMove);
    };
  }, []);

  return (
    <div
      className={classnames(
        `fixed flex flex-col w-[100%] justify-center z-50 ${
          !isScrollTop ? `bg-white` : `bg-black`
        }`
      )}
    >
      <div
        className={classnames(
          `flex w-[100%] h-[80px] px-[80px] justify-between transition-all duration-500 ${
            !isScrollTop ? `bg-white text-black` : `bg-black text-white`
          }`
        )}
      >
        <div className="flex">
          <button className="flex-start w-[120px]" onClick={onClickIcon}>
            C&Y
          </button>
        </div>
        <div
          className={classnames(
            `flex flex-initial w-[348px] h-[48px] justify-evenly self-center ${
              !isScrollTop ? `mainTabShrink` : ``
            }`
          )}
        >
          <span
            className={classnames(
              `m-1 p-1 content-center border-b-2 ${
                selectedTab == 0 ? `border-white` : `border-black`
              }`
            )}
          >
            숙소
          </span>
          <span
            className={classnames(
              `m-1 p-1 content-center border-b-2 ${
                selectedTab == 1 ? `border-white` : `border-black`
              }`
            )}
          >
            체험
          </span>
          <span
            className={classnames(
              `m-1 p-1 content-center border-b-2 ${
                selectedTab == 2 ? `border-white` : `border-black`
              }`
            )}
          >
            온라인 체험
          </span>
        </div>
        <div className="flex">
          <button className="w-[120px]">호스트 되기</button>
          <button className="w-[40px]">◎</button>
          <div className=""></div>
        </div>
      </div>
      {!isScrollTop ? (
        <div
          className={classnames(
            `fixed flex flex-initial bg-white border-2 rounded-full self-center justify-end w-[300px] h-[48px] ${
              !isScrollTop ? `animate-searchBoxShrink` : `animate-searchBoxGrow`
            }`
          )}
        >
          <button className="m-1 aspect-square rounded-full bg-red-400">
            검색
          </button>
        </div>
      ) : (
        <MainSearchBar />
      )}
    </div>
  );
}

function MainPicture() {
  return (
    <div className="flex flex-initial m-[30px] w-[100%] h-[800px] self-center justify-center">
      <div className="flex flex-initial mx-[30px] w-[1600px] h-[800px] rounded-2xl bg-green-300"></div>
    </div>
  );
}

function MainCard(props) {
  /**
   * TODO : 카드 클릭해서 여행지 검색 되도록 하는 함수 추가
   */
  const onClickCard = () => {};
  return (
    <div className={classnames(props.className)} onClick={onClickCard}>
      <div className="flex w-full h-[50%]"></div>
      <div className="flex flex-col px-[16px] py[24px] w-full h-[50%] font-sans text-white">
        <div className="flex w-full text-[35px]">{props.cardName}</div>
        <div className="flex w-full text-[20px]">font test</div>
      </div>
    </div>
  );
}

function MainCardBoard(props) {
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    setCardList([
      { cardName: `서울`, cardColor: `bg-red-300` },
      { cardName: `인천`, cardColor: `bg-red-400` },
      { cardName: `대구`, cardColor: `bg-red-500` },
      { cardName: `대전`, cardColor: `bg-red-600` },
    ]);
  }, []);

  return (
    <div className="flex flex-initial mx-[30px] w-[100%] bg-white self-center justify-center">
      <div className="flex flex-col flex-initial mx-[30px] pt-[96px] w-[1600px]">
        <div className="p-[8px] text-[42px] font-bold font-sans">
          {props.boardName}
        </div>
        <div
          className={`flex flex-initial w-[100%] bg-white self-center justify-between`}
        >
          {cardList.map((value, idx) => (
            <div className={`flex flex-initial w-[100%] m-[8px]`}>
              <MainCard
                className={classnames(
                  `flex flex-col flex-initial w-[100%] aspect-[3/4] rounded-2xl ${value.cardColor}`
                )}
                cardName={value.cardName}
                key={`mainCard_${idx}`}
              ></MainCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MainPage() {
  return (
    <>
      <div className="flex flex-col w-full bg-black">
        <div className="flex w-full h-[144px]"></div>
        <MainGNB />
        <MainPicture />
        <MainCardBoard boardName="설레는 다음 여행을 위한 아이디어" />
        <div className="flex flex-initial mx-[30px] w-[100%] h-[1200px] bg-white self-center justify-center">
          <div className="flex flex-col flex-initial mx-[30px] pt-[96px] w-[1600px]">
            <div className="p-[8px] text-[42px] font-bold font-sans">
              체험 둘러보기
            </div>
            <div
              className={`flex flex-initial w-[100%] bg-white self-center justify-between`}
            >
              <div className={`flex flex-initial w-[100%] m-[8px]`}>
                <div
                  className={classnames(
                    `flex flex-col flex-initial p-[80px] w-[100%] aspect-[7/8] rounded-2xl bg-green-300`
                  )}
                >
                  <div
                    className={`flex whitespace-pre-line text-white text-[54px]`}
                  >
                    {`여행 중 만나는\n이색적인 즐길 거리`}
                  </div>
                  <button
                    className={`w-[80px] h-[48px] px-[24px] py-[14px] rounded-xl bg-white font-sans font-bold`}
                  >
                    체험
                  </button>
                </div>
              </div>
              <div className={`flex flex-initial w-[100%] m-[8px]`}>
                <div
                  className={classnames(
                    `flex flex-col flex-initial p-[80px] w-[100%] aspect-[7/8] rounded-2xl bg-green-300`
                  )}
                >
                  <div
                    className={`flex whitespace-pre-line text-bold text-white text-[54px]`}
                  >
                    {`집에서 만나는\n다양한 즐길 거리`}
                  </div>
                  <button
                    className={`w-[80px] h-[48px] px-[24px] py-[14px] rounded-xl bg-white font-sans font-bold`}
                  >
                    체험
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-initial mx-[30px] w-[100%] bg-white self-center justify-center">
          <div className="flex flex-col w-[1600px] h-[848px] rounded-2xl bg-green-300">
            <div className="flex flex-col"></div>
          </div>
        </div>
      </div>
    </>
  );
}
