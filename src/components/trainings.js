import React, {useState, useEffect } from 'react'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Showcustomer from './showcustomer';
import Moment from 'react-moment';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

export default function Trainings() {

    const [trainings, setTrainings] = useState([]);
    const [msg, setMsg] = useState("");
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch("https://customerrest.herokuapp.com/api/trainings")
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))

    }

    const deleteTraining = (url) => {
        if (window.confirm("Are you sure you want to delete training?")) {
            fetch(url, {
                method: "DELETE"
            })
            .then(response => getTrainings())
            .then(_ => {
                setMsg("Customer deleted!");
                setOpen(true);
            })
            .catch(err => console.error(err))
        }
    }

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
        },
        {
            Header: "Customer",
            Cell: row => (
                <Showcustomer customer={row.original} />
            )
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
            <ReactTable filterable={true} defaultPageSize={20} data={trainings} columns={columns}/>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
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
    );
}