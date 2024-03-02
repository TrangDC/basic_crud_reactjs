import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Box, ListItemButton } from "@mui/material";
import './PinnedSubheaderList.css';
import { useEffect, useState } from "react";
import axios from "axios";
import OutlinedCard from "./OutlinedCard";
import Button from "@mui/material/Button";

export default function PinnedSubheaderList() {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const handlePrevNextMonths = (increment) => {
        const newMonthIndex = (currentMonthIndex + increment + 12) % 12;
        setCurrentMonthIndex(newMonthIndex);
        if (newMonthIndex === 11 && increment === 1) {
            setCurrentYear(currentYear + 1);
        } else if (newMonthIndex === 0 && increment === -1) {
            setCurrentYear(currentYear - 1);
        }
    };

    const handleCurrentMonth = () => {
        setCurrentMonthIndex(new Date().getMonth());
        setCurrentYear(new Date().getFullYear());
    };

    const groupTransactionsByDate = () => {
        const groupedTransactions = {};

        transactions.forEach(transaction => {
            const date = new Date(transaction.transactionDate);
            const transactionMonth = date.getMonth();
            const transactionYear = date.getFullYear();
            if (transactionMonth === currentMonthIndex && transactionYear === currentYear) {
                const dateString = date.toDateString();
                groupedTransactions[dateString] = groupedTransactions[dateString] || [];
                groupedTransactions[dateString].push(transaction);
            }
        });

        return Object.keys(groupedTransactions).map(dateString => ({
            date: new Date(dateString),
            transactions: groupedTransactions[dateString],
        })).sort((a, b) => b.date - a.date);
    };

    const handleTransactionClick = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const handleCloseClick = () => {
        setSelectedTransaction(null);
    };

    const groupedTransactions = groupTransactionsByDate();

    return (
        <Box className="root">
            <Box className="box">
                <nav aria-label="secondary mailbox folders">
                    <ListSubheader>
                        <Button onClick={() => handlePrevNextMonths(-1)}>{months[(currentMonthIndex + 11) % 12]} {currentYear}</Button>
                        <Button>{months[currentMonthIndex]} {currentYear}</Button>
                        <Button onClick={() => handlePrevNextMonths(1)}>{months[(currentMonthIndex + 1) % 12]} {currentYear}</Button>
                    </ListSubheader>
                    <List className="list" subheader={<li />}>
                        {groupedTransactions.length === 0 ? (
                            <Box>
                                <ListItem>
                                    No transactions for this month
                                </ListItem>
                                <Button onClick={handleCurrentMonth}>Back to Current Month</Button>
                            </Box>
                        ) : (
                            <List className="list" subheader={<li />}>
                                {groupedTransactions.map(({ date, transactions }) => (
                                    <li key={date}>
                                        <ListSubheader>{date.toDateString()}</ListSubheader>
                                        {transactions.map((transaction) => (
                                            <ListItem key={transaction.id} onClick={() => handleTransactionClick(transaction)}>
                                                <ListItemButton>
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
                        )}
                    </List>
                </nav>
            </Box>
            {selectedTransaction && (
                <>
                    <OutlinedCard transaction={selectedTransaction} onClose={handleCloseClick}/>
                </>
            )}
        </Box>
    );
}
