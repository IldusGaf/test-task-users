import { HighchartsReact } from "highcharts-react-official";
import * as Highcharts from "highcharts";
import { useRef } from "react";
import { useGetUserListQuery } from "../../../../Users/model/api/userListApiSlice";
import dayjs from "dayjs";

export const ColumnChart = (props: HighchartsReact.Props) => {
  const { data: dataUserList, isError: isErrorUserList } =
    useGetUserListQuery(null);

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const res: Record<string, number> = {};

  dataUserList?.data?.forEach((elem) => {
    const stringDate = dayjs(elem.last_visit_date).format("DD.MM.YYYY");
    if (res[stringDate]) {
      res[stringDate] = res[stringDate] + 1;
    } else {
      res[stringDate] = 1;
    }
  });

  const options: Highcharts.Options = {
    title: {
      text: "Активные пользователи",
    },
    chart: {
      type: "variwide",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "Кол-во",
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: "column",
        name: "Кол-во пользоватей",
        data: Object.entries(res).map(([key, value]) => [key, value]),
        borderRadius: 3,
        colorByPoint: true,
      },
    ],
  };
  return !isErrorUserList ? (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      {...props}
    />
  ) : null;
};
