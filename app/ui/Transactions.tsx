'use client'
import { formatDate } from '@/utils/date'
import { formatCurrency } from '@/utils/number'
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getTransactions } from '../lib/actions';
import { FilterOptions, FilterParams, Transaction } from '../lib/definitions';
import FilterModal from './RevenueFilterModal';
import { on } from 'events';

function Transactions() {
    const toast = useToast();
    const [filterModal, setfilterModal] = useState(false);

    const toggleFilterModal = () => {
        setfilterModal(filterModal => !filterModal);
    }

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const [transactionTypes, setTransactionTypes] = useState<string[]>([]);
    const [transactionStatus, setTransactionStatus] = useState<string[]>([]);

    useEffect(() => {
        getTransactions().then((data) => {
            setTransactions(data);
        });

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
        getTransactions().then((data) => {
            setTransactions(data);
        });
    }

    const filterActions = {
        isOpen: filterModal,
        onClose: () => toggleFilterModal(),
        applyFilter: (options: FilterOptions) => handleFilterOptions(options)
    };

    const handleFilterOptions = (options: FilterOptions) => {
        setTransactionStatus(options.transactionStatus);
        setTransactionTypes(options.transactionTypes);
    }

    const filterOptions = {
        transactionStatus,
        transactionTypes
    }

    return (
        <>
            <div className="revenue__transactions">
                <div className="revenue__transactions__heading">
                    <div className="revenue__transactions__heading-title">
                        <h2>{count} Transactions</h2>
                        <p>Your transactions for All Time</p>
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
                        <button className="revenue__transactions__heading-actions-filter" onClick={() =>
                            toast({
                                title: 'No Action.',
                                status: 'success',
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
                    {transactions.length > 0 ? transactions.map((transaction, index) => (
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
                    )) : <Box display='flex' flexDirection={'column'} justifyContent={'center'} alignItems={'center'} paddingTop='2rem' className="no-transactions">
                        <Box display='flex' flexDirection={'column'} justifyContent={'center'}>
                            <Box>
                                <Text as='b' fontSize='3xl'>No matching transaction found for the selected filter</Text>
                                <Text>Change your filters to see more results, or add a new product.</Text>
                            </Box>
                            <Button colorScheme='blue'>Button</Button>
                        </Box>
                    </Box>}
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