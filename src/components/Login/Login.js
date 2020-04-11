import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';


import SignUp from './SignUp/SignUp'

export default function FormLogin() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="black" onClick={handleClickOpen}>
                Реєстрація
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
               <SignUp/>
            </Dialog>
        </div>
    );
}
