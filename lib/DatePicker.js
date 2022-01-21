import { useState, useEffect } from "react";

function isDateEqual(date1, date2) {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function Calendar(props) {
  const calDate = props.date;
  const [activeDate, setActiveDate] = useState();

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
    <table>
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
                        date < today
                          ? "bg-gray-400"
                          : "bg-white active:bg-green-700"
                      }
                      disabled={date < today}
                      onClick={() => {
                        props.onClickCalendarDate(date);
                        setActiveDate(date);
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
  const { isStartDate, isEndDate } = props;

  const year = dpDate.getFullYear();
  const month = dpDate.getMonth();

  const onClickNextMonth = () => {
    setDpDate(new Date(year, month + 1, 1));
  };

  const onClickPrevMonth = () => {
    setDpDate(new Date(year, month - 1, 1));
  };

  const onClickCalendarDate = (date) => {
    console.dir(`isStartDate : ${isStartDate}, isEndDate : ${isEndDate}`);
    if (isStartDate) {
      setStartDate(date);
    } else if (isEndDate) {
      setEndDate(date);
    }
    console.dir(`IN : ${startDate}, OUT : ${endDate}`);
  };

  return (
    <div className="w-80 bg-white">
      <div className="flex content-center">
        <button onClick={onClickPrevMonth}>&lt;</button>
        <div>{`${year}년 ${month + 1}월`}</div>
        <div>{`${year}년 ${(month + 2) % 12}월`}</div>
        <button onClick={onClickNextMonth}>&gt;</button>
      </div>
      <div className="flex content-center">
        <Calendar
          date={new Date(dpDate)}
          onClickCalendarDate={onClickCalendarDate}
        ></Calendar>
        <Calendar
          date={new Date(dpDate.getFullYear(), dpDate.getMonth() + 1)}
          onClickCalendarDate={onClickCalendarDate}
        ></Calendar>
      </div>
    </div>
  );
}

export { Calendar, RangeDatePicker };
