import { test, expect } from "@playwright/test";

test.describe("Application", () => {
  test("should load the home page", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "React UI Template",
    );
  });

  test("should navigate to about page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "About this template" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("About");
  });

  test("should navigate back to home from about", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("link", { name: "Back to home" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "React UI Template",
    );
  });
});
