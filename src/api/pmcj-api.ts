import { CONSTANTS, initializeWeb3Contract } from './api-helper';


export const PmcjApi = {
    // TODO: typing
    fetchJoePerSec: async (): Promise<any> => {
        // Web3 constants;
        const bmcjAbi = CONSTANTS.BMCJ_ABI;
        const { contract } = initializeWeb3Contract(bmcjAbi, CONSTANTS.BMCJ_ADDRESS);

        let joePerSec;
        // fetch joePerSec
        await contract.methods.joePerSec().call((err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                joePerSec = result;
            };
        });
        return joePerSec;
    },
    fetchTotalAllocPoint: async (): Promise<any> => {
        // Web3 constants;
        const bmcjAbi = CONSTANTS.BMCJ_ABI;
        const { contract } = initializeWeb3Contract(bmcjAbi, CONSTANTS.BMCJ_ADDRESS);
        let totalAllocPoint;
        // fetch joePerSec
        await contract.methods.totalAllocPoint().call((err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                totalAllocPoint = result;
            };
        });
        return totalAllocPoint;
    },
    fetchPoolInfo: async (poolNumber: number): Promise<any> => {
        // Web3 constants;
        const bmcjAbi = CONSTANTS.BMCJ_ABI;
        const { contract } = initializeWeb3Contract(bmcjAbi, CONSTANTS.BMCJ_ADDRESS);
        let poolInfo;
        // fetch joePerSec
        await contract.methods.poolInfo(poolNumber).call((err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                poolInfo = result;
            };
        });
        return poolInfo;
    },
};
