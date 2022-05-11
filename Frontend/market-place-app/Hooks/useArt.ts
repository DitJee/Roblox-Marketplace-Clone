import { useEffect, useState } from "react";
import { StringPublicKey } from "../interfaces";

// export const useArt = (key?: StringPublicKey) => {
//   const { metadata, editions, masterEditions, whitelistedCreatorsByCreator } =
//     useMeta();

//   const account = useMemo(
//     () => metadata.find((a) => a.pubkey === key),
//     [key, metadata]
//   );

//   const art = useMemo(
//     () =>
//       metadataToArt(
//         account?.info,
//         editions,
//         masterEditions,
//         whitelistedCreatorsByCreator
//       ),
//     [account, editions, masterEditions, whitelistedCreatorsByCreator]
//   );

//   return art;
// };

// export const useExtendedArt = (id?: StringPublicKey) => {
//   const { metadata } = useMeta();

//   const [data, setData] = useState<IMetadataExtension>();
//   const { ref, inView } = useInView();
//   const localStorage = useLocalStorage();

//   const key = pubkeyToString(id);

//   const account = useMemo(
//     () => metadata.find((a) => a.pubkey === key),
//     [key, metadata]
//   );

//   useEffect(() => {
//     if (inView && id && !data) {
//       const USE_CDN = false;
//       const routeCDN = (uri: string) => {
//         let result = uri;
//         if (USE_CDN) {
//           result = uri.replace(
//             "https://arweave.net/",
//             "https://coldcdn.com/api/cdn/bronil/"
//           );
//         }

//         return result;
//       };

//       if (account && account.info.data.uri) {
//         const uri = routeCDN(account.info.data.uri);

//         const processJson = (extended: any) => {
//           if (!extended || extended?.properties?.files?.length === 0) {
//             return;
//           }

//           if (extended?.image) {
//             const file = extended.image.startsWith("http")
//               ? extended.image
//               : `${account.info.data.uri}/${extended.image}`;
//             extended.image = routeCDN(file);
//           }

//           return extended;
//         };

//         try {
//           const cached = localStorage.getItem(uri);
//           if (cached) {
//             setData(processJson(JSON.parse(cached)));
//           } else {
//             // TODO: BL handle concurrent calls to avoid double query
//             fetch(uri)
//               .then(async (_) => {
//                 try {
//                   const data = await _.json();
//                   try {
//                     localStorage.setItem(uri, JSON.stringify(data));
//                   } catch {
//                     // ignore
//                   }
//                   setData(processJson(data));
//                 } catch {
//                   return undefined;
//                 }
//               })
//               .catch(() => {
//                 return undefined;
//               });
//           }
//         } catch (ex) {
//           console.error(ex);
//         }
//       }
//     }
//   }, [inView, id, data, setData, account]);

//   return { ref, data };
// };

const cachedImages = new Map<string, string>();
export const useCachedImage = (uri: string, cacheMesh?: boolean) => {
  const [cachedBlob, setCachedBlob] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!uri) {
      return;
    }

    const result = cachedImages.get(uri);
    if (result) {
      setCachedBlob(result);
      return;
    }

    (async () => {
      let response: Response;
      try {
        response = await fetch(uri, { cache: "force-cache" });
      } catch {
        try {
          response = await fetch(uri, { cache: "reload" });
        } catch {
          // If external URL, just use the uri
          if (uri?.startsWith("http")) {
            setCachedBlob(uri);
          }
          setIsLoading(false);
          return;
        }
      }

      const blob = await response.blob();

      const blobURI = URL.createObjectURL(blob);
      cachedImages.set(uri, blobURI);
      setCachedBlob(blobURI);
      setIsLoading(false);
    })();
  }, [uri, setCachedBlob, setIsLoading]);

  return { cachedBlob, isLoading };
};
