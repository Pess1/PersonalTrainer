import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Addcustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
       firstname: "",
       lastname: "",
       streetaddress: "",
       postcode: "",
       city: "",
       email: "",
       phone: ""
    })

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        props.addCustomer(customer);
        setCustomer({
            firstname: "",
            lastname: "",
            streetaddress: "",
            postcode: "",
            city: "",
            email: "",
            phone: ""
        })
        setOpen(false);
    }

    const handleCancelClose = () => {
        setOpen(false);
    }

    const inputChanged = event => {
        setCustomer({...customer, [event.target.name]: event.target.value});
    }

    return (
        <div>
            <Button variant="outlined" size="small" style={{color: "#37bd7a", border:"1px solid", borderColor:"#37bd7a", margin: 10}} onClick={handleClickOpen}>
                New Customer
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Firstname"
                        name="firstname"
                        value={customer.firstname}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Lastname"
                        name="lastname"
                        value={customer.lastname}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Streetaddress"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Postcode"
                        name="postcode"
                        value={customer.postcode}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="City"
                        name="city"
                        value={customer.city}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email"
                        name="email"
                        value={customer.email}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Phone"
                        name="phone"
                        value={customer.phone}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}