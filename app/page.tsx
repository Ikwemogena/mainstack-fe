import Image from "next/image";
import styles from "./page.module.css";
import { getWallet } from "./lib/actions";

export default function Home() {
  return (
    <main>
      <div className="revenue">
        <div className="revenue__top">
          <div className="graph">
            <div className="available-balance">
              <div className="available-balance__amount">
                <p className="available-balance__header">Available Balance</p>
                <p className="available-balance__cost">USD 10,000.00</p>
              </div>
              <button className="available-balance__withdraw">Withdraw</button>
            </div>
            graph</div>
          <Wallet />
        </div>
        <div className="revenue__transactions">
          <div className="revenue__transactions__heading">
            <div className="revenue__transactions__heading-title">
              <h2>24 Transactions</h2>
              <p>Your transactions for the last 7 days</p>
            </div>
            <div className="revenue__transactions__heading-actions">
              <button className="revenue__transactions__heading-actions-filter">
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
            <div className="transaction">
              <div className="transaction__details">
                <div className="transaction__details-icon">
                  <Image
                    src="/assets/icons/recieved-icon.svg"
                    alt="Received"
                    width={20}
                    height={20}
                    priority
                  />
                </div>
                <div className="transaction__details-info">
                  <p className="transaction__details-desc">Buy me a coffee</p>
                  <p className="transaction__details-owner">Jonathan Smart</p>
                </div>
              </div>
              <div className="transaction__amount-details">
                <p className="transaction__amount-details-price">USD 100</p>
                <p className="transaction__amount-details-date">Apr 02, 2022</p>
              </div>
            </div>
            <div className="transaction">
              <div className="transaction__details">
                <div className="transaction__details-icon">
                  <Image
                    src="/assets/icons/recieved-icon.svg"
                    alt="Received"
                    width={20}
                    height={20}
                    priority
                  />
                </div>
                <div className="transaction__details-info">
                  <p className="transaction__details-desc">Buy me a coffee</p>
                  <p className="transaction__details-owner">Jonathan Smart</p>
                </div>
              </div>
              <div className="transaction__amount-details">
                <p className="transaction__amount-details-price">USD 100</p>
                <p className="transaction__amount-details-date">Apr 02, 2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}



async function Wallet() {
  const balances = await getWallet();
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
        <p className="transactions-summary__item-value">USD {balances.balance}</p>
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
        <p className="transactions-summary__item-value">USD {balances.total_payout}</p>
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
        <p className="transactions-summary__item-value">USD {balances.total_revenue}</p>
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
          <p className="transactions-summary__item-value">USD {balances.pending_payout}</p>
        </div>
      </div>
    </div>
  )
}