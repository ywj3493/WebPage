import { useEffect } from "react";
import Router from "next/router";
export default function Error() {
  useEffect(() => {
    setTimeout(() => Router.push("/"), 2000);
  }, []);
  return <div>This is Error Page! You will redirected to main page in 2 sec</div>;
}
