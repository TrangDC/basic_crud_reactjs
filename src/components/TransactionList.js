import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionList.css'; // Import the CSS file

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/transactions');
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const groupTransactionsByDate = () => {
        const groupedTransactions = {};

        transactions.forEach(transaction => {
            const date = new Date(transaction.transactionDate).toDateString();
            groupedTransactions[date] = groupedTransactions[date] || [];
            groupedTransactions[date].push(transaction);
        });

        // Sort dates in ascending order
        const sortedDates = Object.keys(groupedTransactions).sort(
            (a, b) => new Date(b) - new Date(a)
        );

        return sortedDates.map(date => ({
            date,
            transactions: groupedTransactions[date],
        }));
    };

    const today = new Date().toDateString();
    const groupedTransactions = groupTransactionsByDate();

    return (
        <div className="transaction-list">
            {groupedTransactions.map(({ date, transactions }) => (
                <div key={date} className="transaction-day">
                    <h2>{date === today ? 'Today' : date}</h2>
                    {transactions.map(transaction => (
                        <div key={transaction.id} className="transaction-item">
                            <div>Amount: {transaction.amount}</div>
                            <div>Note: {transaction.note}</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TransactionList;
