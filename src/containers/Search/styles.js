import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
root: {
    padding: '5px 4px',
    display: 'flex',
    alignItems: 'center',
    flexGrow: "0.9",
},
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },

}));

export default useStyles