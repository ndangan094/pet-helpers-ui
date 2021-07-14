import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import Web3 from "web3";
import { CONTRACT_ADDRESS, DEFAULT_PROVIDER, GECKO_API_ENDPOINT, MULTI_SUPPORT_ABI, MULTI_SUPPORT_CONTRACT_ADDRESS } from "../constants";
import {formatInputNumber, handleError} from "../ultis";
import {
  initialContract,
  initialFarmingPoolContract,
  initialFarmingSotaContract,
  initialTokenContract,
} from "../ultis/initialContract";
import { useUIContext } from "../_layout/nftpad-ui-context";
import { useWeb3 } from "./ultis.hook";

const INTERVAL_DURATION_UPDATE = 15000

export const useBalance = (trigger = false) => {
  const [balance, setBalance] = useState({
    point: 0,
    sota: 0,
    sotaLP: 0,
  });

  const UIContext = useUIContext();
  const { address, currentChain } = UIContext;
  const web3 = useWeb3();

  const getBalance = async () => {
    try {
    if (!address || !currentChain) return;

    const currentABI = MULTI_SUPPORT_ABI[`${currentChain.chainId}`].nftpadABI
    const currentContractAddress = MULTI_SUPPORT_CONTRACT_ADDRESS[`${currentChain.chainId}`].staking
    const sotaContractAddress = MULTI_SUPPORT_CONTRACT_ADDRESS[`${currentChain.chainId}`].sota
    const sotaLPContractAddress = MULTI_SUPPORT_CONTRACT_ADDRESS[`${currentChain.chainId}`].sotaLP

    const hecoConst = new web3.eth.Contract(
      currentABI as any,
      currentContractAddress
    );

    const result = await Promise.all([
      await hecoConst.methods.userPoints(address).call(),
      await hecoConst.methods
      .userStakedBalance(address, sotaContractAddress)
      .call(),
      await hecoConst.methods
      .userStakedBalance(address, sotaLPContractAddress)
      .call()
    ])

    return {
      point: parseFloat(Web3.utils.fromWei(`${result[0]}`, "ether")) / 100,
      sota: parseFloat(Web3.utils.fromWei(`${result[1]}`, "ether")),
      sotaLP: parseFloat(Web3.utils.fromWei(`${result[2]}`, "ether"))
    };
  } catch (err) {
    return {
      point: undefined,
      sota: 0,
      sotaLP: 0
    }
  }
  };

  useEffect(() => {
    getBalance().then(setBalance);

    // const interval = setInterval(() => {
    //   if (trigger) {
    //     getBalance().then(setBalance);
    //   }
    // }, 2000);

    // if (!trigger) {
    //   clearInterval(interval);
    // }

    // return () => clearInterval(interval);
  }, [address, currentChain, trigger]);

  return balance;
};

// export const useUserAppoved = (
//   contract,
//   targetAddress = CONTRACT_ADDRESS.staking
// ) => {
//   const [isApprove, setIsApprove] = useState(false);
//   const UIContext = useUIContext();
//   const { address } = UIContext;
//   const web3 = useWeb3();

//   const checkApprove = async () => {
//     try { 
//     if (!address) return;

//     const approve = await contract.methods
//       .allowance(address, targetAddress)
//       .call();

//     return approve > 0;
//   } catch (err) {

//   }
//   };

//   useEffect(() => {
//     checkApprove().then(setIsApprove);
//   }, [contract, targetAddress, address]);

//   return isApprove;
// };

