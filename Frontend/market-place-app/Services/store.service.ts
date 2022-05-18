import { StoreInfo } from "../interfaces";

export const LAMPORT_MULTIPLIER = 10 ** 9;
const WINSTON_MULTIPLIER = 10 ** 12;

export const MAX_NAME_LENGTH = 32;

export const MAX_SYMBOL_LENGTH = 10;

export const MAX_URI_LENGTH = 200;

export const MAX_CREATOR_LIMIT = 5;

export const MAX_CREATOR_LEN = 32 + 1 + 1;
export const MAX_METADATA_LEN =
  1 +
  32 +
  32 +
  MAX_NAME_LENGTH +
  MAX_SYMBOL_LENGTH +
  MAX_URI_LENGTH +
  MAX_CREATOR_LIMIT * MAX_CREATOR_LEN +
  2 +
  1 +
  1 +
  198;

class StoreHelper {
  public static GetAPIPrefix(): StoreInfo {
    return {
      storeId: "AgJYWKrNJArwdLuhrhEfRiSZT7rbCgSjvhjaFzeaqM5d",
      txId: "2Smtj2hQNjN9YqZYPcqL1HAhsVFnR4irBC4cEBbvewe3xRHA9257uiNqtMQt6JmTR5YFczG8LfDfP6xQrgZqQzUE",
    };
  }

  public static getAssetCostToStore = async (files: File[]) => {
    // get total bytes
    const totalBytes = files.reduce((sum, f) => (sum += f.size), 0);
    console.log("Total bytes", totalBytes);

    // get transcation fee
    const txnFeeInWinstons = parseInt(
      await (await fetch("https://arweave.net/price/0")).text()
    );
    console.log("txn fee", txnFeeInWinstons);

    // get byte cost
    const byteCostInWinstons = parseInt(
      await (
        await fetch("https://arweave.net/price/" + totalBytes.toString())
      ).text()
    );
    console.log("byte cost", byteCostInWinstons);

    // calculate total AR cost
    const totalArCost =
      (txnFeeInWinstons * files.length + byteCostInWinstons) /
      WINSTON_MULTIPLIER;

    console.log("total ar", totalArCost);

    let conversionRates = JSON.parse(
      localStorage.getItem("conversionRates") || "{}"
    );

    if (
      !conversionRates ||
      !conversionRates.expiry ||
      conversionRates.expiry < Date.now()
    ) {
      console.log("Calling conversion rate");

      // get the new conversion rate
      conversionRates = {
        value: JSON.parse(
          await (
            await fetch(
              "https://api.coingecko.com/api/v3/simple/price?ids=solana,arweave&vs_currencies=usd"
            )
          ).text()
        ),
        expiry: Date.now() + 5 * 60 * 1000,
      };

      if (conversionRates.value.solana) {
        try {
          localStorage.setItem(
            "conversionRates",
            JSON.stringify(conversionRates)
          );
        } catch (err) {
          console.warn("error when fetching the new conversion rate => ", err);
        }
      }
    }
    // To figure out how many lamports are required, multiply ar byte cost by this number
    const arMultiplier =
      conversionRates.value.arweave.usd / conversionRates.value.solana.usd;
    console.log("Ar mult", arMultiplier);

    // We also always make a manifest file, which, though tiny, needs payment.
    return LAMPORT_MULTIPLIER * totalArCost * arMultiplier * 1.1;
  };
}

export default StoreHelper;
