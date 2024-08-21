import { createMenuItem, defaultStyle } from "@/shared/utils/menuItem";
import { render } from "@testing-library/react";

import * as Sidebar from "@/shared/components/sidebar";
vitest.mock("@/shared/components/sidebar");

vitest.spyOn(Sidebar, "Label").mockImplementation(({ location, schedule }) => (
  <div data-testid="mock-label">
    {location} - {JSON.stringify(schedule)}
  </div>
));

function makeTravelInfo(key: string) {
  return {
    origin: { airportCode: "ICN", city: "서울/인천" },
    destination: {
      city: "",
      airportCode: "",
    },
    key,
  };
}

describe("createMenuItem 함수는", () => {
  describe("인자에 따라 반환하는 값이 달라진다.", () => {
    it("첫번째 인자인 travelInfo는 반드시 있어야 한다", () => {
      const travelInfo = makeTravelInfo("1");
      const result = createMenuItem(travelInfo) as {
        key: string;
        style: typeof defaultStyle;
        children?: unknown;
        icon?: unknown;
        label: React.ReactNode;
      };

      expect(result.key).toBe(travelInfo.key);
      expect(result.key).toBe(travelInfo.key);
      expect(result.style).toEqual(defaultStyle);
      expect(result.children).toBeUndefined();
      expect(result.icon).toBeUndefined();

      const { getByTestId } = render(result.label);
      expect(getByTestId("mock-label")).toHaveTextContent("ICN - ANY");
    });

    it("두번째 인자인 icon이 있으면 반환값에 icon이 포함된다", () => {
      const travelInfo = makeTravelInfo("1");
      const icon = <div>icon</div>;
      const result = createMenuItem(travelInfo, icon) as {
        key: string;
        style: typeof defaultStyle;
        children?: unknown;
        icon?: unknown;
      };

      expect(result.icon).toBe(icon);
    });

    it("세번째 인자인 children이 있으면 반환값에 children이 포함된다", () => {
      const travelInfo = makeTravelInfo("1");
      const children = [createMenuItem(makeTravelInfo("2"))];
      const result = createMenuItem(travelInfo, undefined, children)! as {
        key: string;
        style: typeof defaultStyle;
        children?: unknown;
        icon?: unknown;
      };

      expect(result.children).toBe(children);
    });
  });
});
