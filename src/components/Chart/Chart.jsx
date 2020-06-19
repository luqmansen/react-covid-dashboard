import React, {useState, useEffect} from 'react'
import {fetchDailyData} from '../../api'
import {Line, Bar} from 'react-chartjs-2'

import styles from './Chart.module.css'

const Chart = ({data:{confirmed, deaths, recovered}, country}) => {
    const [dailyData, setDailyData] = useState({});

    useEffect(() =>{
        const fetchAPI = async()=>{
            setDailyData(await fetchDailyData())
        }
        
        fetchAPI();
    }, [setDailyData])
    
    const lineChart = (
      dailyData.length
      ? (
      <Line
        data={{
            labels: dailyData.map(({date})=> date),
            datasets: [{
                data:dailyData.map(({confirmed})=> confirmed),
                label: 'Infected',
                borderColor:'#3333ff',
                fill:true
            },{
                data:dailyData.map(({deaths})=> deaths),
                label: 'Deaths',
                borderColor:'red',
                backgroundColor: 'pink',
                fill:true

            }],
        }}
      />) : null
    );
    // {confirmed? console.log(confirmed.value): console.log("yeet")};
    const barChart = (
        confirmed
        ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['orange','green', 'red'],
                        data: [confirmed.value, recovered.value, deaths.value],
                    }],
                }}
                options={{
                    legend: {display:false},
                    title: {display:true, text: `Current state in ${country}`}
                }}
            />
        ): null
    )

    return (
        <div className={styles.container}>
            {country ? barChart: lineChart}
        </div>
    )
}

export default Chart;