import { useState } from "react";
import "./index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("正しいメールアドレスを入力してください");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("パスワードは6文字以上で入力してください");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      console.log("Form is valid");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center md:flex-row">
        <div className="mt-16 w-full md:mt-0 md:w-2/5">
          <div
            className="relative z-10 h-auto overflow-hidden rounded-lg border-b-2 border-gray-300 bg-white p-8 px-7 py-10 shadow-2xl"
            data-rounded="rounded-lg"
            data-rounded-max="rounded-full"
          >
            <h3 className="mb-6 text-center text-2xl font-medium">ログイン</h3>
            <form onSubmit={handleSubmit}>
              <label>
                メールアドレス
                <input
                  type="email"
                  className="mb-4 block w-full rounded-lg  border-2 border-gray-200  px-4 py-3 focus:outline-none focus:ring focus:ring-blue-500"
                  data-rounded="rounded-lg"
                  data-primary="blue-500"
                  placeholder="book@review.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                パスワード
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="mb-4 block w-full rounded-lg  border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring focus:ring-blue-500"
                  data-rounded="rounded-lg"
                  data-primary="blue-500"
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {emailError && <p style={{ color: "red" }}>{emailError}</p>}
                {passwordError && (
                  <p style={{ color: "red" }}>{passwordError}</p>
                )}
              </label>
              <div className="block">
                <button
                  className="w-full rounded-lg bg-blue-600 px-3 py-4 font-medium text-white"
                  data-primary="blue-600"
                  data-rounded="rounded-lg"
                  type="submit"
                >
                  ログイン
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
