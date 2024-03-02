import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import {Box, Divider, ListItemButton} from "@mui/material";
import './PinnedSubheaderList.css';

export default function PinnedSubheaderList() {
    return (
        <Box className="root">
            <Box className="box">
                <Divider />
                <nav aria-label="secondary mailbox folders">
                    <List className="list" subheader={<li />}>
                        {[0, 1, 2, 3, 4].map((sectionId) => (
                            <li key={`section-${sectionId}`}>
                                    <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
                                    {[0, 1, 2].map((item) => (
                                        <ListItem key={`item-${sectionId}-${item}`}>
                                            <ListItemButton>
                                                <ListItemText primary={`Item ${item}`} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                            </li>
                        ))}
                    </List>
                </nav>
            </Box>
        </Box>
    );
}