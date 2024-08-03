import { formatDate } from "./date";

describe("formatDate", () => {
  it("should return the correct format for minutes ago", () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 10);
    expect(formatDate(date)).toBe("10 minutes ago");
  });

  it("should return the correct format for hours ago", () => {
    const date = new Date();
    date.setHours(date.getHours() - 5);
    expect(formatDate(date)).toBe("5 hours ago");
  });

  it("should return the correct format for days ago", () => {
    const date = new Date();
    date.setDate(date.getDate() - 3);
    expect(formatDate(date)).toBe(
      new Intl.DateTimeFormat("en", { weekday: "short" }).format(date)
    );
  });

  it("should return the correct format for less than a year", () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 3);
    expect(formatDate(date)).toBe(
      new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
      }).format(date)
    );
  });

  it("should return the correct format for more than a year", () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 2);
    expect(formatDate(date)).toBe(
      new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date)
    );
  });
});
