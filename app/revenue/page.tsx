"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import RevenueChart from "@/components/Chart";
import { Skeleton, Spinner, Text, useToast } from "@chakra-ui/react"
import { getTransactions } from "../lib/actions";
import { Transaction } from "../lib/definitions";
import { Wallet } from "../ui/WalletInfo";
import Transactions from "../ui/Transactions";
import { formatCurrency } from "@/utils/number";

export default function Page() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTransactions();
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setIsLoaded(true);
            }
        };
        fetchData();
    }, []);

    // useEffect(() => {
    //     getTransactions().then((data) => {
    //         setTransactions(data);
    //     });

    // }, [])

    const toast = useToast();

    const calculateAvailableBalance = () => {
        let depositTotal = 0;
        let withdrawalTotal = 0;

        if (!transactions) return null;

        transactions.forEach(transaction => {
            if (transaction.status === "successful") {
                if (transaction.type === "deposit") {
                    depositTotal += transaction.amount;
                } else if (transaction.type === "withdrawal") {
                    withdrawalTotal += transaction.amount;
                }
            }
        });

        const availableBalance = depositTotal - withdrawalTotal;
        return availableBalance;
    };

    const availableBalance = calculateAvailableBalance();

    return (
        <main>
            <ToolBar />
            <div className="revenue">
                <div className="revenue__top">
                    <div className="">
                        <div className="available-balance">
                            <div className="available-balance__amount">
                                <p className="available-balance__header">Available Balance</p>
                                <Skeleton isLoaded={isLoaded}>
                                    <p className="available-balance__cost">{formatCurrency(availableBalance as number)}</p>
                                </Skeleton>
                            </div>
                            <button className="available-balance__withdraw"
                                onClick={() =>
                                    toast({
                                        title: 'No Action',
                                        status: 'warning',
                                        duration: 3000,
                                    })
                                }>Withdraw</button>
                        </div>
                        <div className="graph">
                            {
                                isLoaded ? <RevenueChart transactions={transactions} /> : <Spinner />
                            }
                        </div>
                    </div>
                    <Wallet />
                </div>
                <Transactions />
            </div>
        </main >
    );
}

function ToolBar() {
    return (
        <div className="tool-bar">
            <div className="tool-bar__item">
                <Image
                    src="/assets/icons/first-icon.svg"
                    alt="tool"
                    width={24}
                    height={24}
                    priority
                />
            </div>
            <div className="tool-bar__item">
                <Image
                    src="/assets/icons/two-icon.svg"
                    alt="tool"
                    width={24}
                    height={24}
                    priority
                />
            </div>
            <div className="tool-bar__item">
                <Image
                    src="/assets/icons/three-icon.svg"
                    alt="tool"
                    width={24}
                    height={24}
                    priority
                />
            </div>
            <div className="tool-bar__item">
                <Image
                    src="/assets/icons/four-icon.svg"
                    alt="tool"
                    width={24}
                    height={24}
                    priority
                />
            </div>
        </div>
    )
}