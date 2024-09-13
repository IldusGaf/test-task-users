import { HighchartsReact } from "highcharts-react-official";
import * as Highcharts from "highcharts";
import { useRef } from "react";
import { useGetUserListQuery } from "../../../../Users/model/api/userListApiSlice";
import { useGetUserTypeListQuery } from "../../../../../shared/model/api/userTypesApiSlice";
import { mapUserTypeList } from "../../../../Users";

export const PieChart = (props: HighchartsReact.Props) => {
  const { data: dataUserTypeList, isError: isErrorUserTypeList } =
    useGetUserTypeListQuery();

  const { data: dataUserList, isError: isErrorUserList } =
    useGetUserListQuery(null);

  const mapUserType =
    dataUserTypeList?.data && mapUserTypeList(dataUserTypeList?.data);

  const usersCount = dataUserList?.data?.length || 1;
  console.log(dataUserList?.data);
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const res: Record<number, { name: string; value: number }> = {};

  dataUserList?.data?.forEach((elem) => {
    if (res[elem.type_id]) {
      res[elem.type_id].value = res[elem.type_id].value + 1;
    } else {
      res[elem.type_id] = {
        name: (mapUserType && mapUserType[elem.type_id].name) || "",
        value: 1,
      };
    }
  });

  const options: Highcharts.Options = {
    title: {
      text: "Доля пользователей",
    },
    chart: {
      plotShadow: false,
      type: "pie",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Доля в %",
        data: Object.values(res).map(({ name, value }) => ({
          name,
          y: (value / usersCount) * 100,
        })),
      },
    ],
  };
  return !isErrorUserList && !isErrorUserTypeList ? (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      {...props}
    />
  ) : null;
};
