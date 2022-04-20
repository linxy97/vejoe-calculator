import { Avatar, Icon, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { pair_api_type, token_type } from "../api/web3-api";
import { DECIMALS_POW, SECOND_TO_ANNUALIZE, SECOND_TO_DAY } from "../constants/constants";
import { RootState } from "../redux/store";
import { ResultRow } from "./result-row";

export type vejoeProps = {
    quantity1: number,
    quantity2: number,
    veJoe: number,
    pool: any,
    pair: pair_api_type,
    token0: token_type,
    token1: token_type
}

const getTokenInDecimal = (token: token_type) => token.balance * DECIMALS_POW(-token.decimals);
const getUserLiquidity = (inputToken1Quantity: number, inputToken2Quantity: number, inputToken1: token_type, inputToken2: token_type, reserves: any) => {
    const inputToken1QuantityOutOfDecimal = inputToken1Quantity * DECIMALS_POW(-inputToken1.decimals);

}
export const ResultSection: React.FunctionComponent<vejoeProps> = (props) => {
    const totalAllocPoint = useSelector((state: RootState) => state.calculator.totalAllocPoint);
    const totalJoePerSec = useSelector((state: RootState) => state.calculator.joePerSec);
    const oracleToken0: number | null = useSelector((state: RootState) => state.calculator.oracleToken0);
    const oracleToken1: number | null = useSelector((state: RootState) => state.calculator.oracleToken1);
    const oracleTokenJoe: number | null = useSelector((state: RootState) => state.calculator.oracleTokenJoe);

    // user liquidity
    const reserve0_decimal =  Number(props.pair.reserves._reserve0) / DECIMALS_POW(props.token0.decimals)
    const total_supply_decimal = Number(props.pair.totalSupply) / DECIMALS_POW(18)
    const userLiquidity = props.quantity1 / reserve0_decimal * total_supply_decimal;
    // farm jps
    const total_vejoe_decimal = Number(totalJoePerSec) / DECIMALS_POW(18);
    const jps_farm_total = total_vejoe_decimal * Number(props.pool.allocPoint) / Number(totalAllocPoint);
    const jps_farm_base = jps_farm_total * (1 - props.pool.veJoeShareBp / 10000);
    const jps_farm_vejoe = jps_farm_total * (props.pool.veJoeShareBp / 10000);
    // Base reward
    const  total_lp_supply_decimal = Number(props.pool.totalLpSupply) / DECIMALS_POW(18)
    const reward_base_per_sec = jps_farm_base * userLiquidity / total_lp_supply_decimal
    const reward_boosted_per_sec = Math.sqrt(props.veJoe * userLiquidity) * jps_farm_vejoe / Number(props.pool.totalFactor) * DECIMALS_POW(18);
    return (
        <Box>
            <Typography variant="h6" align='left' component="h4" sx={{marginTop:'1vh'}}> Result </Typography>
            <List>
                <ResultRow priamryText="Base APR" secondaryText={(SECOND_TO_ANNUALIZE(reward_base_per_sec * Number(oracleTokenJoe)) / (Number(oracleToken0) * props.quantity1) / 2 * 100).toFixed(4) + '%'}/>
                <ResultRow priamryText="Boosted APR" secondaryText={(SECOND_TO_ANNUALIZE(reward_boosted_per_sec * Number(oracleTokenJoe)) / (Number(oracleToken0) * props.quantity1) / 2 * 100).toFixed(4) + '%'}/>
                <ResultRow priamryText="veJoe share of total reward" secondaryText={props.pool.veJoeShareBp / 100 + '%'}/>
                <ResultRow priamryText="Estimated LP token (liquidity) gained" secondaryText={userLiquidity.toFixed(4)}/>
                <ResultRow priamryText="Base Reward Per Day" secondaryText={SECOND_TO_DAY(reward_base_per_sec).toFixed(4) + ' JOE'}/>
                <ResultRow priamryText="Base Reward Per Year" secondaryText={SECOND_TO_ANNUALIZE(reward_base_per_sec).toFixed(4) + ' JOE'}/>
            </List>
        </Box>
    )
}