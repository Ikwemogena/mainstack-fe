'use client'
import Image from "next/image";
import { getWallet } from "../lib/actions";
import type { Wallet } from "../lib/definitions";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/number";
import { Box, Spinner, Text } from "@chakra-ui/react";

export function Wallet() {
    const [balances, setBalances] = useState<Wallet>();

    useEffect(() => {
        getWallet().then((data) => {
            setBalances(data);
        });

    }, [])
    // const balances = await getWallet();
    // console.log(balances)
    if (!balances) return (<Spinner />);
    return (
        <Box className="transactions-summary">
            <Box className="transactions-summary__item">
                <Box className="transactions-summary__item-title">
                    <Text>Ledger Balance</Text>
                    <Box>
                        <Image
                            src="/assets/icons/info-icon.svg"
                            alt="Mainstack Logo"
                            width={20}
                            height={20}
                            priority
                        />
                    </Box>
                </Box>
                <Text className="transactions-summary__item-value">{formatCurrency(balances?.balance)}</Text>
            </Box>

            <Box className="transactions-summary__item">
                <Box className="transactions-summary__item-title">
                    <p>Total Payout</p>
                    <Box>
                        <Image
                            src="/assets/icons/info-icon.svg"
                            alt="Mainstack Logo"
                            width={20}
                            height={20}
                            priority
                        />
                    </Box>
                </Box>
                <p className="transactions-summary__item-value">{formatCurrency(balances.total_payout)}</p>
            </Box>

            <Box className="transactions-summary__item">
                <Box className="transactions-summary__item-title">
                    <p>Total Revenue</p>
                    <Box>
                        <Image
                            src="/assets/icons/info-icon.svg"
                            alt="Mainstack Logo"
                            width={20}
                            height={20}
                            priority
                        />
                    </Box>
                </Box>
                <p className="transactions-summary__item-value">{formatCurrency(balances?.total_revenue)}</p>
            </Box>

            <Box className="transactions-summary__item">
                <Box>
                    <Box className="transactions-summary__item-title">
                        <p>Pending Payout</p>
                        <Box>
                            <Image
                                src="/assets/icons/info-icon.svg"
                                alt="Mainstack Logo"
                                width={20}
                                height={20}
                                priority
                            />
                        </Box>
                    </Box>
                    <p className="transactions-summary__item-value">{formatCurrency(balances?.pending_payout)}</p>
                </Box>
            </Box>
        </Box>
    )
}