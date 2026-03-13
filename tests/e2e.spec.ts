import { test, expect } from "@playwright/test";

const BASE_URL = process.env.FRONTEND_URL || "http://localhost:3000";

test.describe("AI Portfolio Assistant", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("chat interface loads with header and branding", async ({ page }) => {
    await expect(page.locator("header")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Sonu Kumar AI Assistant" })).toBeVisible();
    await expect(page.getByText("AI Assistant").first()).toBeVisible();
    await expect(page.getByTestId("chat-input")).toBeVisible();
    await expect(page.getByTestId("send-button")).toBeVisible();
  });

  test("welcome screen shows suggested questions", async ({ page }) => {
    await expect(page.getByText("Ask AI about Sonu Kumar")).toBeVisible();
    await expect(page.getByText("Who is Sonu Kumar?")).toBeVisible();
    await expect(page.getByText("What technologies does Sonu specialize in?")).toBeVisible();
    await expect(page.getByText("What backend projects has Sonu built?")).toBeVisible();
    await expect(page.getByText("Describe Sonu's work experience.")).toBeVisible();
    await expect(page.getByText("What problems has Sonu solved?")).toBeVisible();
    await expect(page.getByText("What certifications does Sonu have?")).toBeVisible();
  });

  test("can type and send a question via button", async ({ page }) => {
    const input = page.getByTestId("chat-input");
    await input.fill("What technologies does Sonu specialize in?");
    await page.getByTestId("send-button").click();

    // User message should appear
    await expect(page.getByText("What technologies does Sonu specialize in?")).toBeVisible();

    // AI response should appear (wait for API)
    await expect(
      page.getByTestId("chat-messages").locator("div").filter({ hasText: /Python|Java|React|FastAPI/i }).first()
    ).toBeVisible({ timeout: 30000 });
  });

  test("Enter key sends message", async ({ page }) => {
    const input = page.getByTestId("chat-input");
    await input.fill("Who is Sonu Kumar?");
    await input.press("Enter");

    await expect(page.getByText("Who is Sonu Kumar?")).toBeVisible();
  });

  test("clicking suggested question sends it", async ({ page }) => {
    await page.getByText("Who is Sonu Kumar?").click();

    await expect(
      page.locator('[data-testid="chat-messages"]').getByText("Who is Sonu Kumar?")
    ).toBeVisible();

    // Suggested questions should disappear after click
    await expect(page.getByText("Ask AI about Sonu Kumar")).not.toBeVisible();
  });

  test("clear chat button works", async ({ page }) => {
    // Send a message first
    const input = page.getByTestId("chat-input");
    await input.fill("Hello");
    await input.press("Enter");
    await page.waitForTimeout(1000);

    // Clear button should appear
    const clearBtn = page.locator('button[title="Clear chat"]');
    await expect(clearBtn).toBeVisible({ timeout: 15000 });
    await clearBtn.click();

    // Welcome screen should come back
    await expect(page.getByText("Ask AI about Sonu Kumar")).toBeVisible({ timeout: 10000 });
  });

  test("message count shows in header", async ({ page }) => {
    const input = page.getByTestId("chat-input");
    await input.fill("Hello");
    await input.press("Enter");
    await page.waitForTimeout(500);

    // After sending + AI response, count could be 1 or 2
    await expect(page.locator("header").getByText(/\d+ msgs?/)).toBeVisible({ timeout: 15000 });
  });

  test("mobile layout is responsive", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE_URL);

    await expect(page.locator("header")).toBeVisible();
    await expect(page.getByTestId("chat-input")).toBeVisible();
    await expect(page.getByTestId("send-button")).toBeVisible();
    await expect(page.getByText("Ask AI about Sonu Kumar")).toBeVisible();
  });

  test("chat scrolls to latest message", async ({ page }) => {
    const input = page.getByTestId("chat-input");

    for (const q of ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"]) {
      await input.fill(q);
      await input.press("Enter");
      await page.waitForTimeout(300);
    }

    await expect(page.getByText("Question 5")).toBeInViewport();
  });

  test("send button is disabled when input is empty", async ({ page }) => {
    const sendBtn = page.getByTestId("send-button");
    await expect(sendBtn).toBeDisabled();
  });

  test("keyboard hint text is visible", async ({ page }) => {
    await expect(page.getByText("Press Enter to send")).toBeVisible();
  });
});
