import React, {useContext} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardProduct from "./cardItem/cardProduct";
import Divider from "@material-ui/core/Divider";
import BasketContext from "../../context/basketContext";


function Basket({openBasket, handleCloseBasket, clearBasket, }) {
    const {basket, setBasket} = useContext(BasketContext);

    const unitPrice = Array.isArray(basket)&& basket.length ?
        basket.map((ele)=> ele.price)
            .reduce((sum, item)=>sum+item )
        : null;

    return (
        <Dialog open={openBasket}
                onClose={handleCloseBasket}
                maxWidth="md"
                fullWidth>
            <DialogTitle>
                КОШИК
            </DialogTitle>
            <DialogContent>
                <Grid container direction="row"
                      justify="flex-start"
                      alignItems="center">
                    {Array.isArray(basket) && basket.length ?
                        basket.map(({title, price, id, amount}) =>
                            <CardProduct key={id}
                                         title={title}
                                         price={price}
                                         id={id}
                                         amount={amount}/>
                        ) : null}
                </Grid>
            </DialogContent>
            <Divider/>
            <Grid container>
                <Grid item xs={4}>
                    <Grid container justify="center">
                        <Typography variant="h5">
                            {unitPrice} грн
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    <Button onClick={handleCloseBasket} variant="contained" color="primary">
                        Продовжити покупки
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button onClick={clearBasket} variant="contained" color="secondary">
                        Очистити
                    </Button>
                </Grid>
            </Grid>
        </Dialog>
    );
}
export default Basket;