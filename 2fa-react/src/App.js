import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
const url = "http://localhost:8080";

function App() {
  const [value, setValue] = useState("");
  const [qr, setQr] = useState("");
  useEffect(() => {
    axios
      .get(`${url}/qr`)
      .then((res) => {
        console.log(res);
        const image = res?.data?.img?.split(",");
        setQr(image);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleInput = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/auth`, { token: value })
      .then((res) => {
        if (res.data.loggedIn === true) alert("성공");
        else alert("실패");
      })
      .catch((err) => console.error("err : ", err));
  };

  return (
    <>
      <div>구글 2FA OTP 인증이지롱</div>
      <div>
        <img src={qr} />
        <input type="text" onChange={handleInput} />
        <button onClick={handleSubmit}>Button</button>
      </div>
    </>
  );
}

export default App;
