import { Breadcrumb, Layout, Spin, theme } from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";
import { Navbar } from "../widgets/Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLoading } from "../shared/selectors/getLoading";

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
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          ></Breadcrumb>
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
