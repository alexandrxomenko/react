import React, {useState} from "react";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import {Link} from "react-router-dom"
import Divider from "@material-ui/core/Divider";

import useStyles from "./styles";

const ListItemLink = ({primary, id, ...other}) => {
const classes = useStyles();


    return (
        <li>
            <ListItem className={classes.menuChild} key={id} button component={Link} {...other}>
                <ListItemText primary={primary}/>
            </ListItem>
            <Divider variant="inset"  />
        </li>
    );
};

export default ListItemLink;