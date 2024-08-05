import { Layout, Menu, Typography } from "antd";
import type { MenuProps } from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { useGetMenuList } from "@/hooks/useGetMenuList";

const { Sider } = Layout;

export function Sidebar() {
  const { menuList } = useGetMenuList();
  return (
    <Sider>
      <Typography.Title level={4} style={{ color: "white" }}>
        Your Trip
      </Typography.Title>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={menuList} />
    </Sider>
  );
}
