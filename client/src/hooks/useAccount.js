import { useCallback, useState } from 'react';
import { getAccount, saveAccount } from '../lib/account';

export default function useAccount() {
  const [account, setAccount] = useState(getAccount);

  const updateAccount = useCallback((changes) => {
    setAccount((current) => {
      const next = { ...current, ...changes };
      saveAccount(next);
      return next;
    });
  }, []);

  return [account, updateAccount];
}
