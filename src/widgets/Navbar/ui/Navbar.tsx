import { Menu } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import { RoutePath } from "../../../app/providers/AppRouterProvider/config/routerConfig";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const items: MenuItemType[] = [
    { key: RoutePath.main, label: "Главная" },
    { key: RoutePath.users, label: "Пользователи" },
  ];

  const navigate = useNavigate();

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
      items={items}
      onClick={handleMenuClick}
    />
  );
};
