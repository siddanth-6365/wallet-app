import {useRecoilValue} from "recoil"
import {balanceAtom} from "../atom/balance"

export const useBalance = () => {
  return useRecoilValue(balanceAtom);
};

