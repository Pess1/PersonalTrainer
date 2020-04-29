import React, {useState, useEffect } from 'react'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Showcustomer from './showcustomer';
import Moment from 'react-moment';

export default function Trainings() {

    const [trainings, setTrainings] = useState([]);
    
    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch("https://customerrest.herokuapp.com/api/trainings")
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))

    }

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
    ]

    return (
        <div>
            <ReactTable filterable={true} defaultPageSize={20} data={trainings} columns={columns}/>
        </div>
    );
}