import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../src/test/Logintest";
import React from "react";

console.log(React.version);

describe("Login component", () => {
  test("renders login form", () => {
    render(<Login />);

    // メールアドレスの入力フィールドを確認
    expect(screen.getByLabelText(/メールアドレス/i)).toBeInTheDocument();

    // パスワードの入力フィールドを確認
    expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument();

    // ログインボタンを確認
    expect(
      screen.getByRole("button", { name: /ログイン/i }),
    ).toBeInTheDocument();
  });
});
