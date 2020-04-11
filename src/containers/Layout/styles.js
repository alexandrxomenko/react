import React from "react";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({

    app: {
        flexGrow: 1,
        direction: "row",
        justify: "space-around",
        alignItems: "flex-start",
        backgroundColor: '#f5f5f5',

    },
    menu: {
        backgroundColor: '#cfe8fc'
    },
    mainSection:{

        direction: "row",
        justify: "flex-end",
        alignItems: "flex-start"
    },
    header:{

        height: "75px"
    }

}));

export default useStyles