import React from "react";
import { ethers } from "ethers";
import { Button } from "antd";
import { calculatePolyTvl } from "../../lib/DefilLama/CalculatingPolygonTVL";

// https://docs.umaproject.org/synthetic-tokens/long-short-pair
// create
// redeem
// expire
// settle

export function LSP({ address, signer, provider }) {
  const [tvl, setTvl] = React.useState("loading...");
  const calculateTvl = React.useCallback(() => {
    async function calcLsp() {
      const latestBlock = await provider.getBlockNumber();
      const _tvl = await calculatePolyTvl(null, latestBlock);

      setTvl(_tvl);
    }

    calcLsp();
  }, [provider]);

  return (
    <div>
      <div>LSP contract</div>
      <div>Polygon TVL: ${JSON.stringify(tvl)}</div>
      <Button onClick={calculateTvl}>Calc</Button>
    </div>
  );
}
