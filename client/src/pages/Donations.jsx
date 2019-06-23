import React, { useState, useEffect } from 'react';
import MapContainer from '../components/MapContainer'

function DonationPage () {
  const [apiKey, setApiKey] = useState(null)
  
  useEffect(() => {
    fetch('/api/getApiKey')
    .then(res => {
      console.log(res) 
      return res.json()
    })
    .then(data => { 
      console.log(data.apiKey)
      setApiKey(data.apiKey)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

return <div>{ apiKey && <MapContainer apiKey={apiKey} /> } </div>
}

export default DonationPage