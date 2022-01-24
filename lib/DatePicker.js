import { useState, useEffect, useContext, useRef } from "react";

function isDateEqual(date1, date2) {
  if (!(date1 == undefined || date2 == undefined)) {
    return (
      date1.getFullYear() == date2.getFullYear() &&
      date1.getMonth() == date2.getMonth() &&
      date1.getDate() == date2.getDate()
    );
  } else return false;
}

function useOutsideClick(ref, onClickOutsideFunc) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutsideFunc();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function Calendar(props) {
  const calDate = props.date;

  const year = calDate.getFullYear();
  const month = calDate.getMonth();
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);

  const today = new Date();

  const monthDateList = [];
  for (let d = new Date(firstDate); d <= lastDate; d.setDate(d.getDate() + 1)) {
    if (d.getDay() == 0 || d.getDate() == 1) {
      monthDateList.push(new Date(d.getFullYear(), d.getMonth(), d.getDate()));
    }
  }

  return (
    <table className="m-3">
      <thead>
        <tr>
          {["일", "월", "화", "수", "목", "금", "토"].map((value) => (
            <th>{value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {monthDateList.map((date) => {
          let week = [0, 0, 0, 0, 0, 0, 0];
          let currWeekDate = date;
          while (currWeekDate.getMonth() <= month) {
            week[currWeekDate.getDay()] = new Date(currWeekDate);
            if (currWeekDate.getDay() == 6) break;
            currWeekDate.setDate(currWeekDate.getDate() + 1);
          }
          return (
            <tr>
              {week.map((date) => {
                return date.getDate ? (
                  <td>
                    <button
                      className={
                        (isDateEqual(date, props.startDate)
                          ? "bg-black"
                          : isDateEqual(date, props.endDate)
                          ? "bg-black"
                          : "bg-white") +
                        " rounded-full border-0 disabled:bg-gray-400 hover:border-2"
                      }
                      disabled={date < today}
                      onClick={() => {
                        props.onClickCalendarDate(date);
                      }}
                    >
                      {date.getDate()}
                    </button>
                  </td>
                ) : (
                  <td> </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function RangeDatePicker(props) {
  const [dpDate, setDpDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [popState, setPopState] = useState(false);
  const [isStartDate, setIsStartDate] = useState(false);

  const year = dpDate.getFullYear();
  const month = dpDate.getMonth();
  const nextMonthDate = new Date(year, month + 1, 1);

  const outsideRef = useRef(null);
  useOutsideClick(outsideRef, () => {
    setPopState(false);
  });

  const onClickNextMonth = () => {
    setDpDate(new Date(year, month + 1, 1));
  };

  const onClickPrevMonth = () => {
    setDpDate(new Date(year, month - 1, 1));
  };

  const onClickStartDate = () => {
    setPopState(true);
    setIsStartDate(true);
  };

  const onClickEndDate = () => {
    setPopState(true);
    setIsStartDate(false);
  };

  const onClickCalendarDate = (date) => {
    if (isStartDate) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  return (
    <div className="w-80">
      <div className="flex bg-white">
        <div className="max-w-xs rounded-lg flex-auto hover:shadow-md">
          <div>{props.startName}</div>
          <input value={startDate} onClick={onClickStartDate}></input>
        </div>
        <div className="w-px bg-gray-500"> </div>
        <div className="max-w-xs rounded-lg flex-auto hover:shadow-md">
          <div>{props.endName}</div>
          <input value={endDate} onClick={onClickEndDate}></input>
        </div>
      </div>
      {popState ? (
        <div className="m-3 bg-white rounded-lg" ref={outsideRef}>
          <div className="flex">
            <button className="m-3" onClick={onClickPrevMonth}>
              &lt;
            </button>
            <div className="m-3">{`${year}년 ${month + 1}월`}</div>
            <div className="m-3">{`${nextMonthDate.getFullYear()}년 ${
              nextMonthDate.getMonth() + 1
            }월`}</div>
            <button className="m-3" onClick={onClickNextMonth}>
              &gt;
            </button>
          </div>
          <div className="flex content-center">
            <Calendar
              className="m-3"
              date={new Date(dpDate)}
              onClickCalendarDate={onClickCalendarDate}
              startDate={startDate}
              endDate={endDate}
            ></Calendar>
            <Calendar
              className="m-3"
              date={new Date(dpDate.getFullYear(), dpDate.getMonth() + 1)}
              onClickCalendarDate={onClickCalendarDate}
              startDate={startDate}
              endDate={endDate}
            ></Calendar>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export { Calendar, RangeDatePicker, useOutsideClick };
