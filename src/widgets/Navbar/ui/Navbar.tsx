import { Menu } from "antd";
import type { MenuItemType } from "antd/es/menu/interface";
import { RoutePath } from "../../../shared/config/routerConfig";
import { useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const items: MenuItemType[] = [
    { key: RoutePath.main, label: "Главная" },
    { key: RoutePath.users, label: "Пользователи" },
  ];

  const regex = /^\/[^/]*/;

  const navigate = useNavigate();
  const key = location.pathname.match(regex);

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key) {
      navigate(key);
    }
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[RoutePath.main]}
      selectedKeys={[key ? key[0] : RoutePath.main]}
      items={items}
      onClick={handleMenuClick}
    />
  );
};
