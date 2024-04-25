"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/date";
import RevenueChart from "@/components/Chart";
import { Text, useToast } from "@chakra-ui/react"
import { getTransactions } from "../lib/actions";
import { Transaction } from "../lib/definitions";
import { Wallet } from "../ui/WalletInfo";
import Transactions from "../ui/Transactions";
import { formatCurrency } from "@/utils/number";

export default function Page() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [filterTypes, setFilterTypes] = useState<string[]>([]);
    const [filterStatus, setFilterStatus] = useState<string[]>([]);

    useEffect(() => {
        getTransactions().then((data) => {
            setTransactions(data);
        });

    }, [])

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
                                {availableBalance && <p className="available-balance__cost">{formatCurrency(availableBalance)}</p>}
                            </div>
                            <button className="available-balance__withdraw"
                                onClick={() =>
                                    toast({
                                        title: 'No Action.',
                                        status: 'warning',
                                        duration: 3000,
                                    })
                                }>Withdraw</button>
                        </div>
                        <div className="graph">
                            <RevenueChart />
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
                    alt="Mainstack Logo"
                    width={24}
                    height={24}
                    priority
                />
            </div>
            <div className="tool-bar__item">
                <Image
                    src="/assets/icons/two-icon.svg"
                    alt="Mainstack Logo"
                    width={24}
                    height={24}
                    priority
                />
            </div>
            <div className="tool-bar__item">
                <Image
                    src="/assets/icons/three-icon.svg"
                    alt="Mainstack Logo"
                    width={24}
                    height={24}
                    priority
                />
            </div>
            <div className="tool-bar__item">
                <Image
                    src="/assets/icons/four-icon.svg"
                    alt="Mainstack Logo"
                    width={24}
                    height={24}
                    priority
                />
            </div>
        </div>
    )
}