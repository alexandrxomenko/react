import React from "react";
import {withRouter} from 'react-router-dom'
import useDataApi from "../../utils/hooks/useDataApi";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import ProductCard from "../products/product";
import {TextField} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import Header from "../../containers/Header/Header";

function Category({match:{params}, handleOpenBasket}) {
    const {alias} = params;

    const products = useDataApi({url: `/categories/${alias}`});


    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,

        },
        paper: {
            padding: theme.spacing(2),
            height: 400,
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));

    const classes = useStyles();

    return (
        <div className={classes.root}>

                    <Grid container >
                        {products.length ? <> {products.map(({id, product_name,price,url, ...rest}) =>
                        <Grid key={id} item xs={12} sm={6} md={3}>
                            <ProductCard key={id}
                                className={classes.paper}
                                title={product_name}
                                price={price}
                                url={url}
                                id={id}
                                handleOpenBasket={handleOpenBasket}
                                />
                        </Grid>
                        )}</>: null}
                    </Grid>

        </div>

    )

}

export default withRouter(Category);