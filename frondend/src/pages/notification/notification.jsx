import React, { useEffect, useState } from 'react';
import Axios from '../../Instance/Instance';
import { ArrowLeft } from 'lucide-react';
import {useNavigate} from 'react-router-dom'
 // Import the arrow icon you need
const YourComponent = () => {
  const navigate = useNavigate()
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem('userToken'); // Make sure the token is being retrieved
                console.log('Token:', token);

                const response = await Axios.get('/notification', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Response Data:', response.data.data.notification);

                // Set notifications state if the notification array exists
                setNotifications(response.data.data.notification)
               console.log(response.data.notification,Array.isArray(response.data.data.notification));
               

                setError(null);
            } catch (error) {
                setError(error.response?.data?.message || 'Error fetching notifications');
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []); // Empty array ensures it runs only once when the component mounts

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
const backbtn =()=>{
  navigate(-1)
}
    return (
        <div className="p-4">
          <ArrowLeft onClick={backbtn} />
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>
            <div className="space-y-4">
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <div key={notification._id} className="border p-4 rounded">
                            <h2 className="font-semibold">{notification.message}</h2>
                            <p>Product: {notification.product}</p>
                            <p>Created At: {new Date(notification.createdAt).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No notifications available</p>
                )}
            </div>
        </div>
    );
};

export default YourComponent;
