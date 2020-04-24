import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Showcustomer(props) {
    const [customer, setCustomer] = useState(
        {
            firstname: "", 
            lastname: "",
            address: "",
            postcode: "",
            city: "",
            email: "",
            phone: ""
        }
    );

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        getCustomerName();
    }, [])
    
    const getCustomerName = () => {
        fetch(props.customer.original.links[2].href)
        .then(response => response.json())
        .then(data => setCustomer(
            {
                firstname: data.firstname, 
                lastname: data.lastname,
                address: data.address,
                postcode: data.postcode,
                city: data.city,
                email: data.email,
                phone: data.phone
            }
        ))
        .catch(err => console.error(err))

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" size="small" color="primary" onClick={handleClickOpen}>{customer.firstname} {customer.lastname}</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Customer Details</DialogTitle>
                <DialogContent>
                    <p>{customer.firstname}</p>
                    <p>{customer.lastname}</p>
                    <p>{customer.address}</p>
                    <p>{customer.postcode}</p>
                    <p>{customer.city}</p>
                    <p>{customer.email}</p>
                    <p>{customer.phone}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>     
    )


}