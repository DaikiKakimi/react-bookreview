import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../src/Login";
import React from "react";

console.log(React.version);

describe("Login component", () => {
  test("renders login form", () => {
    render(<Login />);

    // ログインフォームの見出しを確認
    expect(screen.getByRole("heading", { name: /ログイン/i })).toBeInTheDocument();

    // メールアドレスの入力フィールドを確認
    expect(screen.getByLabelText(/メールアドレス/i)).toBeInTheDocument();

    // パスワードの入力フィールドを確認
    expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument();

    // ログインボタンを確認
    expect(screen.getByRole("button", { name: /ログイン/i })).toBeInTheDocument();
  });
});
