import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { io } from 'socket.io-client'
const TemperatureChart = () => {
  const [readings, setReadings] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3069/api/readings/list')
        console.log(response.data,'dataS')
        setReadings(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
    const socket = io('http://localhost:3069')
    socket.on('newReading', (newReading) => {
      setReadings((prevData) => [...prevData, newReading])
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    const filterDataByDate = () => {
      const filtered = readings.filter(data => {
        const dataTime = new Date(data.createdAt).toDateString()
        const selected = new Date(selectedDate).toDateString()
        return dataTime === selected;
      })
      setFilteredData(filtered)
    }
    filterDataByDate()
  }, [selectedDate, readings])

  const temperatureOptions = {
    title: {
      text: 'Temperature Data'
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Time'
      }
    },
    yAxis: {
      title: {
        text: 'Temperature (°C)'
      }
    },
    series: [{
      name: 'Temperature',
      data: filteredData.map(data => [new Date(data.createdAt).getTime(), data.temp]),
      tooltip: {
        valueSuffix: ' °C'
      }
    }],
    time: {
      useUTC: false
    }
  };

  const humidityOptions = {
    title: {
      text: 'Humidity Data'
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Time'
      }
    },
    yAxis: {
      title: {
        text: 'Humidity (%)'
      }
    },
    series: [{
      name: 'Humidity',
      data: filteredData.map(data => [new Date(data.createdAt).getTime(), data.humidity]),
      tooltip: {
        valueSuffix: ' %'
      }
    }],
    time: {
      useUTC: false
    }
  };

  return (
    <div>
      <h1>Temperature and Humidity Data Charts</h1>
      <form>
        <label>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </form>
      <HighchartsReact highcharts={Highcharts} options={temperatureOptions} />
      <HighchartsReact highcharts={Highcharts} options={humidityOptions} />
    </div>
  )
}
export default TemperatureChart;
