import React, {useContext, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import Menu from "../Menu/Menu";
import useStyles from "./styles";
import Category from "../../components/Category/Category";
import useDataApi from "../../utils/hooks/useDataApi";
import Header from "../Header/Header";
import Basket from "../../components/Basket/Basket";
import BasketContext from "../../context/basketContext";



function Layout() {
    const classes = useStyles();
    const categorie = useDataApi({url: '/categories'});

    const [openBasket, setOpenBasket] = React.useState(false);

    const handleOpenBasket = () => setOpenBasket(true);
    const handleCloseBasket = () => setOpenBasket(false);

    const {basket, setBasket} = useContext(BasketContext);

    const delProductItem = name => {
        console.log('======>', name)};

    const clearBasket = () => {
        setBasket(localStorage.removeItem('savedProducts'));
        setBasket([])
    }

    return (
        <>
        <BrowserRouter>
            <Grid container className={classes.app} spacing={1}>
                <Grid className={classes.header} item xs={12}>
                    <Header
                        handleOpenBasket={handleOpenBasket}
                        basket={basket}
                    />
                </Grid>
                <Grid className={classes.menu} item xs={3}>
                    <Menu categorie={categorie.data}/>
                </Grid>
                <Grid container className={classes.mainSection} item xs={9}>
                    <Switch>
                        <Route path="/categorie/:alias">
                            <Category
                                categories={categorie.data}
                                handleOpenBasket={handleOpenBasket}

                            />
                        </Route>
                        <Route>
                            404
                        </Route>
                    </Switch>
                </Grid>
            </Grid>
        </BrowserRouter>
        <Basket openBasket={openBasket}
                onClose={handleCloseBasket}
                handleCloseBasket={handleCloseBasket}
                basket={basket}
                clearBasket={clearBasket}
                />
        </>
    );
}

export default Layout;