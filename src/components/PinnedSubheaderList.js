import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import {Box, Divider, ListItemButton} from "@mui/material";
import './PinnedSubheaderList.css';
import {useEffect, useState} from "react";
import axios from "axios";

export default function PinnedSubheaderList() {

    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

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
    const handleTransactionClick = (transaction) => {
        setSelectedTransaction(transaction);
    };

    return (
        <Box className="root">
            <Box className="box">
                <Divider />
                <nav aria-label="secondary mailbox folders">
                    <ListSubheader>Group by date</ListSubheader>
                    <List className="list" subheader={<li />}>
                        {groupedTransactions.map(({ date, transactions }) => (
                            <li key={date}>
                                <ListSubheader>{date === today ? 'Today' : date}</ListSubheader>
                                {transactions.map((transaction) => (
                                    <ListItem key={transaction.id}>
                                        <ListItemButton onClick={() => handleTransactionClick(transaction)}>
                                            <ListItemText>
                                                <span>{transaction.amount} </span>
                                                <span>{transaction.note}</span>
                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </li>
                        ))}
                    </List>
                </nav>
            </Box>
            {selectedTransaction && (
                <Box className="detail-card">
                    <p>Transaction Details:</p>
                    <p>Amount: {selectedTransaction.amount}</p>
                    <p>Note: {selectedTransaction.note}</p>
                </Box>
            )}
        </Box>
    );
}