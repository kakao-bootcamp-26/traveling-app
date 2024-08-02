import { MockStorage } from "@/__test__/stub/MockStorage";
import { getEmailState, toggleEmailStorage } from "@/features/login/lib/email-storage";

describe("toggleEmailStorage", () => {
  let mockStorage: MockStorage;

  beforeEach(() => {
    mockStorage = new MockStorage();
  });

  it("should store email when shouldRemember is true", () => {
    toggleEmailStorage({ email: "test@example.com", shouldRemember: true }, mockStorage);

    const state = getEmailState(mockStorage);
    expect(state).toEqual({ email: "test@example.com", shouldRemember: true });
  });

  it("should clear email when shouldRemember is false", () => {
    toggleEmailStorage({ email: "test@example.com", shouldRemember: true }, mockStorage);
    toggleEmailStorage({ email: "test@example.com", shouldRemember: false }, mockStorage);

    const state = getEmailState(mockStorage);
    expect(state).toEqual({ email: "", shouldRemember: false });
  });
});
