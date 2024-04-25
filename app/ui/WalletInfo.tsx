'use client'
import Image from "next/image";
import { getWallet } from "../lib/actions";
import type { Wallet } from "../lib/definitions";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/number";
import { Box, Skeleton, Text } from "@chakra-ui/react";

export function Wallet() {
    const [balances, setBalances] = useState<Wallet>();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getWallet();
                setBalances(data);
            } catch (error) {
                console.error('Error fetching wallet data:', error);
            } finally {
                setIsLoaded(true);
            }
        };
        fetchData();
    }, []);
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
                <Skeleton isLoaded={isLoaded}>
                    <Text className="transactions-summary__item-value">{formatCurrency(balances?.balance ?? 0)}</Text>
                </Skeleton>
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
                <Skeleton isLoaded={isLoaded}>
                    <p className="transactions-summary__item-value">{formatCurrency(balances?.total_payout ?? 0)}</p>
                </Skeleton>
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

                <Skeleton isLoaded={isLoaded}>
                    <p className="transactions-summary__item-value">{formatCurrency(balances?.total_revenue ?? 0)}</p>
                </Skeleton>
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
                    <Skeleton isLoaded={isLoaded}>
                        <p className="transactions-summary__item-value">{formatCurrency(balances?.pending_payout ?? 0)}</p>
                    </Skeleton>
                </Box>
            </Box>
        </Box>
    )
}