import { Layout, Menu, Typography } from "antd";
import { useGetMenuList } from "@/hooks/useGetMenuList";
import { Button } from "@blog/components";

const { Sider } = Layout;

export function Sidebar() {
  const { menuList } = useGetMenuList();

  return (
    <Sider>
      <Typography.Title level={4} style={{ color: "white" }}>
        Your Trip
      </Typography.Title>
      <Menu theme="dark" defaultSelectedKeys={["init"]} mode="inline" items={menuList} />
      <Button>추가하기</Button>
    </Sider>
  );
}
