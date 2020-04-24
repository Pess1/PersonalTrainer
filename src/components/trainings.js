import React, {useState, useEffect } from 'react'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Showcustomer from './showcustomer';

export default function Trainings() {

    const [trainings, setTrainings] = useState([]);
    
    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch("https://customerrest.herokuapp.com/api/trainings")
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .then(_ => changeDateFormat())
        .catch(err => console.error(err))

    }

    const changeDateFormat = () => {
        for (var i = 0; i <= trainings.length; i++) {
            console.log(trainings[0].date)
            setTrainings({...trainings[i], date: trainings[i].date.getDate()})
        }  
    }

    const columns = [
        {
            Header: "Date",
            accessor: "date"
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
                <Showcustomer customer={row} />
            )
        },
    ]

    return (
        <div>
            <ReactTable filterable={true} defaultPageSize={15} data={trainings} columns={columns}/>
        </div>
    );
}