import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ListIcon from '@material-ui/icons/List';

import {
    Button, makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    avatar: {
        height: 100,
        width: 100
    }
}));

export default function FormDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<ListIcon />}
                onClick={handleClickOpen}
            >
                Ver
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">COORDENADAS</DialogTitle>
                <DialogContent>
                    <div className={classes.root}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem button>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={'ESTANTE: '+ props.location.shelf} />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={'SALA: ' + props.location.room} />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={'LIBRERO: ' +props.location.bookseller} />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={'POSICION: '+props.location.position} />
                            </ListItem>
                        </List>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        CERRAR
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

