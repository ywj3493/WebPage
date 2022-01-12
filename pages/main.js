import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

function LocationSearch() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    locations = setLocations([1, 2, 3]);
  }, []);

  return (
    <div>
      {locations.map((value) => (
        <div>{value}</div>
      ))}
    </div>
  );
}

function CheckInOutDateSearch() {
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  useEffect(() => {}, []);
  return <div></div>;
}

function HeadCountSearch() {
  const [adultsCount, setAdultsCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);
  const [petsCount, setPetsCount] = useState(0);
  const [sumAdultsChildrenCount, setSumAdultsChildrenCount] = useState(0);

  useEffect(() => {
    setSumAdultsChildrenCount(adultsCount + childrenCount);
  }, [adultsCount, childrenCount]);

  return (
    <div className="bg white rounded">
      <div className="border-y-1 border-gray-300">
        <div className="">{"성인"}</div>
        <button
          class="border-1"
          disabled={adultsCount == 0}
          onClick={() => setAdultsCount(adultsCount - 1)}
        >
          -
        </button>
        <div>{adultsCount}</div>
        <button
          class="border-1"
          onClick={() => setAdultsCount(adultsCount + 1)}
        >
          +
        </button>
      </div>
      <div className="border-y-1 border-gray-300">
        <div className="">{"어린이"}</div>
        <button
          class="border-1"
          disabled={childrenCount == 0}
          onClick={() => setChildrenCount(childrenCount - 1)}
        >
          -
        </button>
        <div>{childrenCount}</div>
        <button
          class="border-1"
          onClick={() => setChildrenCount(childrenCount + 1)}
        >
          +
        </button>
      </div>
      <div className="border-y-1 border-gray-300">
        <div className="">{"유아"}</div>
        <button
          class="border-1"
          disabled={infantsCount == 0}
          onClick={() => setInfantsCount(infantsCount - 1)}
        >
          -
        </button>
        <div>{infantsCount}</div>
        <button
          class="border-1"
          onClick={() => setInfantsCount(infantsCount + 1)}
        >
          +
        </button>
      </div>
      <div className="border-y-1 border-gray-300">
        <div className="">{"반려동물"}</div>
        <button
          class="border-1"
          disabled={petsCount == 0}
          onClick={() => setPetsCount(petsCount - 1)}
        >
          -
        </button>
        <div>{petsCount}</div>
        <button class="border-1" onClick={() => setPetsCount(petsCount + 1)}>
          +
        </button>
        <div>{`총 ${sumAdultsChildrenCount} 명`}</div>
      </div>
    </div>
  );
}

function MainSearchBar() {
  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setChectOutDate] = useState("");
  const [headCount, setHeadCount] = useState("");
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

  const onClickHeadCountSearch = () => {
    setPopState({
      location: false,
      checkIn: false,
      checkOut: false,
      headCount: true,
    });
  };

  return (
    <div className="bg-white ">
      <div classNmae="bg-white ">
        <TextField
          label="위치"
          variant="standard"
          onClick={onClickLocationSearch}
        ></TextField>
        <TextField
          label="체크인"
          variant="standard"
          onClick={onClickCheckInSearch}
        ></TextField>
        <TextField
          label="체크아웃"
          variant="standard"
          onClick={setChectOutDate}
        ></TextField>
        <TextField
          label="인원"
          variant="standard"
          onClick={onClickHeadCountSearch}
        ></TextField>
        <button>검색</button>
      </div>
      {popState.location ? <LocationSearch /> : null}
      {popState.checkIn ? <CheckInOutDateSearch /> : null}
      {popState.checkOut ? <CheckInOutDateSearch /> : null}
      {popState.headCount ? <HeadCountSearch /> : null}
    </div>
  );
}

export default function MainPage() {
  return (
    <div className="bg-black container 2xl-auto">
      <MainSearchBar />
    </div>
  );
}
