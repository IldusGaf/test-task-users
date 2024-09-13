import { Layout, Spin, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Navbar } from "../widgets/Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLoading } from "../shared/selectors/getLoading";
import { CustomBreadcrumb } from "../shared/ui/CustomBreadcrumb";

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const isAnythingLoading = useSelector(getLoading);

  return (
    <Layout className="app">
      <Header>
        <Navbar />
      </Header>
      <Layout>
        <Content
          style={{
            padding: "0 48px",
          }}
        >
          <CustomBreadcrumb />
          <div
            style={{
              background: colorBgContainer,
              height: "90%",
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
            <Spin spinning={isAnythingLoading} delay={200} fullscreen />
          </div>
        </Content>
      </Layout>
      <Footer>Тестовое задание</Footer>
    </Layout>
  );
}

export default App;
