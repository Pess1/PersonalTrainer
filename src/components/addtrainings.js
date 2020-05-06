import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Moment from 'react-moment';

export default function Addtrainigs(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
       date: "",
       duration: 0,
       activity: "",
       customer: props.customer
    })

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setTraining({...training, customer: props.customer})
        props.addTraining(training);
        setTraining({
            date: "",
            duration: 0,
            activity: "",
            customer: ""
        })
        setOpen(false);
    }

    const handleCancelClose = () => {
        setOpen(false);
    }

    const inputChanged = event => {
        setTraining({...training, [event.target.name]: event.target.value});
    }

    return (
        <div>
            <Button style={{margin: 10}} variant="outlined" style={{color: "#37bd7a", border: "none"}} onClick={handleClickOpen}>
                New Training
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Date"
                        name="date"
                        value={training.date}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Duration"
                        name="duration"
                        value={training.duration}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Activity"
                        name="activity"
                        value={training.activity}
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