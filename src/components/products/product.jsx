import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import BasketContext from "../../context/basketContext";


const useStyles = makeStyles({
    root: {
        maxHeight: 400,

    },
    media: {
        height: '250px',
        margin: '5px'

    },
    text: {
        height: '50px'
    }
});

export default function ProductCard({title, price, url, handleOpenBasket, id}) {
    const classes = useStyles();



    const {basket, setBasket} = useContext(BasketContext);
    const setProductCount = name => {
        const product =  basket.map((el) => el.id).find(elem => elem === id);
        if (product===undefined){
            const basketConcat = [name, ...basket];
            setBasket(basketConcat)
        }
    };






    return (

        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={url}
                    title="Contemplative Reptile"
                />
                <CardContent className={classes.text}>
                    <Typography gutterBottom variant="h6" component="h2">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Typography variant="h5">
                    {`${price} грн`}
                </Typography>

                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={function (event) {
                        setProductCount({
                            title:title,
                            price:price,
                            id:id,
                            amount: 1
                        },
                            event
                        );
                        handleOpenBasket(event)
                    }}>
                    Купити
                </Button>
            </CardActions>
        </Card>
    );
}
