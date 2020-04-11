import React, {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import BasketContext from "../../../context/basketContext";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '10ch',
        },
    },
}));


export default function CardProduct({title, price, id, amount}) {
    const classes = useStyles();

    const {basket, setBasket} = useContext(BasketContext);

    const deleteIndexProdut = (idProduct) => {
        const index = basket.map((el) => el.id).findIndex((elem) => elem === idProduct);
        basket.splice(index, 1);
        setBasket(basket)
    };

    const onChangeInput = (event) => {
        const index = basket.map((el) => el.id).findIndex((elem) => elem === id);
        basket[index]['amount'] = event.target.value;
        basket[index]['price'] = event.target.value * price;
        setBasket(basket)
    }

    return (
        <>

            <Grid item xs={7}>
                <Typography>
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField  key={id}
                                id={id}
                                label="кількість"
                                value={amount}
                                type="number"
                                onChange={onChangeInput}
                                InputLabelProps={{
                                    shrink: true,
                                }}/>
                </form>
            </Grid>
            <Grid item xs={2}>
                <Typography>
                    {price} грн
                </Typography>
            </Grid>

            <Grid item xs={1}>
                <IconButton onClick={() => deleteIndexProdut(id)} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </Grid>


        </>

    );
}