import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactTable from 'react-table-v6';
import Moment from 'react-moment';

export default function Showtrainings(props) {
    const [training, setTraining] = useState([]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        fetch(props.trainings.links[2].href)
        .then(response => response.json())
        .then(data => setTraining(data.content))
        .catch(err => console.error(err))
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        {
            Header: "Date",
            Cell: row => (
                <Moment format="DD.MM.YYYY">
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
        }
    ]

    return (
        <div>
            <Button variant="outlined" size="small" style={{color:"#5c7cfa", borderColor:"#5c7cfa", border:"2px solid"}} onClick={handleClickOpen}>Show Trainings</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Customer Trainings</DialogTitle>
                <DialogContent>
                    <ReactTable filterable={true} defaultPageSize={10} data={training} columns={columns}/>
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