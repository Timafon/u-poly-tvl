import React from "react";
import { ethers } from "ethers";
import { Button, Tabs, Row, Col, Input } from "antd";

// can do hook for work with UPIT contracts and connect one time
export const UPITAddress = "0xc4e494924b32c0bA008e9fEB5Cf273301FBDd9b9";
export const UPITABI = [
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "expirationTimestamp", type: "uint256" },
          { internalType: "uint256", name: "withdrawalLiveness", type: "uint256" },
          { internalType: "address", name: "collateralAddress", type: "address" },
          { internalType: "address", name: "tokenAddress", type: "address" },
          { internalType: "address", name: "finderAddress", type: "address" },
          { internalType: "address", name: "timerAddress", type: "address" },
          { internalType: "address", name: "financialProductLibraryAddress", type: "address" },
          { internalType: "bytes32", name: "priceFeedIdentifier", type: "bytes32" },
          {
            components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
            internalType: "struct FixedPoint.Unsigned",
            name: "minSponsorTokens",
            type: "tuple",
          },
          { internalType: "uint256", name: "liquidationLiveness", type: "uint256" },
          {
            components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
            internalType: "struct FixedPoint.Unsigned",
            name: "collateralRequirement",
            type: "tuple",
          },
          {
            components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
            internalType: "struct FixedPoint.Unsigned",
            name: "disputeBondPercentage",
            type: "tuple",
          },
          {
            components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
            internalType: "struct FixedPoint.Unsigned",
            name: "sponsorDisputeRewardPercentage",
            type: "tuple",
          },
          {
            components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
            internalType: "struct FixedPoint.Unsigned",
            name: "disputerDisputeRewardPercentage",
            type: "tuple",
          },
        ],
        internalType: "struct Liquidatable.ConstructorParams",
        name: "params",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: "address", name: "caller", type: "address" }],
    name: "ContractExpired",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sponsor", type: "address" },
      { indexed: true, internalType: "uint256", name: "collateralAmount", type: "uint256" },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "caller", type: "address" },
      { indexed: true, internalType: "address", name: "sponsor", type: "address" },
      { indexed: true, internalType: "address", name: "liquidator", type: "address" },
      { indexed: false, internalType: "address", name: "disputer", type: "address" },
      { indexed: false, internalType: "uint256", name: "liquidationId", type: "uint256" },
      { indexed: false, internalType: "bool", name: "disputeSucceeded", type: "bool" },
    ],
    name: "DisputeSettled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "caller", type: "address" },
      { indexed: false, internalType: "uint256", name: "originalExpirationTimestamp", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "shutdownTimestamp", type: "uint256" },
    ],
    name: "EmergencyShutdown",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: "address", name: "sponsor", type: "address" }],
    name: "EndedSponsorPosition",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: "uint256", name: "amount", type: "uint256" }],
    name: "FinalFeesPaid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sponsor", type: "address" },
      { indexed: true, internalType: "address", name: "liquidator", type: "address" },
      { indexed: true, internalType: "uint256", name: "liquidationId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "tokensOutstanding", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "lockedCollateral", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "liquidatedCollateral", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "liquidationTime", type: "uint256" },
    ],
    name: "LiquidationCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sponsor", type: "address" },
      { indexed: true, internalType: "address", name: "liquidator", type: "address" },
      { indexed: true, internalType: "address", name: "disputer", type: "address" },
      { indexed: false, internalType: "uint256", name: "liquidationId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "disputeBondAmount", type: "uint256" },
    ],
    name: "LiquidationDisputed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "caller", type: "address" },
      { indexed: false, internalType: "uint256", name: "paidToLiquidator", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "paidToDisputer", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "paidToSponsor", type: "uint256" },
      { indexed: true, internalType: "enum Liquidatable.Status", name: "liquidationStatus", type: "uint8" },
      { indexed: false, internalType: "uint256", name: "settlementPrice", type: "uint256" },
    ],
    name: "LiquidationWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: "address", name: "sponsor", type: "address" }],
    name: "NewSponsor",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sponsor", type: "address" },
      { indexed: true, internalType: "uint256", name: "collateralAmount", type: "uint256" },
      { indexed: true, internalType: "uint256", name: "tokenAmount", type: "uint256" },
    ],
    name: "PositionCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sponsor", type: "address" },
      { indexed: true, internalType: "uint256", name: "collateralAmount", type: "uint256" },
      { indexed: true, internalType: "uint256", name: "tokenAmount", type: "uint256" },
    ],
    name: "Redeem",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "regularFee", type: "uint256" },
      { indexed: true, internalType: "uint256", name: "lateFee", type: "uint256" },
    ],
    name: "RegularFeesPaid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sponsor", type: "address" },
      { indexed: true, internalType: "uint256", name: "numTokensRepaid", type: "uint256" },
      { indexed: true, internalType: "uint256", name: "newTokenCount", type: "uint256" },
    ],
    name: "Repay",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: "address", name: "oldSponsor", type: "address" }],
    name: "RequestTransferPosition",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: "address", name: "oldSponsor", type: "address" }],
    name: "RequestTransferPositionCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "oldSponsor", type: "address" },
      { indexed: true, internalType: "address", name: "newSponsor", type: "address" },
    ],
    name: "RequestTransferPositionExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sponsor", type: "address" },
      { indexed: true, internalType: "uint256", name: "collateralAmount", type: "uint256" },
    ],
    name: "RequestWithdrawal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sponsor", type: "address" },
      { indexed: true, internalType: "uint256", name: "collateralAmount", type: "uint256" },
    ],
    name: "RequestWithdrawalCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sponsor", type: "address" },
      { indexed: true, internalType: "uint256", name: "collateralAmount", type: "uint256" },
    ],
    name: "RequestWithdrawalExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "caller", type: "address" },
      { indexed: true, internalType: "uint256", name: "collateralReturned", type: "uint256" },
      { indexed: true, internalType: "uint256", name: "tokensBurned", type: "uint256" },
    ],
    name: "SettleExpiredPosition",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sponsor", type: "address" },
      { indexed: true, internalType: "uint256", name: "collateralAmount", type: "uint256" },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "_collateralAddress", type: "address" }],
    name: "_getSyntheticDecimals",
    outputs: [{ internalType: "uint8", name: "decimals", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "cancelTransferPosition", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "cancelWithdrawal", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "collateralCurrency",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "collateralRequirement",
    outputs: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractState",
    outputs: [{ internalType: "enum PricelessPositionManager.ContractState", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "collateralAmount",
        type: "tuple",
      },
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "numTokens",
        type: "tuple",
      },
    ],
    name: "create",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "sponsor", type: "address" },
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "minCollateralPerToken",
        type: "tuple",
      },
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "maxCollateralPerToken",
        type: "tuple",
      },
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "maxTokensToLiquidate",
        type: "tuple",
      },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "createLiquidation",
    outputs: [
      { internalType: "uint256", name: "liquidationId", type: "uint256" },
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "tokensLiquidated",
        type: "tuple",
      },
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "finalFeeBond",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "cumulativeFeeMultiplier",
    outputs: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "collateralAmount",
        type: "tuple",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "sponsor", type: "address" },
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "collateralAmount",
        type: "tuple",
      },
    ],
    name: "depositTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "liquidationId", type: "uint256" },
      { internalType: "address", name: "sponsor", type: "address" },
    ],
    name: "dispute",
    outputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "totalPaid",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "disputeBondPercentage",
    outputs: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "disputerDisputeRewardPercentage",
    outputs: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "emergencyShutdown", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "expirationTimestamp",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "expire", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "expiryPrice",
    outputs: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "financialProductLibrary",
    outputs: [{ internalType: "contract FinancialProductLibrary", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "finder",
    outputs: [{ internalType: "contract FinderInterface", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "sponsor", type: "address" }],
    name: "getCollateral",
    outputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "sponsor", type: "address" }],
    name: "getLiquidations",
    outputs: [
      {
        components: [
          { internalType: "address", name: "sponsor", type: "address" },
          { internalType: "address", name: "liquidator", type: "address" },
          { internalType: "enum Liquidatable.Status", name: "state", type: "uint8" },
          { internalType: "uint256", name: "liquidationTime", type: "uint256" },
          {
            components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
            internalType: "struct FixedPoint.Unsigned",
            name: "tokensOutstanding",
            type: "tuple",
          },
          {
            components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
            internalType: "struct FixedPoint.Unsigned",
            name: "lockedCollateral",
            type: "tuple",
          },
          {
            components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
            internalType: "struct FixedPoint.Unsigned",
            name: "liquidatedCollateral",
            type: "tuple",
          },
          {
            components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
            internalType: "struct FixedPoint.Unsigned",
            name: "rawUnitCollateral",
            type: "tuple",
          },
          { internalType: "address", name: "disputer", type: "address" },
          {
            components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
            internalType: "struct FixedPoint.Unsigned",
            name: "settlementPrice",
            type: "tuple",
          },
          {
            components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
            internalType: "struct FixedPoint.Unsigned",
            name: "finalFee",
            type: "tuple",
          },
        ],
        internalType: "struct Liquidatable.LiquidationData[]",
        name: "liquidationData",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "time", type: "uint256" }],
    name: "getOutstandingRegularFees",
    outputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "regularFee",
        type: "tuple",
      },
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "latePenalty",
        type: "tuple",
      },
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "totalPaid",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "gulp", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "liquidationLiveness",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "liquidations",
    outputs: [
      { internalType: "address", name: "sponsor", type: "address" },
      { internalType: "address", name: "liquidator", type: "address" },
      { internalType: "enum Liquidatable.Status", name: "state", type: "uint8" },
      { internalType: "uint256", name: "liquidationTime", type: "uint256" },
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "tokensOutstanding",
        type: "tuple",
      },
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "lockedCollateral",
        type: "tuple",
      },
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "liquidatedCollateral",
        type: "tuple",
      },
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "rawUnitCollateral",
        type: "tuple",
      },
      { internalType: "address", name: "disputer", type: "address" },
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "settlementPrice",
        type: "tuple",
      },
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "finalFee",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minSponsorTokens",
    outputs: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "payRegularFees",
    outputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pfc",
    outputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "positions",
    outputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "tokensOutstanding",
        type: "tuple",
      },
      { internalType: "uint256", name: "withdrawalRequestPassTimestamp", type: "uint256" },
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "withdrawalRequestAmount",
        type: "tuple",
      },
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "rawCollateral",
        type: "tuple",
      },
      { internalType: "uint256", name: "transferPositionRequestPassTimestamp", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceIdentifier",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rawLiquidationCollateral",
    outputs: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rawTotalPositionCollateral",
    outputs: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "numTokens",
        type: "tuple",
      },
    ],
    name: "redeem",
    outputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "amountWithdrawn",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [], name: "remargin", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "numTokens",
        type: "tuple",
      },
    ],
    name: "repay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [], name: "requestTransferPosition", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "collateralAmount",
        type: "tuple",
      },
    ],
    name: "requestWithdrawal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "time", type: "uint256" }],
    name: "setCurrentTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "settleExpired",
    outputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "amountWithdrawn",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sponsorDisputeRewardPercentage",
    outputs: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "timerAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenCurrency",
    outputs: [{ internalType: "contract ExpandedIERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalPositionCollateral",
    outputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalTokensOutstanding",
    outputs: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newSponsorAddress", type: "address" }],
    name: "transferPositionPassedRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "price",
        type: "tuple",
      },
    ],
    name: "transformCollateralRequirement",
    outputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "price",
        type: "tuple",
      },
      { internalType: "uint256", name: "requestTime", type: "uint256" },
    ],
    name: "transformPrice",
    outputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "requestTime", type: "uint256" }],
    name: "transformPriceIdentifier",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "collateralAmount",
        type: "tuple",
      },
    ],
    name: "withdraw",
    outputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "amountWithdrawn",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "liquidationId", type: "uint256" },
      { internalType: "address", name: "sponsor", type: "address" },
    ],
    name: "withdrawLiquidation",
    outputs: [
      {
        components: [
          {
            components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
            internalType: "struct FixedPoint.Unsigned",
            name: "payToSponsor",
            type: "tuple",
          },
          {
            components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
            internalType: "struct FixedPoint.Unsigned",
            name: "payToLiquidator",
            type: "tuple",
          },
          {
            components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
            internalType: "struct FixedPoint.Unsigned",
            name: "payToDisputer",
            type: "tuple",
          },
          {
            components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
            internalType: "struct FixedPoint.Unsigned",
            name: "paidToSponsor",
            type: "tuple",
          },
          {
            components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
            internalType: "struct FixedPoint.Unsigned",
            name: "paidToLiquidator",
            type: "tuple",
          },
          {
            components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
            internalType: "struct FixedPoint.Unsigned",
            name: "paidToDisputer",
            type: "tuple",
          },
        ],
        internalType: "struct Liquidatable.RewardsData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawPassedRequest",
    outputs: [
      {
        components: [{ internalType: "uint256", name: "rawValue", type: "uint256" }],
        internalType: "struct FixedPoint.Unsigned",
        name: "amountWithdrawn",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawalLiveness",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

function MintPanel({ address, signer }) {
  console.log("signer: ", signer);
  const UPITContract = React.useMemo(() => new ethers.Contract(UPITAddress, UPITABI, signer), [signer]);
  const [numTokens, setNumTokens] = React.useState("");
  const [collateralAmount, setCollateralAmount] = React.useState("");

  // console.log("utils.formatBytes32String: ", ethers.utils.formatBytes32String(numTokens));
  // console.log("utils.BigNumber: ", ethers.BigNumber.from(ethers.utils.formatBytes32String(numTokens)));
  // console.log("utils.keccak256: ", ethers.utils.keccak256(ethers.utils.formatBytes32String(numTokens)));
  // console.log("BigNumber.from: ", ethers.BigNumber.from(numTokens));
  // console.log("utils.keccak256: ", ethers.utils.keccak256(numTokens));
  console.log(
    "ethers.utils.formatBytes32String(collateralAmount): ",
    ethers.utils.formatBytes32String(collateralAmount),
  );
  const handleApprove = React.useCallback(() => {
    UPITContract.create(
      [ethers.BigNumber.from(ethers.utils.formatBytes32String(collateralAmount))],
      [ethers.BigNumber.from(ethers.utils.formatBytes32String(numTokens))],
    )
      .then(res => console.log("UPITContract.create res: ", res))
      .catch(err => console.log("UPITContract.create err: ", err));
  }, [UPITContract, collateralAmount, numTokens]);

  return (
    <Col>
      <Row>
        <Input placeholder="0.00 UPIT Tokens" value={numTokens} onChange={e => setNumTokens(e.target.value)} />
      </Row>
      <Row>
        <Input
          placeholder="0.00 USDC Collateral"
          value={collateralAmount}
          onChange={e => setCollateralAmount(e.target.value)}
        />
      </Row>
      <Row>
        <Button onClick={handleApprove}>Approve</Button>
      </Row>
    </Col>
  );
}

export function Collateral({ address, signer }) {
  const [tab, setTab] = React.useState(0);

  return (
    <Tabs defaultActiveKey={0} onChange={setTab}>
      <Tabs.TabPane tab="Mint" key={0}>
        <MintPanel address={address} signer={signer} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Deposit" key={1}>
        Deposit soon
      </Tabs.TabPane>
      <Tabs.TabPane tab="Withdraw" key={2}>
        Withdraw soon
      </Tabs.TabPane>
      <Tabs.TabPane tab="Redeem" key={3}>
        Redeem soon
      </Tabs.TabPane>
    </Tabs>
  );
}
