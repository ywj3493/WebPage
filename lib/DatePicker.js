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
  const disableDate = props.disableDate;

  const year = calDate.getFullYear();
  const month = calDate.getMonth();
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);

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
                    <div
                      className={
                        date >= props.startDate && date <= props.endDate
                          ? "w-[100%] h-[100%] p-2 bg-gray-400"
                          : "w-[100%] h-[100%] p-2"
                      }
                    >
                      <button
                        className={
                          isDateEqual(date, props.startDate)
                            ? "bg-red-400 h-4 w-4 p-2 rounded-full border-0 text-sm text-center text-white disabled:bg-gray-400 hover:shadow-md"
                            : isDateEqual(date, props.endDate)
                            ? "bg-red-400 h-4 w-4 p-2 rounded-full border-0 text-sm text-center text-white disabled:bg-gray-400 hover:shadow-md"
                            : "h-4 w-4 p-2 rounded-full border-0 text-sm text-center disabled:bg-gray-400 hover:shadow-md"
                        }
                        disabled={date < disableDate}
                        onClick={() => {
                          props.onClickCalendarDate(date);
                        }}
                      >
                        {date.getDate()}
                      </button>
                    </div>
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
  const [onStartDate, setOnStartDate] = useState(false);
  const [onEndDate, setOnEndDate] = useState(false);

  const year = dpDate.getFullYear();
  const month = dpDate.getMonth();
  const nextMonthDate = new Date(year, month + 1, 1);

  const outsideRef = useRef(null);
  useOutsideClick(outsideRef, () => {
    setOnStartDate(false);
    setOnEndDate(false);
  });

  const onClickNextMonth = () => {
    setDpDate(new Date(year, month + 1, 1));
  };

  const onClickPrevMonth = () => {
    setDpDate(new Date(year, month - 1, 1));
  };

  const onClickStartDate = () => {
    setOnEndDate(false);
    setOnStartDate(true);
  };

  const onClickEndDate = () => {
    setOnStartDate(false);
    setOnEndDate(true);
  };

  const onClickCalendarDate = (date) => {
    if (onStartDate && !onEndDate) {
      if (endDate < date) {
        setEndDate(date);
        setOnEndDate(false);
        setOnStartDate(true);
      } else {
        setStartDate(date);
        setOnStartDate(false);
        setOnEndDate(true);
      }
      return;
    } else if (onEndDate && !onStartDate) {
      if (startDate > date) {
        setStartDate(date);
        setOnStartDate(false);
        setOnEndDate(true);
      } else {
        setEndDate(date);
      }
      return;
    }
  };

  const onClickStartDateCancel = () => {
    setStartDate();
    setOnEndDate(false);
    setOnStartDate(true);
  };

  const onClickEndDateCancel = () => {
    setEndDate();
  };

  return (
    <div className={props.className} ref={outsideRef}>
      <div className="flex flex-initial w-[100%] h-[100%]">
        <div
          className={
            onStartDate
              ? "flex flex-initial w-[49%] h-[100%] border-2 rounded-full hover:shadow-md"
              : "flex flex-initial w-[49%] h-[100%] rounded-full hover:shadow-md"
          }
        >
          <div className="mx-6 my-2">
            <text className="text-xs">{props.startName}</text>
            <div className="text-xs" onClick={onClickStartDate}>
              {startDate
                ? `${startDate.getMonth() + 1}월 ${startDate.getDate()}일`
                : `날짜 입력`}
            </div>
          </div>
          {startDate && onStartDate ? (
            <button
              className="m-1 w-[60px] rounded-full bg-slate-400"
              onClick={onClickStartDateCancel}
            >
              <div>x</div>
            </button>
          ) : null}
        </div>
        <div className="w-px mx-1 my-4 bg-slate-400"></div>
        <div
          className={
            onEndDate
              ? "flex flex-initial w-[49%] h-[100%] border-2 rounded-full hover:shadow-md"
              : "flex flex-initial w-[49%] h-[100%] rounded-full hover:shadow-md"
          }
        >
          <div className="mx-6 my-2">
            <text className="text-xs">{props.endName}</text>
            <div className="text-xs" onClick={onClickEndDate}>
              {endDate
                ? `${endDate.getMonth() + 1}월 ${endDate.getDate()}일`
                : `날짜 입력`}
            </div>
          </div>
          {endDate && onEndDate ? (
            <button
              className="m-1 w-[60px] rounded-full bg-slate-400"
              onClick={onClickEndDateCancel}
            >
              <div>x</div>
            </button>
          ) : null}
        </div>
      </div>
      {onStartDate || onEndDate ? (
        <div className="w-[848px] m-3 bg-white rounded-lg">
          <div className="flex">
            <button className="m-3" onClick={onClickPrevMonth}>
              &lt;
            </button>
            <div className="m-3">{`${year}년 ${month + 1}월`}</div>
            <div className="m-3">{`${nextMonthDate.getFullYear()}년 ${
              nextMonthDate.getMonth() + 1
            }월`}</div>
            <button onClick={onClickNextMonth}>&gt;</button>
          </div>
          <div className="flex content-center">
            <Calendar
              className="m-3"
              date={new Date(dpDate)}
              disableDate={new Date(dpDate)}
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
