import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }

  return config;
});

interface PendingTask {
  config: AxiosRequestConfig;
  resolve: Function;
}

const queue: PendingTask[] = [];

let refreshing = false;

const refreshToken = async () => {
  let res: any;
  try {
    res = await axios.get("http://localhost:3000/user/refresh", {
      params: {
        refresh_token: localStorage.getItem("refresh_token"),
      },
    });
  } catch (e) {
    console.log(e);
    res = e;
  }
  console.log(res, ";;;;;;");
  localStorage.setItem("access_token", res.data.access_token);
  localStorage.setItem("refresh_token", res.data.refresh_token);
  return res;
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let { data, config } = error.response;
    if (refreshing && !config.url.includes("/user/refresh")) {
      return new Promise((resolve) => {
        queue.push({
          config,
          resolve,
        });
      });
    }

    if (data.statusCode === 401 && !config.url.includes("/user/refresh")) {
      refreshing = true;
      const res = await refreshToken();
      console.log(res);
      refreshing = false;
      if (res.status === 200) {
        queue.forEach(({ config, resolve }) => {
          resolve(axios(config));
        });
        return axios(config);
      } else {
        alert("登录过期，请重新登录");
        localStorage.setItem("access_token", "");
        localStorage.setItem("refresh_token", "");
        return Promise.reject(res.data);
      }
    } else {
      return error.response;
    }
  }
);
function App() {
  const [a, setA] = useState("a");
  const [b, setB] = useState("b");

  const [account, setAccount] = useState("");
  const [code, setCode] = useState("");

  const [msg,setMsg]=useState("");

  const [login_info] = useState({
    name: "user_role1",
    password: "123456",
  });

  const login = async () => {
    const { data } = await axios.post(
      "http://localhost:3000/user/login",
      login_info
    );
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
  };


  const sse_fetch=async ()=>{
    const event=new EventSource("http://localhost:3000/stream2");
    event.onmessage=(val)=>{
      console.log(val.data.msg,"sse_fetch")
    }
  }
  const fetch = async () => {
    if (!localStorage.getItem("access_token")) {
      await login();
    }

    const { data: aData } = await axios.get("http://localhost:3000/aaa");
    const { data: bData } = await axios.get("http://localhost:3000/bbb");

    setA(aData);
    setB(bData);

    console.log({
      aData,
      bData,
    });
  };

  const changeAccount = (val: string) => {
    setAccount(val);
  };

  const changeCode = (val: string) => {
    setCode(val);
  };

  const getCode = async () => {
    if (!account) {
      return alert("邮箱不能为空");
    }
    await axios.get("http://localhost:3000/user/code", {
      params: {
        address: account,
      },
    });
    alert("获取成功");
  };

  const loginByEmail = async () => {
    const { data } = await axios.post(
      "http://localhost:3000/user/login/email",
      {
        account,
        code,
      }
    );
    console.log(data);
  };

  useEffect(() => {
    // fetch()
    sse_fetch()
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div className="item">
            <span className="label">用户名</span>
            <input
              value={account}
              onChange={(e) => changeAccount(e.target.value)}
            />
          </div>
          <div className="item">
            <span className="label">验证码</span>
            <input value={code} onChange={(e) => changeCode(e.target.value)} />
            <button onClick={getCode}>获取验证码</button>
          </div>

          <div>
            <button onClick={loginByEmail}>登录</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
