import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from "@material-ui/core/Divider";

import FormLogin from '../../components/Login/Login'
import BasketIcon from "../../components/Basket/BasketIcon/BasketIcon";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header({basket, openBasket, handleOpenBasket, handleCloseBasket}) {
    const classes = useStyles();



    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        STORE
                    </Typography>
                    <Divider orientation="vertical" variant="middle" flexItem/>
                    <Button onClick={handleOpenBasket}>
                        <BasketIcon basket={basket}/>
                        <Typography variant="h6" color="inherit">
                            КОШИК
                        </Typography>
                    </Button>
                    <Divider orientation="vertical" variant="middle" flexItem/>
                    <Button color="inherit">
                        <FormLogin/>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
