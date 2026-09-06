import { expect, test, type Page } from "@playwright/test";

function collectRuntimeErrors(page: Page) {
  const consoleErrors: string[] = [];
  const pageErrors: Error[] = [];

  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    if (msg.text().includes("Failed to load resource")) return;
    if (msg.text().includes("navigator.vibrate")) return;
    consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => pageErrors.push(err));

  return { consoleErrors, pageErrors };
}

test("RSVP form renders and is interactive", async ({ page }) => {
  const { consoleErrors, pageErrors } = collectRuntimeErrors(page);

  await page.goto("/rsvp");
  await expect(page.getByText("RSVP").first()).toBeVisible();
  await expect(page.getByRole("textbox").first()).toBeVisible();

  expect(consoleErrors, "console errors").toEqual([]);
  expect(pageErrors, "page errors").toEqual([]);
});

test("unknown route renders the 404 boundary", async ({ page }) => {
  const { consoleErrors, pageErrors } = collectRuntimeErrors(page);

  await page.goto("/definitely-not-a-route");
  await expect(page.locator("body")).toContainText(
    /not be found|not found|404/i,
  );

  expect(consoleErrors, "console errors").toEqual([]);
  expect(pageErrors, "page errors").toEqual([]);
});
