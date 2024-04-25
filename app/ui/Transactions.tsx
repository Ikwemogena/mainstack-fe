'use client'
import { formatDate } from '@/utils/date'
import { formatCurrency } from '@/utils/number'
import { Box, Button, Skeleton, Text, useToast } from '@chakra-ui/react';
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getTransactions } from '../lib/actions';
import { FilterOptions, FilterParams, Transaction } from '../lib/definitions';
import FilterModal from './RevenueFilterModal';

function Transactions() {
    const toast = useToast();
    const [filterModal, setfilterModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const toggleFilterModal = () => {
        setfilterModal(filterModal => !filterModal);
    }

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const [transactionTypes, setTransactionTypes] = useState<string[]>([]);
    const [transactionStatus, setTransactionStatus] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();


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

    useEffect(() => {
        fetchData();
    }, [])

    const count = transactions.length;


    const filterTransactions = (filters?: FilterParams) => {

        if (!filters) {
            resetFilters();
            return;
        }

        const { selectedOptions, selectedTransactionTypes, startDate, endDate } = filters;

        const filteredTransactions = transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            const start = new Date(startDate[0].toISOString().split('T')[0]);
            const end = new Date(endDate[0].toISOString().split('T')[0]);
            end.setHours(23, 59, 59, 999);
            return selectedOptions.includes(transaction.status) &&
                selectedTransactionTypes.includes(transaction.type) &&
                (!startDate || transactionDate >= start) &&
                (!endDate || transactionDate <= end);
        });

        setTransactions(filteredTransactions);
    }



    const resetFilters = () => {
        fetchData()
    }

    const filterActions = {
        isOpen: filterModal,
        onClose: () => toggleFilterModal(),
        applyFilter: (options: FilterOptions) => handleFilterOptions(options)
    };

    const handleFilterOptions = (options: FilterOptions) => {
        setTransactionStatus(options.transactionStatus);
        setTransactionTypes(options.transactionTypes);
        setStartDate(options.startDate);
        setEndDate(options.endDate);
    }

    const filterOptions = {
        transactionStatus,
        transactionTypes,
        startDate,
        endDate
    }

    return (
        <>
            <div className="revenue__transactions">
                <div className="revenue__transactions__heading">
                    <Skeleton isLoaded={isLoaded}>
                        <div className="revenue__transactions__heading-title">
                            <h2>{count} Transactions</h2>
                            <p>Your transactions for All Time</p>
                        </div>
                    </Skeleton>
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
                        <button className="revenue__transactions__heading-actions-filter" onClick={() =>
                            toast({
                                title: 'No Action.',
                                status: 'warning',
                                duration: 3000,
                            })
                        }>
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
                    {isLoaded && transactions.length && transactions.map((transaction, index) => (
                        <div key={index} className="transaction">
                            <div className="transaction__details">
                                <ImageHandler status={transaction.type as TransactionType} />

                                <Skeleton isLoaded={isLoaded}>
                                    <div className="transaction__details-info">
                                        <p className="transaction__details-desc">{transaction.metadata?.product_name ? transaction.metadata?.product_name : 'cash withdrawal'}</p>
                                        <p className="transaction__details-owner" style={transaction.status === 'successful' && !transaction.metadata?.name ? { color: '#0EA163' } : {}}>{transaction.metadata?.name ? transaction.metadata?.name : transaction.status}</p>
                                    </div>
                                </Skeleton>
                            </div>
                            <div className="transaction__amount-details">
                                <Skeleton isLoaded={isLoaded}>
                                    <p className="transaction__amount-details-price">{formatCurrency(transaction.amount)}</p>
                                    <p className="transaction__amount-details-date">{formatDate(transaction.date)}</p>
                                </Skeleton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {filterModal && <FilterModal actions={filterActions} filter={filterTransactions} options={filterOptions} />}
        </>
    )
}

export default Transactions

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