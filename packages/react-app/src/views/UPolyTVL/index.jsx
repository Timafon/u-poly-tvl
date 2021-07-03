import React from "react";
import { PolygonDashboard } from "./PolygonDashboard";
import { Collateral } from "./UPolygonDashboard";

export function UPolyTVL({ address, signer }) {
  return (
    <div>
      <PolygonDashboard />
      <Collateral address={address} signer={signer} />
    </div>
  );
}
