'use client'
import Image from "next/image";
import { getWallet } from "../lib/actions";
import type { Wallet } from "../lib/definitions";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/number";

export function Wallet() {
    const [balances, setBalances] = useState<Wallet>();

    useEffect(() => {
        getWallet().then((data) => {
            setBalances(data);
        });

    }, [])
    // const balances = await getWallet();
    // console.log(balances)
    if (!balances) return;
    return (
        <div className="transactions-summary">
            <div className="transactions-summary__item">
                <div className="transactions-summary__item-title">
                    <p>Ledger Balance</p>
                    <div>
                        <Image
                            src="/assets/icons/info-icon.svg"
                            alt="Mainstack Logo"
                            width={20}
                            height={20}
                            priority
                        />
                    </div>
                </div>
                <p className="transactions-summary__item-value">{formatCurrency(balances?.balance)}</p>
            </div>

            <div className="transactions-summary__item">
                <div className="transactions-summary__item-title">
                    <p>Total Payout</p>
                    <div>
                        <Image
                            src="/assets/icons/info-icon.svg"
                            alt="Mainstack Logo"
                            width={20}
                            height={20}
                            priority
                        />
                    </div>
                </div>
                <p className="transactions-summary__item-value">{formatCurrency(balances.total_payout)}</p>
            </div>

            <div className="transactions-summary__item">
                <div className="transactions-summary__item-title">
                    <p>Total Revenue</p>
                    <div>
                        <Image
                            src="/assets/icons/info-icon.svg"
                            alt="Mainstack Logo"
                            width={20}
                            height={20}
                            priority
                        />
                    </div>
                </div>
                <p className="transactions-summary__item-value">{formatCurrency(balances?.total_revenue)}</p>
            </div>

            <div className="transactions-summary__item">
                <div>
                    <div className="transactions-summary__item-title">
                        <p>Pending Payout</p>
                        <div>
                            <Image
                                src="/assets/icons/info-icon.svg"
                                alt="Mainstack Logo"
                                width={20}
                                height={20}
                                priority
                            />
                        </div>
                    </div>
                    <p className="transactions-summary__item-value">{formatCurrency(balances?.pending_payout)}</p>
                </div>
            </div>
        </div>
    )
}