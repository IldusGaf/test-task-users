import { Flex } from "antd";
import { PieChart } from "../components/PieChart";
import { ColumnChart } from "../components/ColumnChart";

export const Main = () => {
  return (
    <>
      <h1>Добро пожаловать на главную страницу тестового задания!</h1>
      <Flex justify="space-around">
        <PieChart />
        <ColumnChart />
      </Flex>
    </>
  );
};
