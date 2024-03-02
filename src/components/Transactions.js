import React, {useState} from 'react';
import PinnedSubheaderList from "./PinnedSubheaderList";
import OutlinedCard from "./OutlinedCard";

const Transactions = () => {
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const handleTransactionClick = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const handleCloseCard = () => {
        setSelectedTransaction(null);
    };

    return (
        <div>
            {/* Render PinnedSubheaderList nếu không có selectedTransaction */}
            {!selectedTransaction && <PinnedSubheaderList onTransactionClick={handleTransactionClick} />}
            {/* Render OutlinedCard và PinnedSubheaderList nếu có selectedTransaction */}
            {selectedTransaction && (
                <>
                    <PinnedSubheaderList onTransactionClick={handleTransactionClick} />
                    <OutlinedCard transaction={selectedTransaction} onClose={handleCloseCard} />
                </>
            )}
        </div>
    );
};

export default Transactions;