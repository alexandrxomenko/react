import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Collapse from "@material-ui/core/Collapse";
import ListItemLink from "../../components/ListItemLink/ListItemLink";
import useStyles from "./styles";

import React from "react";
import {Link} from "react-router-dom"
import {Divider, ListItemIcon} from "@material-ui/core";


function CategoryMenu({id, primary, subChildren, alias, ...rest}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleCategoriesClick = () => {
        setOpen(!open)
    };

    return(
        <>
            <ListItem>
                <ListItem key={id} button component={Link}  {...rest}>
                    <ListItemText primary={primary}/>
                </ListItem>
                {subChildren.length? <>
                <ListItemIcon  onClick={handleCategoriesClick}>
                        {open ? <NavigateBeforeIcon/> : <NavigateNextIcon/>}
                </ListItemIcon>
                </> : null}
            </ListItem>
            <Divider variant="middle" />
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List key={id} component="div" disablePadding>
                    {Array.isArray(subChildren) ?
                        subChildren.map(({id, categorie_name, alias}) =>
                            <ListItemLink key={id} primary={categorie_name} to={`/categorie/${alias}`}/>
                        ) : []}
                </List>
            </Collapse>

        </>
    )
}


export default CategoryMenu