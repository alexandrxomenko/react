import React, {useEffect, useState} from "react";
import axios from "axios";


import CategoryMenu from "./MenuCategory";



function Menu({categorie}) {





    return (
        <nav>
            {categorie.map(({id, categorie_name, children: subChildren, alias,  ...rest}) =>
               <CategoryMenu
                   id={id}
                   primary={categorie_name}
                   subChildren={subChildren}
                   to={`/categorie/${alias}`} />
            )}
        </nav>
    );
}

export default Menu;