export const useWalletBalance = (contractAddress: string, trigger = false) => {
  const [sota, setSota] = useState(0);

  const UIContext = useUIContext();
  const { address, currentChain } = UIContext;
  const web3 = useWeb3();

  const getBalance = useCallback(async () => {
    try {
    if (!address || !currentChain) return;


    const currentABI = MULTI_SUPPORT_ABI[`${currentChain.chainId}`].sota
    // const currentContractAddress = MULTI_SUPPORT_CONTRACT_ADDRESS[`${currentChain.chainId}`].sota

    const sotaConst = new web3.eth.Contract(currentABI as any, contractAddress);

    const sotaBalance = await sotaConst.methods.balanceOf(address).call();
    const convertSota = parseFloat(formatInputNumber(Web3.utils.fromWei(sotaBalance, "ether")) + "");

    return convertSota;
    } catch (err) {
      
    }
  }, [contractAddress, address, currentChain, trigger]);

  useEffect(() => {
    getBalance().then(setSota);

    const interval = setInterval(() => {
      if (trigger) {
        getBalance().then(setSota);
      }
    }, 2000);

    if (!trigger) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [contractAddress, address, currentChain, trigger]);

  return useMemo(() => sota, [sota]);
};


export const useWalletBalanceSota = (trigger = false) => {
  const [sota, setSota] = useState(0);

  const UIContext = useUIContext();
  const { address, currentChain } = UIContext;
  const web3 = useWeb3();

  const getBalance = async () => {
    try {
    if (!address || !currentChain) return;


    const currentABI = MULTI_SUPPORT_ABI[`${currentChain.chainId}`].sota
    const currentContractAddress = MULTI_SUPPORT_CONTRACT_ADDRESS[`${currentChain.chainId}`].sota

    const sotaConst = new web3.eth.Contract(currentABI as any, currentContractAddress);

    const sotaBalance = await sotaConst.methods.balanceOf(address).call();
    const convertSota = parseFloat(formatInputNumber(Web3.utils.fromWei(sotaBalance, "ether")) + "");

    return convertSota;
    } catch (err) {
      
    }
  };

  useEffect(() => {
    getBalance().then(setSota);

    const interval = setInterval(() => {
      if (trigger) {
        getBalance().then(setSota);
      }
    }, 2000);

    if (!trigger) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [address, currentChain, trigger]);

  return sota;
};

export const useWalletBalanceSotaLP = (trigger = false) => {
  const [sota, setSota] = useState(0);

  const UIContext = useUIContext();
  const { address, currentChain } = UIContext;
  const web3 = useWeb3();

  const getBalance = async () => {
    try {
    if (!address || !currentChain) return;

    const currentABI = MULTI_SUPPORT_ABI[`${currentChain.chainId}`].sotaLP
    const currentContractAddress = MULTI_SUPPORT_CONTRACT_ADDRESS[`${currentChain.chainId}`].sotaLP

    const sotaConst = new web3.eth.Contract(
      currentABI as any,
      currentContractAddress
    );

    const sotaBalance = await sotaConst.methods.balanceOf(address).call();
    const convertSota = parseFloat(Web3.utils.fromWei(sotaBalance, "ether"));

    return convertSota;
    } catch (err) {
      
    }
  };

  useEffect(() => {
    getBalance().then(setSota);

    const interval = setInterval(() => {
      if (trigger) {
        getBalance().then(setSota);
      }
    }, 2000);

    if (!trigger) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [address, currentChain, trigger]);

  return sota;
};

export const useFarmingPoolBalance = (contractAddress: string, trigger = false) => {
  const [balance, setBalance] = useState(0);
  const UIContext = useUIContext();
  const { address, currentChain } = UIContext;
  const web3 = useWeb3();

  const getBalance = useCallback(async () => {
    try {
      if (!address || !currentChain) return;

      let point = 0,
        sota = 0,
        sotaLP = 0;

      // const hecoConst = new web3.eth.Contract(
      //   HecoABI as any,
      //   CONTRACT_ADDRESS.staking
      // );

      const currentABI = MULTI_SUPPORT_ABI[`${currentChain.chainId}`].farmingPoolABI;
      const sotaContractAddress =
        MULTI_SUPPORT_CONTRACT_ADDRESS[`${currentChain.chainId}`].farmingPoolSota;
        // console.log(sotaContractAddress);
        // console.log(contractAddress);
      //   const sotaLPContractAddress =
      //   MULTI_SUPPORT_CONTRACT_ADDRESS[`${currentChain.chainId}`].farmingPoolSotaLP;

      const sotaf = initialFarmingSotaContract(true, currentABI, contractAddress);
      // const sotaLPf = initialFarmingSotaContract(true, currentABI, sotaLPContractAddress);

        const useSsota = await sotaf.methods.balanceOf(address).call();
        sota = parseFloat(formatInputNumber(Web3.utils.fromWei(`${useSsota}`, "ether"))+"");
     
      return sota;
    } catch (err) {
      // console.log(err);
    }
  }, [address, currentChain, contractAddress, trigger]);

  useEffect(() => {
    getBalance().then(setBalance);

    // const interval = setInterval(() => {
    //   if (trigger) {
    //     getBalance().then(setBalance);
    //   }
    // }, 2000);

    // if (!trigger) {
    //   clearInterval(interval);
    // }

    // return () => clearInterval(interval);
  }, [address, currentChain, contractAddress, trigger]);

  return useMemo(() => balance, [balance]);
};

export const useFarmingPoolTotalStaked = (address: string, trigger = false) => {
  const [balance, setBalance] = useState(0);
  const UIContext = useUIContext();
  const { currentChain } = UIContext;
  const web3 = useWeb3();

  const getBalance = useCallback(async () => {
    try {
      if (!address || !currentChain) return;

      const currentABI = MULTI_SUPPORT_ABI[`${currentChain.chainId}`].farmingPoolABI;
      const currentProvider = DEFAULT_PROVIDER[`${currentChain.chainId}`]
      const farmingPoolContract = initialFarmingPoolContract(address, false, currentABI, currentProvider);
      
      const totalStaked = await farmingPoolContract.methods
        .totalSupply()
        .call();
      // console.log(totalStaked);
      const cvTotal = parseFloat(formatInputNumber(Web3.utils.fromWei(`${totalStaked}`, "ether"))+"");

      // console.log(cvTotal);

      return cvTotal;
    } catch (err) {
      // console.log(err);
    }
  }, [address, trigger]);

  useEffect(() => {
    getBalance().then(setBalance);

    const interval = setInterval(() => {
        getBalance().then(setBalance);
      
    }, INTERVAL_DURATION_UPDATE);

    // if (!trigger) {
    //   clearInterval(interval);
    // }

    return () => clearInterval(interval);
  }, [address, trigger]);

  return useMemo(() => balance, [balance]);
};

// export const useFarmingPoolUserStaked = (
//   ABI?: any,
//   tokenAddress?: string,
//   trigger = false
// ) => {
//   const [balance, setBalance] = useState(0);
//   const UIContext = useUIContext();
//   const web3 = useWeb3();

//   const getBalance = async () => {
//     try {
//       if (!tokenAddress) return;

//       // console.log(tokenAddress);

//       const tokenContract = initialTokenContract(ABI, tokenAddress, true);

//       const totalStaked = await tokenContract.methods.balanceOf().call();
//       const cvTotal = parseFloat(Web3.utils.fromWei(`${totalStaked}`, "ether"));

//       // console.log(cvTotal);

//       return cvTotal;
//     } catch (err) {
//       // console.log(err);
//     }
//   };

//   useEffect(() => {
//     getBalance().then(setBalance);

//     // const interval = setInterval(() => {
//     //   if (trigger) {
//     //     getBalance().then(setBalance);
//     //   }
//     // }, 2000);

//     // if (!trigger) {
//     //   clearInterval(interval);
//     // }

//     // return () => clearInterval(interval);
//   }, [tokenAddress, ABI, trigger]);

//   return balance;
// };

export const useFarmingPoolUserRewards = (
  farmingPoolAddress: string,
  trigger = false
) => {
  const [balance, setBalance] = useState(0);
  const UIContext = useUIContext();
  const { address } = UIContext;
  const web3 = useWeb3();

  const getBalance = useCallback(async () => {
    try {
      if (!address) return;

      const farmingPoolContract = initialFarmingPoolContract(
        farmingPoolAddress,
        true
      );

      const totakRewards = await farmingPoolContract.methods
        .earned(address)
        .call();
        // console.log(totakRewards);
      const cvTotal = parseFloat(formatInputNumber(Web3.utils.fromWei(`${totakRewards}`, "ether"))+"");

      return cvTotal;
    } catch (err) {
      // console.log(err);
    }
  }, [farmingPoolAddress, address, trigger]);

  useEffect(() => {
    getBalance().then(setBalance);

    const interval = setInterval(() => {
        getBalance().then(setBalance);
    }, INTERVAL_DURATION_UPDATE);

    // if (!trigger) {
    //   clearInterval(interval);
    // }

    return () => clearInterval(interval);
  }, [farmingPoolAddress, address, trigger]);

  return useMemo(() => balance, [balance]);
};

export const useTokenTotalSupply = (tokenAddress: string, trigger = false) => {
  const [balance, setBalance] = useState(0);
  const UIContext = useUIContext();
  const { address } = UIContext;
  const web3 = useWeb3();

  const getBalance = async () => {
    try {
      if (!address) return;

      const tokenContract = initialTokenContract(MULTI_SUPPORT_ABI['97'].sota, tokenAddress, true);

      const totakRewards = await tokenContract.methods
        .totalSupply()
        .call();

      const cvTotal = parseFloat(Web3.utils.fromWei(`${totakRewards}`, "ether"));

      return cvTotal;
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    getBalance().then(setBalance);

    // const interval = setInterval(() => {
    //     getBalance().then(setBalance);
    // }, INTERVAL_DURATION_UPDATE);

    // if (!trigger) {
    //   clearInterval(interval);
    // }

    // return () => clearInterval(interval);
  }, [tokenAddress, address, trigger]);

  return balance;
}

export const useTokenBalance = (tokenAddress: string, rewardTokenAddress: string,trigger = false) => {
  const [balance, setBalance] = useState(0);
  const UIContext = useUIContext();
  const { currentChain } = UIContext;
  const web3 = useWeb3();

  const getBalance = useCallback(async () => {
    try {
      if (!currentChain || !tokenAddress || !rewardTokenAddress) return;
      const vs_currencies = "bnb"

      const tokenContract = initialTokenContract(MULTI_SUPPORT_ABI['97'].sota, tokenAddress, false, DEFAULT_PROVIDER[`${currentChain.chainId}`]);
      
      const sotaContract = initialTokenContract(MULTI_SUPPORT_ABI[`${currentChain.chainId}`].sota, rewardTokenAddress, false, DEFAULT_PROVIDER[`${currentChain.chainId}`]);

      const stakedTokenName = await tokenContract.methods.symbol().call();
      
      if (stakedTokenName === 'SOTA') {
        return 0;
      }

      const result = await Promise.all([
        await tokenContract.methods
        .totalSupply()
        .call(),
        await axios({
          method: "get",
          url: `${GECKO_API_ENDPOINT}/simple/price`,
          params: { vs_currencies, ids: 'sota-finance' },
        })
          .then((res) => res.data),
          await sotaContract.methods.balanceOf(tokenAddress).call()
      ]).then(res => {
        return ({
          totalTokenSupply: parseFloat(Web3.utils.fromWei(`${res[0]}`, "ether")),
          sotaVsBnb: res[1]['sota-finance'][vs_currencies],
          balanceInSotaContract: parseFloat(Web3.utils.fromWei(`${res[2]}`, "ether"))
        })
      })

      // console.log(result);

        const tokenBalanceVsBnb = (result.balanceInSotaContract * result.sotaVsBnb * 2) / result.totalTokenSupply

      return tokenBalanceVsBnb;
    } catch (err) {
      // console.log(err);
    }
  }, [currentChain, tokenAddress, trigger, rewardTokenAddress]);

  useEffect(() => {
    getBalance().then(setBalance);

    // const interval = setInterval(() => {
    //     getBalance().then(setBalance);
    // }, INTERVAL_DURATION_UPDATE);

    // if (!trigger) {
    //   clearInterval(interval);
    // }

    // return () => clearInterval(interval);
  }, [tokenAddress, currentChain, trigger, rewardTokenAddress]);

  return useMemo(() => balance, [balance]);
}

interface VestingInfo {
  [X: string]: string
}

export const useTokenVesting = (claimTokenAddress: string, trigger = false) => {
  const [vesting, setVesting] = useState<VestingInfo>();
  const UIContext = useUIContext();
  const { currentChain, address } = UIContext;
  const web3 = useWeb3();

  const getBalance = useCallback(async () => {
    try {
      if (!currentChain || !address || !claimTokenAddress) return;
      
      const vestingContract = initialContract(MULTI_SUPPORT_ABI[`${currentChain.chainId}`].vestingABI, MULTI_SUPPORT_CONTRACT_ADDRESS[`${currentChain.chainId}`].vesting);
      console.log(MULTI_SUPPORT_CONTRACT_ADDRESS[`${currentChain.chainId}`].vesting);

      const vestingInfo = await vestingContract.methods.tokenGrants(address, claimTokenAddress).call();
      const claimable = await vestingContract.methods.calculateGrantClaim(claimTokenAddress, address).call();
      console.log(vestingInfo);
      vestingInfo.amount = parseFloat(Web3.utils.fromWei(`${vestingInfo.amount}`, "ether"))
      vestingInfo.totalClaimed = parseFloat(Web3.utils.fromWei(`${vestingInfo.totalClaimed}`, "ether"))

      return { ...vestingInfo, claimable: parseFloat(Web3.utils.fromWei(`${claimable["1"]}`, "ether")) };
    } catch (err) {
      console.log(err);
    }
  }, [currentChain, address, trigger, claimTokenAddress]);

  useEffect(() => {
    getBalance().then(setVesting)

    // const interval = setInterval(() => {
    //     getBalance().then(setBalance);
    // }, INTERVAL_DURATION_UPDATE);

    // if (!trigger) {
    //   clearInterval(interval);
    // }

    // return () => clearInterval(interval);
  }, [address, currentChain, trigger, claimTokenAddress]);

  return useMemo(() => vesting, [vesting]);
}
