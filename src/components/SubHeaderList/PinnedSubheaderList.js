import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import {Box, Divider, ListItemButton} from "@mui/material";
import './PinnedSubheaderList.css';
import { useEffect, useState } from "react";
import OutlinedCard from "../OutlinedCard/OutlinedCard";
import Button from "@mui/material/Button";
import TransactionService from "../../services/transactions.services";

export default function PinnedSubheaderList() {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [totalInflow, setTotalInflow] = useState(0);
    const [totalOutflow, setTotalOutflow] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            const data = await TransactionService.fetchTransactions();
            setTransactions(data);
        };

        fetchData();
    }, [currentMonthIndex]);

    useEffect(() => {
        const inflow = TransactionService.calculateTotalInflow(transactions);
        const outflow = TransactionService.calculateTotalOutflow(transactions);
        setTotalInflow(inflow);
        setTotalOutflow(outflow);
    }, [currentMonthIndex, transactions]);


    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const handlePrevNextMonths = (currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, increment) => {
        TransactionService.handlePrevNextMonths(currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, increment)
    };

    const handleCurrentMonth = (setCurrentMonthIndex, setCurrentYear) => {
        TransactionService.handleCurrentMonth(setCurrentMonthIndex, setCurrentYear);
    };

    const groupTransactionsByDate = () => {
        return TransactionService.groupTransactionsByDate(transactions, currentMonthIndex, currentYear);
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
                        <div className="button-container">
                            <Button onClick={() => handlePrevNextMonths(currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, -1)}>
                                {currentMonthIndex === 0 ? months[11] : months[currentMonthIndex - 1]} {currentMonthIndex === 0 ? currentYear - 1 : currentYear}
                            </Button>
                            <Button>{months[currentMonthIndex]} {currentYear}</Button>
                            <Button onClick={() => handlePrevNextMonths(currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear, 1)}>
                                {currentMonthIndex === 11 ? months[0] : months[currentMonthIndex + 1]} {currentMonthIndex === 11 ? currentYear + 1 : currentYear}
                            </Button>
                        </div>
                        <div className="inflow-outflow">
                            <div>
                                <span>Inflow:</span> <span style={{ color: 'blue' }}>{totalInflow > 0 ? '+' + totalInflow : totalInflow}</span>
                            </div>
                            <div>
                                <span>Outflow:</span> <span style={{ color: 'red' }}>{totalOutflow > 0 ? '-' + totalOutflow : totalOutflow}</span>
                            </div>
                            <div>
                                <span>Total:</span> <span>{totalInflow - totalOutflow < 0 ? '-' : '+'} {Math.abs(totalInflow - totalOutflow)}</span>
                            </div>
                        </div>
                    </ListSubheader>
                    <Divider/>
                    <List className="list" subheader={<li />}>
                        {groupedTransactions.length === 0 ? (
                            <Box>
                                <ListItem>
                                    No transactions for this month
                                </ListItem>
                                <Button onClick={() => handleCurrentMonth(setCurrentMonthIndex, setCurrentYear)}>Back to Current Month</Button>
                            </Box>
                        ) : (
                            <List className="list" subheader={<li />}>
                                {groupedTransactions.map(({ date, transactions }) => (
                                    <li key={date}>
                                        <ListSubheader>{date.toDateString()}</ListSubheader>
                                        <Divider/>
                                        {transactions.map((transaction) => (
                                            <ListItem sx={{ backgroundColor: 'light', padding: '5px', borderRadius: '5px', width: '100%' }}
                                                      key={transaction.id} onClick={() => handleTransactionClick(transaction)}>
                                                <ListItemButton>
                                                    <ListItemText sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <span>{transaction.category.name}   </span>
                                                        <span style={{ color: transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT' ? 'blue' : 'red' }}>
                                                                    {transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT' ? '+' : '-'}
                                                            {transaction.amount}
                                                        </span>
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
