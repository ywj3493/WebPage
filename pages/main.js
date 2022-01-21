import React, { useEffect, useState } from "react";
import { RangeDatePicker } from "../lib/DatePicker";

function LocationSearch() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    locations = setLocations([1, 2, 3]);
  }, []);

  return (
    <div className="w-500px bg-white p-3 my-3 rounded-2xl">
      {locations.map((value, idx) => (
        <div key={`LocationSearch_${idx}`} className="">
          {value}
        </div>
      ))}
    </div>
  );
}

function CheckInOutDateSearch() {
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();

  useEffect(() => {}, []);

  const today = new Date();
  return <RangeDatePicker date={today}></RangeDatePicker>;
}

function HeadCountSearch(props) {
  const [adultsCount, setAdultsCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);
  const [petsCount, setPetsCount] = useState(0);
  const [sumAdultsChildrenCount, setSumAdultsChildrenCount] = useState(0);

  useEffect(() => {
    setSumAdultsChildrenCount(adultsCount + childrenCount);
    props.setHeadCount(sumAdultsChildrenCount);
  }, [adultsCount, childrenCount]);

  return (
    <div className="w-96 p-3 my-3 justify-self-end bg-white rounded-2xl z-10">
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
        <div>{`총 ${sumAdultsChildrenCount} 명`}</div>
      </div>
    </div>
  );
}

function MainSearchBar() {
  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [headCount, setHeadCount] = useState(0);
  //Pop-up state
  const [popState, setPopState] = useState({
    location: false,
    checkIn: false,
    checkOut: false,
    headCount: false,
  });

  const onClickLocationSearch = () => {
    setPopState({
      location: true,
      checkIn: false,
      checkOut: false,
      headCount: false,
    });
  };

  const onClickCheckInSearch = () => {
    setPopState({
      location: false,
      checkIn: true,
      checkOut: false,
      headCount: false,
    });
  };

  const onClickCheckOutSearch = () => {
    setPopState({
      location: false,
      checkIn: false,
      checkOut: true,
      headCount: false,
    });
  };

  const onClickHeadCountSearch = () => {
    setPopState({
      location: false,
      checkIn: false,
      checkOut: false,
      headCount: true,
    });
  };

  return (
    <>
      <div className="flex-initial max-w-4xl bg-white justify-self-center rounded-lg">
        <div className="flex flex-initial max-w-4xl bg-white content-center rounded-lg">
          <div
            className="max-w-xs rounded-lg flex-auto hover:shadow-md"
            onClick={onClickLocationSearch}
          >
            <div>위치</div>
            <input></input>
          </div>
          <div
            className="max-w-xs rounded-lg flex-auto hover:shadow-md"
            onClick={onClickCheckInSearch}
          >
            <div>체크인</div>
            <input></input>
          </div>
          <div
            className="max-w-xs rounded-lg flex-auto hover:shadow-md"
            onClick={onClickCheckOutSearch}
          >
            <div>체크아웃</div>
            <input></input>
          </div>
          <div
            className="max-w-xs rounded-lg flex-auto hover:shadow-md"
            onClick={onClickHeadCountSearch}
          >
            <div>인원</div>
            <div>{`${headCount}명`}</div>
          </div>
          <button className="w-mb rounded-lg bg-red-400">검색</button>
        </div>
      </div>
      {popState.location ? <LocationSearch /> : null}
      {popState.checkIn || popState.checkOut ? (
        <CheckInOutDateSearch
          isStartDate={popState.checkIn}
          isEndDate={popState.checkOut}
        />
      ) : null}
      {popState.headCount ? (
        <HeadCountSearch setHeadCount={setHeadCount} />
      ) : null}
    </>
  );
}

export default function MainPage() {
  return (
    <div className="bg-black container justify-center">
      <MainSearchBar />
    </div>
  );
}
