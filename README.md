# UMA Polygon TVL Long Short Pair

### Useful Links:

- [UMA About Long Short Pair](https://docs.umaproject.org/synthetic-tokens/long-short-pair)
- [UMA LSP contract [source code]](https://github.com/UMAprotocol/launch-lsp)
- [DefilLama site](https://defillama.com/home)
- [DefilLama SDK [source code]](https://github.com/DefiLlama/defillama-sdk)
- [DefilLama Adapters [source code]](https://github.com/DefiLlama/DefiLlama-Adapters)
- [UMIP discourse](https://discourse.umaproject.org/t/add-polygontvl-and-polygontvlinv-as-price-identifiers/1209)
- [UMIP PR](https://github.com/UMAprotocol/UMIPs/pull/336)

# The uPolyTVL(Scaffold-eth) stack
Scaffold-eth is not a product itself but more of a combination or stack of other great products. It allows you to quickly build and iterate over your smart contracts and frontends. It leverages:

- Hardhat for running local networks, deploying and testing smart contracts.
- React for building a frontend, using many useful pre-made components and hooks.
- Ant for your UI. But can be easily changed to Bootstrap or some other library you prefer.
- Surge for publishing your app.
- Tenderly / The Graph / Etherscan / Infura / Blocknative and more!
- Support for L2 / Sidechains like Optimism and Arbitrum.

# Installation and setup

⚠️ First, make sure you have: [Node](https://nodejs.org/dist/latest-v12.x/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

```bash
git clone https://github.com/austintgriffith/scaffold-eth.git
cd scaffold-eth
yarn install
yarn chain
```

> in a second terminal window:

```bash
cd scaffold-eth
yarn start
```

> in a third terminal window:

```bash
cd scaffold-eth
yarn deploy
```

If everything goes smoothly you should now have a local network running, with the starter contracts deployed and the frontend React app running on https://localhost:3000.

# Documentation

For a more in-depth explanation, documentation, quick start guide, tutorials, tips and many more resources, visit our documentation site: [docs.scaffoldeth.io](https://docs.scaffoldeth.io) 
