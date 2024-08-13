import { Button, Layout, Menu, Space, Typography } from "antd";
import { useGetMenuList } from "@/hooks/useControlMenuList";
// import { Button } from "@blog/components";
import { PlusOutlined } from "@ant-design/icons";

const { Sider } = Layout;

export function Sidebar() {
  const { menuList, addMenuItem, selectTravelItem, selectedItem } = useGetMenuList();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "120px",
        height: "100vh",
        zIndex: 1,
      }}
    >
      <Sider
        width={120}
        style={{
          height: "100vh",
          overflowY: "scroll",
          overflowX: "hidden",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <Typography.Title level={4} style={{ color: "white", marginLeft: "8px", marginTop: "4px" }}>
          Your Trip
        </Typography.Title>
        <Space direction="vertical" size="middle" style={{ display: "flex", alignItems: "center" }}>
          <Menu
            theme="dark"
            selectedKeys={[selectedItem.key]}
            onClick={({ key }) => {
              selectTravelItem(key.toString());
            }}
            mode="inline"
            items={menuList}
            style={{ width: "120px", whiteSpace: "pre" }}
          />
          <Button
            size="middle"
            shape="circle"
            icon={<PlusOutlined />}
            iconPosition={"start"}
            onClick={addMenuItem}
          ></Button>
        </Space>
      </Sider>
    </div>
  );
}
