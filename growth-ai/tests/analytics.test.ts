import { buildEvent, isValidEvent, parseUTM } from "../../src/lib/growth/data/analytics-events";

describe("analytics-events", () => {
  test("isValidEvent accepts valid events", () => {
    expect(isValidEvent("page_view")).toBe(true);
    expect(isValidEvent("signup_completed")).toBe(true);
    expect(isValidEvent("premium_purchase")).toBe(true);
    expect(isValidEvent("referral_signup")).toBe(true);
  });

  test("isValidEvent rejects invalid events", () => {
    expect(isValidEvent("random_event")).toBe(false);
    expect(isValidEvent("")).toBe(false);
    expect(isValidEvent("PAGE_VIEW")).toBe(false);
  });

  test("buildEvent creates valid event", () => {
    const event = buildEvent({
      event: "quiz_completed",
      userId: 42,
      sessionId: "abc",
      url: "https://edukora.net/quiz/1?utm_source=facebook&utm_medium=social",
    });
    expect(event).not.toBeNull();
    expect(event!.event).toBe("quiz_completed");
    expect(event!.userId).toBe(42);
    expect(event!.utm?.utm_source).toBe("facebook");
    expect(event!.utm?.utm_medium).toBe("social");
    expect(event!.timestamp).toBeTruthy();
  });

  test("buildEvent returns null for invalid event", () => {
    expect(buildEvent({ event: "invalid" })).toBeNull();
  });

  test("parseUTM extracts utm params", () => {
    const utm = parseUTM("https://edukora.net/page?utm_source=tiktok&utm_campaign=viral&utm_content=hook1&utm_medium=video");
    expect(utm.utm_source).toBe("tiktok");
    expect(utm.utm_campaign).toBe("viral");
    expect(utm.utm_content).toBe("hook1");
    expect(utm.utm_medium).toBe("video");
  });

  test("parseUTM returns empty for no utm", () => {
    expect(parseUTM("https://edukora.net/page")).toEqual({});
    expect(parseUTM("not-a-url")).toEqual({});
  });
});
