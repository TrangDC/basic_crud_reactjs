import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Divider} from "@mui/material";

export default function OutlinedCard({ transaction, onClose }) {
    return (
        <Card sx={{ width: 750, height: 300 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Transaction details
                </Typography>
                <Divider/>
                <Typography gutterBottom variant="h5" component="div">
                    {transaction.category.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {transaction.wallet.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {transaction.transactionDate}
                </Typography>
                <Divider/>
                <Typography gutterBottom variant="h5" component="div">
                    {transaction.note}
                </Typography>
                <Typography variant="h4" color="text.secondary"
                    style={{ color: transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT' ? 'blue' : 'red' }}
                >
                    {transaction.category.type === 'INCOME' || transaction.category.type === 'DEBT' ? '+' : '-'}
                    {transaction.amount}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={onClose} size="small">Close</Button>
            </CardActions>
        </Card>
    );
}