import {
  programs,
  actions,
  Wallet,
  MetadataJson,
  MetadataJsonCreator,
  MetadataJsonProperties,
  MetadataJsonFile,
} from "@metaplex/js";

import { PublicKey, Transaction, Connection } from "@solana/web3.js";
import { IMetadataExtension } from "../../interfaces";
import BN from "bn.js";

const {
  metadata: {
    Metadata,
    MasterEdition,
    MetadataDataData,
    CreateMetadata,
    CreateMasterEdition,
    Creator,
  },
} = programs;

export const mintNFT = async (
  publicKey: PublicKey,
  signAllTransactions: (transaction: Transaction[]) => Promise<Transaction[]>,
  signTransaction: (transaction: Transaction) => Promise<Transaction>,
  connection: Connection,
  attributes: IMetadataExtension
): Promise<actions.MintNFTResponse> => {
  try {
    console.log("---------- minting NFT --------");

    const wallet: Wallet = {
      publicKey: publicKey,
      signTransaction: signTransaction,
      signAllTransactions: signAllTransactions,
    };
    console.log("wallet => ", wallet);

    const metaDataFile: MetadataJsonFile[] = attributes.properties.files;

    console.log("metaDataFile => ", metaDataFile);

    const metaDataCreator: MetadataJsonCreator[] = attributes.creators;

    console.log("metaDataCreator => ", metaDataCreator);

    const metaDataProperties: MetadataJsonProperties = {
      files: metaDataFile,
      category: attributes.properties.category,
      creators: metaDataCreator,
    };

    console.log("metaDataProperties => ", metaDataProperties);

    const metaData: MetadataJson = {
      name: attributes.name,
      symbol: attributes.symbol,
      description: attributes.description,
      seller_fee_basis_points: attributes.seller_fee_basis_points,
      image: attributes.image,
      properties: metaDataProperties,
    };

    console.log("metaData => ", metaData);
    const maxSupply: number = attributes.properties.maxSupply;

    console.log("maxSupply => ", maxSupply);

    console.log("connection =>", connection);
    console.log("wallet.publicKey => ", wallet.publicKey);

    const { mint, createMintTx, createAssociatedTokenAccountTx, mintToTx } =
      await actions.prepareTokenAccountAndMintTxs(connection, wallet.publicKey);

    console.log("mint => ", mint);
    console.log("createMintTx => ", createMintTx);
    console.log(
      "createAssociatedTokenAccountTx => ",
      createAssociatedTokenAccountTx
    );
    console.log("mintToTx => ", mintToTx);

    const metadataPDA = await Metadata.getPDA(mint.publicKey);
    console.log("metadataPDA => ", metadataPDA);

    const editionPDA = await MasterEdition.getPDA(mint.publicKey);
    console.log("editionPDA => ", editionPDA);

    const {
      name,
      symbol,
      seller_fee_basis_points,
      properties: { creators },
    } = metaData;
    console.log("name => ", name);
    console.log("symbol => ", symbol);
    console.log("seller_fee_basis_points => ", seller_fee_basis_points);
    console.log("creators => ", creators);

    const creatorsData = creators.reduce((memo, { address, share }) => {
      const verified = address === wallet.publicKey.toString();

      const creator = new Creator({
        address,
        share,
        verified,
      });

      memo = [...memo, creator];

      return memo;
    }, []);

    console.log("creatorsData =>", creatorsData);

    const metadataData = new MetadataDataData({
      name: name,
      symbol: symbol,
      uri: metaDataFile[0].uri,
      sellerFeeBasisPoints: seller_fee_basis_points,
      creators: creatorsData,
    });

    console.log("metadataData => ", metadataData);

    const createMetadataTx = new CreateMetadata(
      {
        feePayer: wallet.publicKey,
      },
      {
        metadata: metadataPDA,
        metadataData: metadataData,
        updateAuthority: wallet.publicKey,
        mint: mint.publicKey,
        mintAuthority: wallet.publicKey,
      }
    );

    console.log("createMetadataTx => ", createMetadataTx);

    const masterEditionTx = new CreateMasterEdition(
      { feePayer: wallet.publicKey },
      {
        edition: editionPDA,
        metadata: metadataPDA,
        updateAuthority: wallet.publicKey,
        mint: mint.publicKey,
        mintAuthority: wallet.publicKey,
        maxSupply: maxSupply || maxSupply === 0 ? new BN(maxSupply) : null,
      }
    );

    console.log("masterEditionTx => ", masterEditionTx);

    const txId = await actions.sendTransaction({
      connection,
      signers: [mint],
      txs: [
        createMintTx,
        createMetadataTx,
        createAssociatedTokenAccountTx,
        mintToTx,
        masterEditionTx,
      ],
      wallet,
    });

    const mintRes: actions.MintNFTResponse = {
      txId: txId,
      mint: mint.publicKey,
      metadata: metadataPDA,
      edition: editionPDA,
    };

    return mintRes;
  } catch (error) {
    console.log(" error in mintNFT => ", error);
    return null;
  }
};
