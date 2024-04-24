'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import flatpickr from "flatpickr";
import DatePicker from "./DatePicker";
import { Text } from "@chakra-ui/react";

export default function FilterModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>(['successful', 'pending', 'failed']);

    const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<string[]>(['store transactions', 'get tipped', 'withdrawals', 'chargebacks', 'cashbacks', 'refer&earn']);

    const [showFilters, setShowFilters] = useState(false);

    const [showTransactionDropdown, setShowTransactionDropdown] = useState(false);
    const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);

    const handleTransactionTypeChange = (option: string) => {
        if (selectedTransactionTypes.includes(option)) {
            setSelectedTransactionTypes(selectedTransactionTypes.filter(item => item !== option));
        } else {
            setSelectedTransactionTypes([...selectedTransactionTypes, option]);
        }
    }

    // Function to handle checkbox change
    const handleCheckboxChange = (option: string) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(item => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
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

    const [selectedDate, setSelectedDate] = useState(new Date());


    return (
        <>
            {isOpen && <div className="backdrop" onClick={closeFilters}></div>}
            {isOpen && <div className={`filter__modal ${showFilters ? ' test' : 'test-out'}`}>
                <div>
                    <div className="filter__modal-header">
                        <h3>Filter</h3>
                        <Image
                            src="/assets/icons/close-icon.svg"
                            alt="Close Modal Icon"
                            width={34}
                            height={34}
                            priority
                            onClick={() => closeFilters()}
                        />
                    </div>
                    <div className="filter__modal-body">
                        <div className="filter__duration">
                            <button>Today</button>
                            <button>Last 7 days</button>
                            <button>This month</button>
                            <button>Last 3 months</button>
                        </div>
                        <div className="filter__container">
                            <div className="filter__container__item">
                                <p>Date Range</p>
                                <div className="filter__container__item__options">
                                    {/* <DatePicker onChange={setSelectedDate} /> */}
                                    <select name="" id="">
                                        <option value="All"><input type="checkbox" /> All</option>
                                        <option value="Received">Received</option>
                                        <option value="Sent">Sent</option>
                                    </select>
                                </div>
                            </div>
                            <div className="filter__container__item">
                                <p>Transaction Type</p>
                                <div className="filter__container__item__options">
                                    <div className="dropdown" onMouseLeave={() => setShowTransactionDropdown(false)}>
                                        <Text noOfLines={1} className="dropbtn" onClick={() => setShowTransactionDropdown(!showTransactionDropdown)}>{selectedTransactionTypes.join(', ')}</Text>
                                        {
                                            showTransactionDropdown && <div className="dropdown-content">
                                                <label><input type="checkbox" checked={selectedTransactionTypes.includes('store transactions')} onChange={() => handleTransactionTypeChange('store transactions')} /> Store Transactions</label>
                                                <label><input type="checkbox" checked={selectedTransactionTypes.includes('get tipped')} onChange={() => handleTransactionTypeChange('get tipped')} /> Get Tipped</label>
                                                <label><input type="checkbox" checked={selectedTransactionTypes.includes('withdrawals')} onChange={() => handleTransactionTypeChange('withdrawals')} /> Withdrawals</label>
                                                <label><input type="checkbox" checked={selectedTransactionTypes.includes('chargebacks')} onChange={() => handleTransactionTypeChange('chargebacks')} /> Chargebacks</label>
                                                <label><input type="checkbox" checked={selectedTransactionTypes.includes('cashbacks')} onChange={() => handleTransactionTypeChange('cashbacks')} /> Cashbacks</label>
                                                <label><input type="checkbox" checked={selectedTransactionTypes.includes('refer&earn')} onChange={() => handleTransactionTypeChange('refer&earn')} /> Refer & Earn</label>

                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="filter__container__item">
                                <p className="status">Transaction Status</p>
                                <div className="filter__container__item__options">
                                    <div className="dropdown" onMouseLeave={() => setShowOptionsDropdown(false)}>
                                        <Text className="dropbtn" noOfLines={1} onClick={() => setShowOptionsDropdown(!showOptionsDropdown)}>{selectedOptions.join(', ')}</Text>
                                        {
                                            showOptionsDropdown && <div className="dropdown-content">
                                                <label><input type="checkbox" checked={selectedOptions.includes('successful')} onChange={() => handleCheckboxChange('successful')} /> Successful</label>
                                                <label><input type="checkbox" checked={selectedOptions.includes('pending')} onChange={() => handleCheckboxChange('pending')} /> Pending</label>
                                                <label><input type="checkbox" checked={selectedOptions.includes('failed')} onChange={() => handleCheckboxChange('failed')} /> Failed</label>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="filter__modal-footer">
                    <button className="filter-clear">Clear</button>
                    <button className="filter-apply" onClick={() => closeFilters()}>Apply</button>
                </div>
            </div>}
        </>
    )
}