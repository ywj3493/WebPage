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
          onClick={setHeadCount}
        ></TextField>
        <button>검색</button>
      </div>
      {popState.location ? <LocationSearch /> : null}
      {popState.checkIn ? <CheckInOutDateSearch /> : null}
      {popState.checkOut ? <CheckInOutDateSearch /> : null}
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
