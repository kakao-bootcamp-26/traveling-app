import { render, screen, act, waitFor } from "@testing-library/react";
import { MockedFunction } from "vitest";
import { Sidebar } from "./Sidebar";
import { RecoilRoot } from "recoil";
import userEvent from "@testing-library/user-event";
import { useGetMenuList } from "@/hooks/useControlMenuList";
import { initMenuList, initTravelItem } from "@/tests/__mocks__/travelItem";

// useGetMenuList 훅을 모킹하여 필요한 데이터와 함수들을 설정
vi.mock("@/hooks/useControlMenuList");

userEvent.setup();

describe("Sidebar 컴포넌트", () => {
  let selectedItem: (typeof initTravelItem)[0];
  const mockUseGetMenuList = useGetMenuList as MockedFunction<typeof useGetMenuList>;

  beforeEach(() => {
    selectedItem = initTravelItem[0]; // 초기 상태로 설정

    mockUseGetMenuList.mockReturnValue({
      menuList: initTravelItem.map((item) => ({
        key: item.key,
        label: `${item.origin} - ${item.destination}`,
      })),
      addMenuItem: vi.fn(),
      selectTravelItem: vi.fn().mockImplementation((key: string) => {
        const item = initTravelItem.find((item) => item.key === key);
        if (item) {
          selectedItem = item;
        }
      }),
      removeMenuItem: vi.fn(),
      get selectedItem() {
        return selectedItem;
      },
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render Sidebar correctly", async () => {
    render(
      <RecoilRoot>
        <Sidebar />
      </RecoilRoot>,
    );
    await waitFor(() => {
      expect(screen.getByText("Your Trip")).toBeInTheDocument();
      expect(screen.getByText("ICN - LAX")).toBeInTheDocument();
      expect(screen.getByText("JFK - HND")).toBeInTheDocument();
    });
  });

  it("should call selectTravelItem when a menu item is clicked", async () => {
    render(
      <RecoilRoot>
        <Sidebar />
      </RecoilRoot>,
    );

    const { selectTravelItem, selectedItem } = mockUseGetMenuList();

    const trip2 = screen.getByRole("menuitem", { name: /JFK - HND/i });
    await userEvent.click(trip2);

    expect(selectTravelItem).toHaveBeenCalledWith("2");
    expect(selectTravelItem).toHaveBeenCalledTimes(1);
  });

  it("should call addMenuItem when the add button is clicked", async () => {
    render(
      <RecoilRoot>
        <Sidebar />
      </RecoilRoot>,
    );

    const addButton = screen.getByRole("button");
    await userEvent.click(addButton);

    expect(mockUseGetMenuList().addMenuItem).toHaveBeenCalled();
  });
});
