import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './OrderManagement.css';
import config from '../config';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  const stored = localStorage.getItem('farmartUser');
  if (!stored) {
    toast.error('Not authenticated');
    return;
  }

  const { token } = JSON.parse(stored);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${config.API_BASE_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || 'Failed to fetch orders');
        } else {
          setOrders(data);
        }
      } catch (err) {
        toast.error('Network error while fetching orders');
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newAction) => {
    const stored = localStorage.getItem('farmartUser');
    if (!stored) return toast.error('Not authenticated');
    const { token } = JSON.parse(stored);

    try {
      const res = await fetch(`${config.API_BASE_URL}/orders/${orderId}/action`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action: newAction }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to update status');
      } else {
        toast.success(`Order ${orderId} marked as ${data.order.status}`);
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: data.order.status } : order
          )
        );
      }
    } catch (err) {
      toast.error('Network error while updating order');
    }
  };

  return (
    <div className="order-management-container">
      <h2 className="order-title">Order Management</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Buyer</th>
            <th>Animals</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.buyer?.name || 'Unknown Buyer'}</td>
              <td>
                {order.order_items.map((item) => (
                  <div key={item.id}>
                    {item.animal?.type || 'Animal'} ×{item.quantity}
                  </div>
                ))}
              </td>
              <td>${order.total_price}</td>
              <td>{order.status}</td>
              <td>
                {order.status === 'pending' && (
                  <div className="action-buttons">
                    <button
                      className="btn confirm"
                      onClick={() => handleUpdateStatus(order.id, 'confirm')}
                    >
                      Confirm
                    </button>
                    <button
                      className="btn reject"
                      onClick={() => handleUpdateStatus(order.id, 'reject')}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;







