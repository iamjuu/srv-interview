import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const YourComponent = () => {
    // State to store the fetched subscriptions
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const subscribedproduct = async () => {
        try {
            const token = localStorage.getItem('authToken');       
            const response = await Axios.get('/updatedproduct', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });  
            setSubscriptions(response.data.subscriptions); 
        } catch (error) {
            setError('Error fetching subscriptions');
            console.error(error);
        } finally {
            setLoading(false); 
        }
    };
    

        subscribedproduct(); // Call the function

    }, []); // Empty dependency array to run the effect only once when the component mounts

    // Render loading, error, or subscriptions
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h3>User Subscriptions</h3>
            <ul>
                {subscriptions?.map((sub, index) => (
                    <li key={index}>
                        <p>Product: {sub.productId.name}</p>
                        <p>Status: {sub.status ? 'Subscribed' : 'Not Subscribed'}</p>
                    </li>
                ))}:null
            </ul>
        </div>
    );
};

export default YourComponent;
