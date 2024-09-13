import { Breadcrumb } from "antd";
import type { ReactNode} from "react";
import { useMemo } from "react";
import { useMatches } from "react-router-dom";

export const CustomBreadcrumb = () => {
  const matches = useMatches();
  const crumbs = useMemo(
    () =>
      matches
        .filter((match) =>
          Boolean(
            (match.handle as { crumb?: (str?: string) => ReactNode })?.crumb
          )
        )
        .map((match) =>
          (match.handle as { crumb: (str?: string) => ReactNode })?.crumb(
            match.params.id
          )
        ),
    [matches]
  );
  const extraBreadcrumbItems = useMemo(
    () =>
      crumbs.map((crumb, index) => ({
        key: index,
        title: crumb,
      })),
    [crumbs]
  );

  return (
    <Breadcrumb
      style={{
        margin: "16px 0",
      }}
      items={extraBreadcrumbItems}
    />
  );
};
