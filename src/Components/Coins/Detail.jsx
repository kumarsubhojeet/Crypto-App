import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Detail() {
    const [crypto, setCrypto] = useState([]);

    const APICALL = async () => {
        try {
          const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${}`
          );
    
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        APICALL();
      }, []);

  return (
    <div>Detail</div>
  )
}
