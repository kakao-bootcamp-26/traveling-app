import { createNewTravelItem } from "@/shared/utils/travelInfo";

// auto Import -> https://vitest.dev/config/#globals
describe("createNewTravelItem 함수", () => {
  it("키값을 인자로 받아 새로운 기본 여행정보 객체를 반환한다", () => {
    // Given
    const key = "1";
    // When
    const result = createNewTravelItem(key);
    // Then
    expect(result).toEqual({
      origin: "ICN",
      destination: "",
      key: "1",
      passenger: {
        count: {
          adults: 1,
          children: 0,
          infants: 0,
        },
        flightClass: "Economy",
      },
    });
  });
});
