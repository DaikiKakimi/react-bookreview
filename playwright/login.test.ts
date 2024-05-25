import { test, expect } from "@playwright/test";

test.describe("Login form tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://127.0.0.1:5173/");
  });

  test("email error", async ({ page }) => {
    await page.fill('input[type="email"]', "");
    await page.fill('input[type="password"]', "validpassword123");

    await page.click('button[type="submit"]');

    const emailError = page.locator("text=正しいメールアドレスを入力してください");
    await expect(emailError).toBeVisible({ timeout: 10000 });
  });

  test("pass error", async ({ page }) => {
    await page.fill('input[type="email"]', "valid@example.com");
    await page.fill('input[type="password"]', "short");

    await page.click('button[type="submit"]');

    const passwordError = page.locator("text=パスワードは6文字以上で入力してください");
    await expect(passwordError).toBeVisible({ timeout: 10000 });
  });

  test("no error", async ({ page }) => {
    await page.fill('input[type="email"]', "valid@example.com");
    await page.fill('input[type="password"]', "validpassword123");

    await page.click('button[type="submit"]');

    const emailError = page.locator("text=正しいメールアドレスを入力してください");
    const passwordError = page.locator("text=パスワードは6文字以上で入力してください");
    await expect(emailError).toHaveCount(0);
    await expect(passwordError).toHaveCount(0);
  });
});
