import { useEffect } from "react";
import Router from "next/router";
//signIn error will arrive here
export default function Error() {
  useEffect(() => {
    setTimeout(() => Router.push("/"), 2000);
  }, []);
  return <div>SignIn unavailable! You will redirected to main page in 2 sec</div>;
}
