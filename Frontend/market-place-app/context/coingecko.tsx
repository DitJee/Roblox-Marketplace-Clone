import { rejects } from "assert";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

export const COINGECKO_POOL_INTERVAL = 1000 * 60; // 60 sec
export const COINGECKO_API = "https://api.coingecko.com/api/v3/";
export const COINGECKO_COIN_PRICE_API = `${COINGECKO_API}simple/price`;
export interface CoingeckoContextState {
  solPrice: number;
}

export const solToUSD = async () => {
  try {
    const url = `${COINGECKO_COIN_PRICE_API}?ids=solana&vs_currencies=usd`;
    const resp = await axios.get(url);
    const solPriceinUsd = resp.data.solana.usd;
    return solPriceinUsd;
  } catch (error) {
    console.warn(
      "an error occurred when fetching for solana price in USD =>",
      error
    );
    return null;
  }
};
