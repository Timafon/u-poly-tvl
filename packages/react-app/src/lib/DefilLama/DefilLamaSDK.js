import { ethers } from "ethers";
import lodash from "lodash";

const catchedABIs = {
  "erc20:symbol": {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  "erc20:decimals": {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  "erc20:balanceOf": {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  "erc20:totalSupply": {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
};
const providers = {
  ethereum: new ethers.providers.StaticJsonRpcProvider(
    process.env.ETHEREUM_RPC !== undefined && process.env.ETHEREUM_RPC !== null
      ? process.env.ETHEREUM_RPC
      : "https://eth-mainnet.alchemyapi.io/v2/50pap1Pw6npcNypxG15YCjj4W_K5kb3Z",
    {
      name: "ethereum",
      chainId: 1,
    },
  ),
  bsc: new ethers.providers.StaticJsonRpcProvider(
    process.env.BSC_RPC !== null && process.env.BSC_RPC !== undefined
      ? process.env.BSC_RPC
      : "https://bsc-dataseed.binance.org/",
    {
      name: "bsc",
      chainId: 56,
    },
  ),
  polygon: new ethers.providers.StaticJsonRpcProvider(
    process.env.POLYGON_RPC !== null && process.env.POLYGON_RPC !== undefined
      ? process.env.POLYGON_RPC
      : "https://rpc-mainnet.maticvigil.com/",
    {
      name: "polygon",
      chainId: 137,
    },
  ),
  heco: new ethers.providers.StaticJsonRpcProvider(
    process.env.HECO_RPC !== null && process.env.HECO_RPC !== undefined
      ? process.env.HECO_RPC
      : "https://http-mainnet.hecochain.com",
    {
      name: "heco",
      chainId: 128,
    },
  ),
  fantom: new ethers.providers.StaticJsonRpcProvider(
    process.env.FANTOM_RPC !== null && process.env.FANTOM_RPC !== undefined
      ? process.env.FANTOM_RPC
      : "https://rpc.ftm.tools/",
    {
      name: "fantom",
      chainId: 250,
    },
  ),
  rsk: new ethers.providers.StaticJsonRpcProvider(
    process.env.RSK_RPC !== null && process.env.RSK_RPC !== undefined
      ? process.env.RSK_RPC
      : "https://public-node.rsk.co",
    {
      name: "rsk",
      chainId: 30,
    },
  ),
  tomochain: new ethers.providers.StaticJsonRpcProvider(
    process.env.TOMOCHAIN_RPC !== null && process.env.TOMOCHAIN_RPC !== undefined
      ? process.env.TOMOCHAIN_RPC
      : "https://rpc.tomochain.com",
    {
      name: "tomochain",
      chainId: 88,
    },
  ),
  xdai: new ethers.providers.StaticJsonRpcProvider(
    process.env.XDAI_RPC !== null && process.env.XDAI_RPC !== undefined
      ? process.env.XDAI_RPC
      : "https://xdai.poanetwork.dev",
    {
      name: "xdai",
      chainId: 100,
    },
  ),
  avax: new ethers.providers.StaticJsonRpcProvider(
    process.env.AVAX_RPC !== null && process.env.AVAX_RPC !== undefined
      ? process.env.AVAX_RPC
      : "https://api.avax.network/ext/bc/C/rpc",
    {
      name: "avax",
      chainId: 43114,
    },
  ),
  wan: new ethers.providers.StaticJsonRpcProvider(
    process.env.WAN_RPC !== null && process.env.WAN_RPC !== undefined
      ? process.env.WAN_RPC
      : "https://gwan-ssl.wandevs.org:56891",
    {
      name: "wan",
      chainId: 888,
    },
  ),
  harmony: new ethers.providers.StaticJsonRpcProvider(
    process.env.HARMONY_RPC !== null && process.env.HARMONY_RPC !== undefined
      ? process.env.HARMONY_RPC
      : "https://api.s0.t.hmny.io",
    {
      name: "harmony",
      chainId: 1666600000,
    },
  ),
  thundercore: new ethers.providers.StaticJsonRpcProvider(
    process.env.THUNDERCORE_RPC !== null && process.env.HARMONY_RPC !== undefined
      ? process.env.HARMONY_RPC
      : "https://mainnet-rpc.thundercore.com",
    {
      name: "thundercore",
      chainId: 108,
    },
  ),
  okexchain: new ethers.providers.StaticJsonRpcProvider(
    process.env.OKEXCHAIN_RPC !== null && process.env.OKEXCHAIN_RPC !== undefined
      ? process.env.OKEXCHAIN_RPC
      : "https://exchainrpc.okex.org",
    {
      name: "okexchain",
      chainId: 66,
    },
  ),
};
export const MULTICALL_ADDRESS_MAINNET = "0xeefba1e63905ef1d7acba5a8513c70307c1ce441";
export const MULTICALL_ADDRESS_KOVAN = "0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a";
export const MULTICALL_ADDRESS_RINKEBY = "0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821";
export const MULTICALL_ADDRESS_GOERLI = "0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e";
export const MULTICALL_ADDRESS_POLYGON = "0x95028E5B8a734bb7E2071F96De89BABe75be9C8E";
export const MULTICALL_ADDRESS_BSC = "0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb";
export const MULTICALL_ADDRESS_FANTOM = "0xb828C456600857abd4ed6C32FAcc607bD0464F4F";
export const AGGREGATE_SELECTOR = "0x252dba42";

function resolveABI(providedAbi) {
  let abi = providedAbi;
  if (typeof abi === "string") {
    abi = catchedABIs[abi];
    if (abi === undefined) {
      throw new Error("ABI method undefined");
    }
  }
  // If type is omitted DP's sdk processes it fine but we don't, so we need to add it
  return {
    type: "function",
    ...abi,
  };
}

export function getProvider(chain = "ethereum") {
  return providers[chain];
}

function containsNamedResults(obj) {
  return Object.keys(obj).some(key => isNaN(Number(key))); // Are there any non-numeric keys?
}

function stringifyBigNumbers(result, final) {
  Object.keys(result).forEach(key => {
    try {
      final[key] = lodash.cloneDeep(result[key]);
      if (ethers.BigNumber.isBigNumber(result[key]) || typeof result[key] === "number") {
        final[key] = result[key].toString();
      }
      if (typeof final[key] === "object") {
        stringifyBigNumbers(result[key], final[key]);
      }
    } catch (e) {
      console.log(e);
    }
  });
}

function convertResults(results) {
  if (typeof results === "string" || typeof results === "boolean") {
    return results;
  }
  let convertedResults = {};
  if (results instanceof Array && !containsNamedResults(results)) {
    // Match every idiosynchrasy of the SDK
    convertedResults = [];
  }
  if (ethers.BigNumber.isBigNumber(results) || typeof results === "number") {
    convertedResults = results.toString();
  } else {
    stringifyBigNumbers(results, convertedResults);
  }
  if (results instanceof Array) {
    if (results.length === 1) {
      return convertedResults[0];
    }
    // Some calls return the extra __length__ parameter (I think when some results are named)
    if (containsNamedResults(convertedResults)) {
      convertedResults.__length__ = results.length;
    }
  }
  return convertedResults;
}

function multicallAddress(chainId) {
  switch (chainId) {
    case 1:
      return MULTICALL_ADDRESS_MAINNET;
    case 42:
      return MULTICALL_ADDRESS_KOVAN;
    case 4:
      return MULTICALL_ADDRESS_RINKEBY;
    case 5:
      return MULTICALL_ADDRESS_GOERLI;
    case 137:
      return MULTICALL_ADDRESS_POLYGON;
    case 56:
      return MULTICALL_ADDRESS_BSC;
    case 250:
      return MULTICALL_ADDRESS_FANTOM;
    default:
      return null;
  }
}

async function multicallAddressOrThrow(chain) {
  const network = await getProvider(chain).getNetwork();
  const address = multicallAddress(network.chainId);
  if (address === null) {
    const msg = `multicall is not available on the network ${network.chainId}`;
    console.error(msg);
    throw new Error(msg);
  }
  return address;
}

async function networkSupportsMulticall(chain) {
  const network = await getProvider(chain).network;
  const address = multicallAddress(network.chainId);
  return address !== null;
}

async function executeCalls(contractCalls, chain, block) {
  if (await networkSupportsMulticall(chain)) {
    try {
      const multicallData = ethers.utils.defaultAbiCoder.encode(
        [
          ethers.utils.ParamType.fromObject({
            components: [
              { name: "target", type: "address" },
              { name: "callData", type: "bytes" },
            ],
            name: "data",
            type: "tuple[]",
          }),
        ],
        [contractCalls.map(call => [call.to, call.data])],
      );
      const address = await multicallAddressOrThrow(chain);

      const callData = AGGREGATE_SELECTOR + multicallData.substr(2);

      const tx = {
        to: address,
        data: callData,
      };

      const returnData = await getProvider(chain).call(tx, block !== null && block !== undefined ? block : "latest");

      const [blockNumber, returnValues] = ethers.utils.defaultAbiCoder.decode(["uint256", "bytes[]"], returnData);
      return returnValues;
    } catch (e) {
      if (!process.env.DEFILLAMA_SDK_MUTED) {
        console.log("Multicall failed, defaulting to single transactions...");
      }
    }
  }
  const values = await Promise.all(
    contractCalls.map(async call => {
      try {
        return await getProvider(chain).call(
          { to: call.to, data: call.data },
          block !== null && block !== undefined ? block : "latest",
        );
      } catch (e) {
        return null;
      }
    }),
  );
  return values;
}

export async function makeMultiCall(functionABI, calls, chain, block) {
  const contractInterface = new ethers.utils.Interface([functionABI]);
  const fd = Object.values(contractInterface.functions)[0];

  const contractCalls = calls.map(call => {
    const data = contractInterface.encodeFunctionData(fd, call.params);
    return {
      to: call.contract,
      data,
    };
  });

  const returnValues = await executeCalls(contractCalls, chain, block);

  return returnValues.map((values, index) => {
    let output;
    try {
      output = convertResults(contractInterface.decodeFunctionResult(fd, values));
    } catch (e) {
      output = null;
    }
    return {
      input: {
        params: calls[index].params,
        target: calls[index].contract,
      },
      success: output !== null,
      output,
    };
  });
}

function normalizeParams(params) {
  if (params === undefined) {
    return [];
  }
  if (typeof params === "object") {
    return params;
  }
  return [params];
}

// multiCall
export async function multiCall(params) {
  const abi = resolveABI(params.abi);
  const contractCalls = params.calls.map((call, index) => {
    const callParams = normalizeParams(call.params);
    return {
      params: callParams,
      contract: call.target !== null && call.target !== undefined ? call.target : params.target, // call.target ?? params.target,
    };
  });
  // Only a max of around 500 calls are supported by multicall, we have to split bigger batches
  let multicallCalls = [];
  let result = [];
  for (let i = 0; i < contractCalls.length; i += 500) {
    const pendingResult = makeMultiCall(
      abi,
      contractCalls.slice(i, i + 500),
      params.chain !== null && params.chain !== undefined ? params.chain : "ethereum",
      params.block,
    ).then(partialCalls => {
      result = result.concat(partialCalls);
    });
    multicallCalls.push(pendingResult);
    if (i % 20000) {
      await Promise.all(multicallCalls); // It would be faster to just await on all of them, but if we do that at some point node crashes without error message, so to prevent that we have to periodically await smaller sets of calls
      multicallCalls = []; // Clear them from memory
    }
  }
  await Promise.all(multicallCalls);
  return {
    output: result,
  };
}

export const TEN = ethers.BigNumber.from(10);
export function handleDecimals(num, decimals) {
  if (decimals === undefined) {
    return num.toString();
  }
  return num.div(TEN.pow(decimals)).toString();
}

// getBalance
export async function getBalance(params) {
  const balance = await getProvider("polygon").getBalance(params.target, params.block);
  return {
    output: handleDecimals(balance, params.decimals),
  };
}

// sumMultiBalanceOf
export function sumMultiBalanceOf(balances, results, allCallsMustBeSuccessful, transformAddress) {
  results.output.map(result => {
    if (result.success) {
      const address = transformAddress(result.input.target);
      const balance = result.output;

      if (ethers.BigNumber.from(balance).lte(0)) {
        return;
      }

      balances[address] = ethers.BigNumber.from(
        balances[address] !== null && balances[address] !== undefined ? balances[address] : 0,
      )
        .add(balance)
        .toString();
    } else if (allCallsMustBeSuccessful) {
      console.error(result);
      throw new Error(`balanceOf multicall failed`);
    }
  });
}
