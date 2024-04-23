'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

export default function FilterModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>(['successful', 'pending', 'failed']);

    const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<string[]>(['store transactions', 'get tipped', 'withdrawals']);

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
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return ( 
        <>
            {isOpen && <div className="backdrop" onClick={onClose}></div>}
            <div className='filter__modal slide-in'>
                <div>
                    <div className="filter__modal-header">
                        <h3>Filter</h3>
                        <Image
                            src="/assets/icons/close-icon.svg"
                            alt="Close Modal Icon"
                            width={34}
                            height={34}
                            priority
                            onClick={() => onClose()}
                        />
                    </div>
                    <div className="filter__modal-body">
                        <div className="filter__duration">
                            <button>Today</button>
                            <button>Last 7 days</button>
                            <button>This month</button>
                            {/* <button>Last 3 months</button> */}
                        </div>
                        <div className="filter__container">
                            <div className="filter__container__item">
                                <p>Date Range</p>
                                <div className="filter__container__item__options">
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
                                    <div className="dropdown">
                                        <button className="dropbtn">{selectedTransactionTypes.join(', ')}</button>
                                        <div className="dropdown-content">
                                            <label><input type="checkbox" checked={selectedTransactionTypes.includes('store transactions')} onChange={() => handleTransactionTypeChange('store transactions')} /> Store Transactions</label>
                                            <label><input type="checkbox" checked={selectedTransactionTypes.includes('get tipped')} onChange={() => handleTransactionTypeChange('get tipped')} /> Get Tipped</label>
                                            <label><input type="checkbox" checked={selectedTransactionTypes.includes('withdrawals')} onChange={() => handleTransactionTypeChange('withdrawals')} /> Withdrawals</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="filter__container__item">
                                <p>Transaction Status</p>
                                <div className="filter__container__item__options">
                                    <div className="dropdown">
                                        <button className="dropbtn">{selectedOptions.join(', ')}</button>
                                        <div className="dropdown-content">
                                            <label><input type="checkbox" checked={selectedOptions.includes('successful')} onChange={() => handleCheckboxChange('successful')} /> Successful</label>
                                            <label><input type="checkbox" checked={selectedOptions.includes('pending')} onChange={() => handleCheckboxChange('pending')} /> Pending</label>
                                            <label><input type="checkbox" checked={selectedOptions.includes('failed')} onChange={() => handleCheckboxChange('failed')} /> Failed</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="filter__modal-footer">
                    <button className="filter-clear">Clear</button>
                    <button className="filter-apply" onClick={() => onClose()}>Apply</button>
                </div>
            </div>
        </>
    )
}