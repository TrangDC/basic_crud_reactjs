import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function OutlinedCard({ transaction, onClose }) {
    return (
        <Card sx={{ width: 450, height: 200 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {transaction.amount}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    {transaction.note}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={onClose} size="small">Close</Button>
            </CardActions>
        </Card>
    );
}