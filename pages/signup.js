import { useState } from "react";
import axios from "axios";
import Router from "next/router";
import { signIn } from "next-auth/client";
export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signup = async () => {
    if (!name || !email || !password) {
      alert("please put all inputs");
      return;
    }
    if (password.length < 6) {
      alert("password need to be more than 6 charactor");
      return;
    }
    let input = { name, email, password };
    const result = await axios.post("/api/users/signup", input);
    console.log(result);
    if (result.data.success) {
      signIn("credentials", { email, password, callbackUrl: "localhost:3000" });
    }
  };
  const changeName = (e) => {
    setName(e.currentTarget.value);
  };
  const changeEmail = (e) => {
    setEmail(e.currentTarget.value);
  };
  const changePassword = (e) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <>
      <div className="flex-col space-y-3">
        <div>
          <div className="font-mono mb-2">Name</div>
          <input
            className="rounded-lg p-2 border-2 border-black  font-mono w-[20vw]"
            placeholder="ex) Yongseok Choi"
            value={name}
            onChange={changeName}
          />
        </div>
        <div>
          <div className="font-mono mb-2">Email</div>
          <input
            className="rounded-lg p-2 border-2 border-black  font-mono w-[20vw]"
            placeholder="ex) yongseokchoi@gmail.com"
            type="email"
            value={email}
            onChange={changeEmail}
          />
        </div>
        <div>
          <div className="font-mono mb-2 flex space-x-3 items-center">
            <span>Password</span>
            <span className="text-xs italic text-red-500 font-bold">(password need to be more than 6 charactor)</span>
          </div>
          <input
            className="rounded-lg p-2 border-2 border-black  font-mono w-[20vw]"
            placeholder="ex) Asdf**1@#"
            type="password"
            value={password}
            onChange={changePassword}
          />
        </div>

        <hr className="border-2 border-black" />

        <div className="bg-black text-white rounded-lg p-2 font-mono font-bold text-center ">
          <button onClick={signup}>SIGN-UP</button>
        </div>
      </div>
    </>
  );
}
