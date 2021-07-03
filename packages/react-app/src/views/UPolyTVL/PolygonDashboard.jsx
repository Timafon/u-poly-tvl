import React from "react";
import { Typography } from "antd";
import { defiLlamaApi } from "../../api";

const moneyFormatter = new Intl.NumberFormat("ru-RU");

export function PolygonDashboard({}) {
  const [tvl, setTvl] = React.useState();
  React.useEffect(() => {
    defiLlamaApi
      .getPolygonTvl()
      .then(res => {
        setTvl(res.data);
      })
      .catch();
  }, []);

  return (
    <div>
      <Typography>Polygon TVL: {moneyFormatter.format(tvl)}$</Typography>
      <Typography>UPIT: {Math.round((1 / tvl) * Math.pow(10, 9) * 1000) / 1000}</Typography>
      <Typography>UPT: {Math.round((tvl / Math.pow(10, 9)) * 1000) / 1000}</Typography>
    </div>
  );
}
