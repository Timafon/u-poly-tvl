import React from "react";
import { ethers } from "ethers";
import { calculatePolyTvl } from "../../lib/DefilLama/CalculatingPolygonTVL";

// https://docs.umaproject.org/synthetic-tokens/long-short-pair
// create
// redeem
// expire
// settle

export function LSP({ address, signer, provider }) {
  const [tvl, setTvl] = React.useState("loading...");
  React.useEffect(() => {
    async function calcLsp() {
      const latestBlock = await provider.getBlockNumber();
      const _tvl = await calculatePolyTvl(null, latestBlock);

      setTvl(_tvl);
    }

    calcLsp();
  }, []);

  return (
    <div>
      <div>LSP contract</div>
      <div>Polygon TVL: ${tvl}</div>
    </div>
  );
}
