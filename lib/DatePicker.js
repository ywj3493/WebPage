import { useState, useEffect, useRef } from "react";
import { classnames } from "tailwindcss-classnames";

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
    <div className={props.className}>
      <table className="w-[340px]">
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
                    <td
                      className={classnames(
                        `w-[100%] h-[100%] justify-center ${
                          isDateEqual(date, props.startDate)
                            ? `bg-gradient-to-r from-white to-gray-200`
                            : isDateEqual(date, props.endDate)
                            ? `bg-gradient-to-l from-white to-gray-200`
                            : date > props.startDate && date < props.endDate
                            ? `bg-gray-200`
                            : ``
                        }`
                      )}
                    >
                      <div
                        className={classnames(
                          `w-[100%] h-[100%] justify-center`
                        )}
                      >
                        <div
                          className={classnames(
                            `flex aspect-square border-0 justify-center content-center text-sm disabled:text-gray-300 ${
                              isDateEqual(date, props.startDate) ||
                              isDateEqual(date, props.endDate)
                                ? `bg-black rounded-full text-white`
                                : ``
                            }`
                          )}
                          disabled={date < disableDate}
                          onClick={() => {
                            props.onClickCalendarDate(date);
                          }}
                        >
                          <div className="p-3">{date.getDate()}</div>
                        </div>
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
    </div>
  );
}

/**
 *
 * @param props : {
 *  className : tailwind CSS class string,
 *
 *  startState : {
 *    startDate : react state that will used start state for this RangeDatePicker
 *    setStartDate : startDate setter hook function
 *  },
 *  endState : {
 *    endDate : react state that will used end state for this RangeDatePicker
 *    setEndDate : endDate setter hook function
 *  }
 * }
 * @returns RangeDatePicker Component
 */
function RangeDatePicker(props) {
  const [dpDate, setDpDate] = useState(new Date());
  const { startDate, setStartDate } = props.startState;
  const { endDate, setEndDate } = props.endState;
  const [onStartDate, setOnStartDate] = useState(false);
  const [onEndDate, setOnEndDate] = useState(false);

  const year = dpDate.getFullYear();
  const month = dpDate.getMonth();
  const yesterDate = new Date(year, month, dpDate.getDate());
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
    console.dir("onClickStartDate");
    setOnEndDate(false);
    setOnStartDate(true);
  };

  const onClickEndDate = () => {
    console.dir("onClickEndDate");
    setOnStartDate(false);
    setOnEndDate(true);
  };

  const onClickCalendarDate = (date) => {
    if (onStartDate && !onEndDate) {
      if (endDate && endDate < date) {
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
      if (startDate && startDate > date) {
        setStartDate(date);
        setOnStartDate(false);
        setOnEndDate(true);
      } else {
        setEndDate(date);
      }
      return;
    }
  };

  const onClickDateCancel = () => {
    setStartDate();
    setEndDate();
    setOnEndDate(false);
    setOnStartDate(true);
  };

  return (
    <div className={props.className} ref={outsideRef}>
      <div className="flex w-full h-[64px] self-center">
        <div
          className={classnames(
            `flex flex-initial w-full h-full rounded-full space-between hover:shadow-md ${
              onStartDate ? `border-2` : ``
            }`
          )}
        >
          <div className="flex flex-col">
            <text className="text-xs">{props.startName}</text>
            <div className="text-xs" onClick={onClickStartDate}>
              {startDate
                ? `${startDate.getMonth() + 1}월 ${startDate.getDate()}일`
                : `날짜 입력`}
            </div>
          </div>
          {(startDate && onStartDate) || true ? (
            <button
              className="m-3 rounded-full aspect-square bg-slate-200"
              onClick={onClickDateCancel}
            >
              x
            </button>
          ) : null}
        </div>
        <div className="w-px mx-1 my-4 bg-slate-400"></div>
        <div
          className={classnames(
            `flex flex-initial w-full h-full rounded-full space-between hover:shadow-md ${
              onEndDate ? `border-2` : ``
            }`
          )}
        >
          <div className="mx-6 my-2">
            <text className="text-xs">{props.endName}</text>
            <div className="text-xs" onClick={onClickEndDate}>
              {endDate
                ? `${endDate.getMonth() + 1}월 ${endDate.getDate()}일`
                : `날짜 입력`}
            </div>
          </div>
          {(endDate && onEndDate) || true ? (
            <button
              className="m-3 rounded-full aspect-square bg-slate-200"
              onClick={onClickDateCancel}
            >
              <div>x</div>
            </button>
          ) : null}
        </div>
      </div>
      {onStartDate || onEndDate || true ? (
        // <div className="flex flex-col w-[850px] m-3 bg-white rounded-lg z-10 self-center justify-center">
        //   <div className="flex flex-initial self-center">
        //     <button className="m-3" onClick={onClickPrevMonth}>
        //       &lt;
        //     </button>
        //     <div className="m-3">{`${year}년 ${month + 1}월`}</div>
        //     <div className="m-3">{`${nextMonthDate.getFullYear()}년 ${
        //       nextMonthDate.getMonth() + 1
        //     }월`}</div>
        //     <button className="m-3" onClick={onClickNextMonth}>
        //       &gt;
        //     </button>
        //   </div>
        //   <div className="flex w-full justify-center">
        //     <Calendar
        //       className="flex w-[340px] m-3"
        //       date={new Date(dpDate)}
        //       disableDate={yesterDate}
        //       onClickCalendarDate={onClickCalendarDate}
        //       startDate={startDate}
        //       endDate={endDate}
        //     ></Calendar>
        //     <Calendar
        //       className="flex w-[340px] m-3"
        //       date={new Date(dpDate.getFullYear(), dpDate.getMonth() + 1)}
        //       onClickCalendarDate={onClickCalendarDate}
        //       startDate={startDate}
        //       endDate={endDate}
        //     ></Calendar>
        //   </div>
        // </div>
        <div className="flex w-[850px] m-3 bg-white rounded-lg z-10 self-center">
          <div className="flex w-full p-[27px] justify-center">
            <div className="flex flex-col w-[50%] mx-[27px]">
              <div className="flex flex-initial w-full p-3 justify-between">
                <button className="m-3" onClick={onClickPrevMonth}>
                  &lt;
                </button>
                <div className="flex m-3">{`${year}년 ${month + 1}월`}</div>
                <div></div>
              </div>
              <Calendar
                className="flex w-full m-3 p-3"
                date={new Date(dpDate)}
                disableDate={yesterDate}
                onClickCalendarDate={onClickCalendarDate}
                startDate={startDate}
                endDate={endDate}
              ></Calendar>
            </div>
            <div className="flex flex-col w-[50%] mx-[27px]">
              <div className="flex flex-initial w-full p-3 justify-between">
                <div></div>
                <div className="m-3">{`${nextMonthDate.getFullYear()}년 ${
                  nextMonthDate.getMonth() + 1
                }월`}</div>
                <button className="m-3" onClick={onClickNextMonth}>
                  &gt;
                </button>
              </div>
              <Calendar
                className="flex w-full m-3 p-3"
                date={new Date(dpDate.getFullYear(), dpDate.getMonth() + 1)}
                onClickCalendarDate={onClickCalendarDate}
                startDate={startDate}
                endDate={endDate}
              ></Calendar>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export { Calendar, RangeDatePicker, useOutsideClick };
