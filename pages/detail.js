import * as React from "react";
import { Grid, Box } from "@mui/material";
export default function Detail() {
  return (
    <div className="w-full">
      <div className="flex flex-no-wrap bg-gray-200">
        <div className="w-[100%] bg-purple-200 md:bg-red-200 bp:min-w-[650px]  bp:max-w-[845px]   ">left</div>
        <div className="w-0  bp:min-w-[42%]  bp:flex-grow bg-blue-200">right</div>
      </div>
    </div>
  );
  //작업 방법

  //1. 동작이 변화되는 스크린 크기를 point로 잡는다.[small screen부터]
  //2. bp(1130px) 이후부터는 왼쪽은 특정 크기 이상은 안늘어나고, 오른쪽은 나머지 화면을 차지한다
  //3. bp 이전에는 오른쪽은 0이고, 왼쪽은 100%이다.
  //4. md 보다 작아지면 purple로 변한다.

  //중요!! 가장 작은 단위일때 값이 기본값이다.
  //1차 변경점 전에 값을 기본으로 적어주고,
  //1차 변경점 이후 값을 각 포인트 screensize:변화 이렇게 적어준다
}
