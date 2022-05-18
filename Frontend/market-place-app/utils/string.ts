import { PublicKey } from "@solana/web3.js";

export const cleanName = (name?: string): string | undefined => {
  if (!name) {
    return undefined;
  }

  return name.replace(/\s+/g, "-");
};

export const getLast = <T>(arr: T[]) => {
  if (arr.length <= 0) {
    return undefined;
  }

  return arr[arr.length - 1];
};

export const pubkeyToString = (key: PublicKey | null | string = "") => {
  return typeof key === "string" ? key : key?.toBase58() || "";
};

// shorten the checksummed version of the input address to have 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

const PubKeysInternedMap = new Map<string, PublicKey>();

export const toPublicKey = (key: string | PublicKey) => {
  if (typeof key !== "string") {
    return key;
  }

  let result = PubKeysInternedMap.get(key);
  if (!result) {
    try {
      result = new PublicKey(key);
      PubKeysInternedMap.set(key, result);
    } catch (error) {
      console.warn(toPublicKey.name, " ", error);
      return result;
    }
  }

  return result;
};
