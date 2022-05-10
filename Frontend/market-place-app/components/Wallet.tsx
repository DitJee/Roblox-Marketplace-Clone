import React, { FC, useMemo } from 'react';

// Use require instead of import since order matters
require('@solana/wallet-adapter-react-ui/styles.css');

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Wallet: FC = () => {
  return (
    <div>
      <WalletMultiButton />
    </div>
  );
};

export default Wallet;
