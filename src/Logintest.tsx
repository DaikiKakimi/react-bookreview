import { useState } from "react";

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
      <form onSubmit={handleSubmit}>
        <h1>ログイン</h1>
        <label>
          メールアドレス
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        </label>
        <label>
          パスワード
          <input
            type="password"
            value={password}
            placeholder="6文字以上"
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </label>
        <button type="submit">ログイン</button>
      </form>
    </>
  );
};

export default Login;
