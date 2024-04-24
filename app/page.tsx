"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { getTransactions } from "./lib/actions";
import { useEffect, useState } from "react";
import FilterModal from "./ui/RevenueFilterModal";
import { Wallet } from "./ui/WalletInfo";
import { Transaction } from "./lib/definitions";
import { formatDate } from "@/utils/date";
import RevenueChart from "@/components/Chart";
import { Text } from "@chakra-ui/react"
import { formatCurrency } from "@/utils/number";

export default function Home() {
  const [filterModal, setfilterModal] = useState(false);

  const toggleFilterModal = () => {
    setfilterModal(filterModal => !filterModal);
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getTransactions().then((data) => {
      setTransactions(data);
    });

  }, [])

  const count = transactions.length;

  return (
    <main>
      <ToolBar />
      <div className="revenue">
        <div className="revenue__top">
          <div className="">
            <div className="available-balance">
              <div className="available-balance__amount">
                <p className="available-balance__header">Available Balance</p>
                <p className="available-balance__cost">USD 10,000.00</p>
              </div>
              <button className="available-balance__withdraw">Withdraw</button>
            </div>
            <div className="graph">
              <RevenueChart />
            </div>
          </div>
          <Wallet />
        </div>
        <div className="revenue__transactions">
          <div className="revenue__transactions__heading">
            <div className="revenue__transactions__heading-title">
              <h2>{count} Transactions</h2>
              <p>Your transactions for the last 7 days</p>
            </div>
            <div className="revenue__transactions__heading-actions">
              <button className="revenue__transactions__heading-actions-filter" onClick={() => { toggleFilterModal() }}>
                Filter
                <Image
                  src="/assets/icons/expand_more.svg"
                  alt="Received"
                  width={20}
                  height={20}
                  priority
                />
              </button>
              <button className="revenue__transactions__heading-actions-filter">
                Export list
                <Image
                  src="/assets/icons/download.svg"
                  alt="Received"
                  width={20}
                  height={20}
                  priority
                />
              </button>
            </div>
          </div>
          <div className="revenue__transactions-list">
            {transactions && transactions.map((transaction, index) => (
              <div key={index} className="transaction">
                <div className="transaction__details">
                  <ImageHandler status={transaction.type as TransactionType} />

                  <div className="transaction__details-info">
                    <p className="transaction__details-desc">{transaction.metadata?.product_name ? transaction.metadata?.product_name : 'cash withdrawal'}</p>
                    <p className="transaction__details-owner" style={transaction.status === 'successful' && !transaction.metadata?.name ? { color: '#0EA163' } : {}}>{transaction.metadata?.name ? transaction.metadata?.name : transaction.status}</p>
                  </div>
                </div>
                <div className="transaction__amount-details">
                  <p className="transaction__amount-details-price">{formatCurrency(transaction.amount)}</p>
                  <p className="transaction__amount-details-date">{formatDate(transaction.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {filterModal && <FilterModal isOpen={filterModal} onClose={toggleFilterModal} />}
    </main>
  );
}

type TransactionType = 'deposit' | 'withdrawal';

function ImageHandler({ status }: { status: TransactionType }) {
  return (
    <div className={`transaction__details-icon ${status === 'withdrawal' ? 'send' : ''}`}>
      <Image
        src={`/assets/icons/${status === 'withdrawal' ? 'send' : 'received'}-icon.svg`}
        alt={status === 'withdrawal' ? 'Sent' : 'Received'}
        width={20}
        height={20}
        priority
      />
    </div>
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
        <div className="image-wrapper">
          <Image
            src="/assets/icons/four-icon.svg"
            alt="Mainstack Logo"
            width={24}
            height={24}
            priority
          />
        </div>
        {/* <Image
          src="/assets/icons/four-icon.svg"
          alt="Mainstack Logo"
          width={24}
          height={24}
          priority
        /> */}
      </div>
    </div>
  )
}