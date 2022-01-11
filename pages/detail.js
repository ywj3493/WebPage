import * as React from "react";
import { Grid, Box } from "@mui/material";
export default function Detail() {
  return (
    <div className="w-full">
      <div className="flex flex-no-wrap bg-gray-200">
        <div className="min-w-[650px] w-[100%] xl:max-w-[830px]   bg-red-200">left</div>
        <div className="w-0  bp:min-w-[42%]  xl:flex-grow bg-blue-200">right</div>
      </div>
    </div>
    //code 설명 : 기본적으론 왼쪽은 min-width 가 있고,
  );
}
