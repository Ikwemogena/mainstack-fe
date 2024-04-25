'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import DatePicker from "./DatePicker";
import { Box, Text } from "@chakra-ui/react";
import { FilterOptions, FilterParams } from "../lib/definitions";

interface FilterModalProps {
    actions: FilterActions
    filter: (params?: FilterParams) => void;
    options: FilterOptions;
}

interface FilterActions {
    isOpen: boolean;
    onClose: () => void;
    applyFilter: (options: FilterOptions) => void;
}

export default function FilterModal({ actions, filter, options }: FilterModalProps) {

    const { isOpen, onClose, applyFilter } = actions
    const [selectedOptions, setSelectedOptions] = useState<string[]>(options.transactionStatus.length ? options.transactionStatus : ['successful', 'pending', 'failed']);

    const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<string[]>(options.transactionTypes.length ? options.transactionTypes : ['store transactions', 'get tipped', 'deposit', 'withdrawal', 'chargeback', 'cashback', 'refer&earn',]);

    const [showFilters, setShowFilters] = useState(false);

    const [showTransactionDropdown, setShowTransactionDropdown] = useState(false);
    const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);

    const currentDate = options.endDate ? options.endDate : new Date();
    const oneMonthAgo = options.startDate ? options.startDate : new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());

    const [startDate, setStartDate] = useState<Date[]>([oneMonthAgo]);
    const [endDate, setEndDate] = useState<Date[]>([currentDate]);

    const [hasChanges, setHasChanges] = useState(false);

    const handleStartDate = (start: Date[]) => {
        setStartDate(start);
        setHasChanges(true);
    }

    const handleEndDate = (end: Date[]) => {
        setEndDate(end);
        setHasChanges(true);
    }

    const handleTransactionTypeChange = (option: string) => {
        if (selectedTransactionTypes.includes(option)) {
            setSelectedTransactionTypes(selectedTransactionTypes.filter(item => item !== option));
        } else {
            setSelectedTransactionTypes([...selectedTransactionTypes, option]);
        }

        setHasChanges(true);
    }

    const handleCheckboxChange = (option: string) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(item => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
        setHasChanges(true);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setTimeout(() => setShowFilters(true), 100);
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const closeFilters = () => {
        setShowFilters(false)
        setTimeout(() => onClose(), 300);
    }

    const clearFilters = () => {
        setSelectedOptions(['successful', 'pending', 'failed']);
        setSelectedTransactionTypes(['store transactions', 'get tipped', 'withdrawal', 'chargeback', 'cashback', 'refer&earn']);
        filter()
    }

    const applyFilters = () => {
        closeFilters();
        const filters: FilterParams = {
            selectedOptions,
            selectedTransactionTypes,
            startDate: startDate,
            endDate: endDate
        };

        filter(filters)

        applyFilter({ transactionStatus: filters.selectedOptions, transactionTypes: filters.selectedTransactionTypes, startDate: filters.startDate[0], endDate: filters.endDate[0] });
        setHasChanges(false);
    }



    return (
        <>
            {isOpen && <Box className="backdrop" onClick={closeFilters}></Box>}
            {isOpen && <Box className={`filter__modal ${showFilters ? ' test' : 'test-out'}`}>
                {/* {options} */}
                <Box>
                    <Box className="filter__modal-header">
                        <h3>Filter</h3>
                        <Image
                            src="/assets/icons/close-icon.svg"
                            alt="Close Modal Icon"
                            width={34}
                            height={34}
                            priority
                            onClick={() => closeFilters()}
                        />
                    </Box>
                    <Box className="filter__modal-body">
                        <Box className="filter__duration">
                            <button>Today</button>
                            <button>Last 7 days</button>
                            <button>This month</button>
                            <button>Last 3 months</button>
                        </Box>
                        <Box className="filter__container">
                            <Box className="filter__container__item">
                                <p className="status">Date Range</p>
                                <Box className="filter__container__item__options">
                                    <Box display={'flex'} justifyContent='space-between' gap={'1rem'}>
                                        <DatePicker onChange={handleStartDate} defaultDate={oneMonthAgo} />
                                        <DatePicker onChange={handleEndDate} defaultDate={currentDate} />
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="filter__container__item">
                                <p className="status">Transaction Type</p>
                                <Box className="filter__container__item__options">
                                    <Box className="dropdown" onMouseLeave={() => setShowTransactionDropdown(false)}>
                                        <Text noOfLines={1} className="dropbtn" onClick={() => setShowTransactionDropdown(!showTransactionDropdown)}>{selectedTransactionTypes.join(', ')}</Text>
                                        {
                                            showTransactionDropdown && <Box className="dropdown-content">
                                                <label><input type="checkbox" checked={selectedTransactionTypes.includes('store transactions')} onChange={() => handleTransactionTypeChange('store transactions')} /> Store Transactions</label>
                                                <label><input type="checkbox" checked={selectedTransactionTypes.includes('get tipped')} onChange={() => handleTransactionTypeChange('get tipped')} /> Get Tipped</label>
                                                <label><input type="checkbox" checked={selectedTransactionTypes.includes('deposit')} onChange={() => handleTransactionTypeChange('deposit')} /> Deposits</label>
                                                <label><input type="checkbox" checked={selectedTransactionTypes.includes('withdrawal')} onChange={() => handleTransactionTypeChange('withdrawal')} /> Withdrawals</label>
                                                <label><input type="checkbox" checked={selectedTransactionTypes.includes('chargeback')} onChange={() => handleTransactionTypeChange('chargeback')} /> Chargebacks</label>
                                                <label><input type="checkbox" checked={selectedTransactionTypes.includes('cashback')} onChange={() => handleTransactionTypeChange('cashback')} /> Cashbacks</label>
                                                <label><input type="checkbox" checked={selectedTransactionTypes.includes('refer&earn')} onChange={() => handleTransactionTypeChange('refer&earn')} /> Refer & Earn</label>

                                            </Box>
                                        }
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="filter__container__item">
                                <p className="status">Transaction Status</p>
                                <Box className="filter__container__item__options">
                                    <Box className="dropdown" onMouseLeave={() => setShowOptionsDropdown(false)}>
                                        <Text className="dropbtn" noOfLines={1} onClick={() => setShowOptionsDropdown(!showOptionsDropdown)}>{selectedOptions.join(', ')}</Text>
                                        {
                                            showOptionsDropdown && <Box className="dropdown-content">
                                                <label><input type="checkbox" checked={selectedOptions.includes('successful')} onChange={() => handleCheckboxChange('successful')} /> Successful</label>
                                                <label><input type="checkbox" checked={selectedOptions.includes('pending')} onChange={() => handleCheckboxChange('pending')} /> Pending</label>
                                                <label><input type="checkbox" checked={selectedOptions.includes('failed')} onChange={() => handleCheckboxChange('failed')} /> Failed</label>

                                            </Box>
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className="filter__modal-footer">
                    <button className="filter-clear" onClick={() => clearFilters()}>Clear</button>
                    <button className="filter-apply" onClick={() => applyFilters()} disabled={!hasChanges}>Apply</button>
                </Box>
            </Box>}
        </>
    )
}