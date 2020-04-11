import React from "react";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


import useStyles from "./styles";


function Search() {
    const classes = useStyles();

    return(
        <Paper component="form" className={classes.root}>
            <InputBase className={classes.input}
            placeholder="ПОШУК ТОВАРІВ"
            inputProps={{'aria-label': 'search'}}
            />
            <IconButton className={classes.iconButton} type="submit" aria-label='search'>
                <SearchIcon/>
            </IconButton>

        </Paper>

    )

}

export default Search