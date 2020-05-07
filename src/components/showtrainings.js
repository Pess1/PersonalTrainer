import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactTable from 'react-table-v6';
import Moment from 'react-moment';
import Snackbar from '@material-ui/core/Snackbar';
import Addtrainings from './addtrainings';

export default function Showtrainings(props) {
    const [training, setTraining] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState("");
    const [snackOpen, setSnackOpen] = React.useState(false);

    const handleClickOpen = () => {
        fetch(props.trainings.links[2].href)
            .then(response => response.json())
            .then(data => setTraining(data.content))
            .catch(err => console.error(err))

        setOpen(true);
        console.log(props.trainings)
    };

    const addTraining = (training) => {
        fetch("https://customerrest.herokuapp.com/api/trainings",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(training)
        })
        .then(response => handleClickOpen())
        .then(_ => {
            setMsg("New Training Added!");
            setSnackOpen(true)
        })
        .catch(err => console.error(err))
    }

    const deleteTraining = (url) => {
        if (window.confirm("Are you sure you want to delete training?")) {
            fetch(url, {
                method: "DELETE"
            })
            .then(response => handleClickOpen())
            .then(_ => {
                setMsg("Training deleted!");
                setOpen(true);
            })
            .catch(err => console.error(err))
        }
        
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSnackClose = () => {
        setSnackOpen(false);
    };

    const columns = [
        {
            Header: "Date",
            Cell: row => (
                <Moment format="DD.MM.YYYY HH:mm">
                    {row.original.date}
                </Moment>
            )
        },
        {
            Header: "Duration",
            accessor: "duration"
        },
        {
            Header: "Activity",
            accessor: "activity"
        },
        {
            accessor: "links[0].href",
            Cell: row => (
                <Button color="secondary" size="small" onClick={() => deleteTraining(row.value)}>Delete</Button>
            )
        }
    ]

    return (
        <div>
            <Button variant="outlined" size="small" style={{color:"#5b96f5", border: "none", fontWeight:"bold"}} onClick={handleClickOpen}>Trainings</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Customer Trainings</DialogTitle>
                <DialogContent>
                    <ReactTable filterable={true} defaultPageSize={10} data={training} columns={columns}/>
                </DialogContent>
                <DialogActions>
                    <Addtrainings addTraining={addTraining} customer={props.trainings.links[0].href}/>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackOpen}
                autoHideDuration={4000}
                onClose={handleSnackClose}
                message={msg}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                style={{
                    backgroundColor: "orange"
                }}
            />
        </div>     
    )


}