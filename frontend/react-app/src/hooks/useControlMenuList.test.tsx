import { renderHook, act, cleanup } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { travelInfoAtom, selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { useGetMenuList } from "@/hooks/useControlMenuList";
import { InitTravelInfo } from "@/shared/entities";
import * as uuid from "uuid";
import dayjs from "dayjs";

const mockV4 = vi.fn();
vi.spyOn(uuid, "v4").mockImplementation(mockV4);

describe("useGetMenuList 훅은", () => {
  const initialTravelInfo: InitTravelInfo[] = [
    {
      key: "1",
      origin: "ICN",
      destination: "LAX",
      schedule: { departure: dayjs("10:00"), arrival: dayjs("14:00") },
      passenger: {
        flightClass: "Economy",
        count: {
          adults: 1,
          children: 0,
          infants: 0,
        },
      },
    },
    {
      key: "2",
      origin: "JFK",
      destination: "HND",
      schedule: { departure: dayjs("08:00"), arrival: dayjs("12:00") },
      passenger: {
        flightClass: "Economy",
        count: {
          adults: 1,
          children: 0,
          infants: 0,
        },
      },
    },
  ];

  const setup = (initialState = initialTravelInfo) =>
    renderHook(() => useGetMenuList(), {
      wrapper: ({ children }) => (
        // <RecoilRoot initializeState={(snap) => snap.set(travelInfoAtom, initialState)}>
        <RecoilRoot
          initializeState={({ reset, set }) => {
            set(travelInfoAtom, initialState);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

  beforeEach(() => {
    localStorage.clear(); // Travel Atom에서 LocalStorage를 사용하므로 초기화
    vi.clearAllMocks();
    mockV4.mockReturnValue("3");
  });

  afterEach(() => {
    cleanup(); // 각 테스트 후 Recoil 상태를 초기화
  });

  it("should initialize menu list correctly", () => {
    const { result } = setup();
    expect(result.current.menuList).toHaveLength(2);
    expect(result.current.selectedItem).toEqual(initialTravelInfo[0]);
  });

  it("should select a travel item correctly", () => {
    const { result } = setup();
    act(() => {
      result.current.selectTravelItem("2");
    });
    expect(result.current.selectedItem.key).toBe("2");
  });

  it("should add a new travel item correctly", () => {
    const { result } = setup();
    act(() => {
      result.current.addMenuItem();
    });
    expect(result.current.menuList).toHaveLength(3);
    expect(result.current.selectedItem.key).toBe("3");
  });

  it("should remove a travel item correctly", () => {
    const { result } = setup([...initialTravelInfo]);
    act(() => {
      result.current.removeMenuItem(initialTravelInfo[0].key);
      // result.current.removeMenuItem(result.current.menuList[0]?.key!);
    });
    expect(result.current.menuList).toHaveLength(1);
    expect(result.current.selectedItem.key).toBe("2");
  });

  it("should handle removing last travel item", () => {
    const singleTravelInfo: InitTravelInfo[] = [
      {
        key: "1",
        origin: "ICN",
        destination: "LAX",
        schedule: { departure: dayjs("10:00"), arrival: dayjs("14:00") },
        passenger: {
          flightClass: "Economy",
          count: {
            adults: 1,
            children: 0,
            infants: 0,
          },
        },
      },
    ];

    const { result } = setup(singleTravelInfo);
    act(() => {
      result.current.removeMenuItem("1");
    });
    expect(result.current.menuList).toHaveLength(0);
    expect(result.current.selectedItem).toBeUndefined();
  });
});
