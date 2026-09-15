import { describe, expect, it, vi } from "vitest";
import { createWeddingBrowserTracingController } from "./browser-tracing";

describe("Wedding browser tracing", () => {
  it("does not initialize tracing without analytics consent", async () => {
    const initialize = vi.fn();
    const controller = createWeddingBrowserTracingController(initialize);

    await controller.update("denied");

    expect(initialize).not.toHaveBeenCalled();
  });

  it("starts after consent and shuts down after revocation", async () => {
    const shutdown = vi.fn().mockResolvedValue(undefined);
    const initialize = vi.fn().mockResolvedValue({ shutdown });
    const controller = createWeddingBrowserTracingController(initialize);

    await controller.update("granted");
    await controller.update("denied");

    expect(initialize).toHaveBeenCalledOnce();
    expect(shutdown).toHaveBeenCalledOnce();
  });
});
