import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { fetchOrders } from '../../slices/orderSlice';
import type { Order } from '../../types';

// --- Components ---
import Table from '../../components/Table';
import type { Column } from '../../components/Table';
import Modal from '../../components/Modal';
import OrderForm from './OrderForm';
import { PlusIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/outline';

const OrderList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { list: orders, loading, error } = useSelector((state: RootState) => state.orders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // --- Data Fetching ---
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // --- Event Handlers ---
  const handleAddOrder = () => {
    setSelectedOrder(null);
    setIsModalOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleViewDetails = (order: Order) => {
    // In a real app, you would navigate to an order details page
    console.log('Viewing details for:', order);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // --- Table Configuration ---
  const columns: Column<Order>[] = [
    { header: 'Customer', accessor: 'customerName' }, 
    { header: 'Date', accessor: 'orderDate', render: (order: Order) => new Date(order.orderDate).toLocaleDateString() },
    { header: 'Total', accessor: 'totalAmount',
       render: (order: Order) => {
        const total = Number(order.totalAmount) || 0;
        return `$${total.toFixed(2)}`;
        }},
    { header: 'Status', accessor: 'status' },
    {
      header: 'Actions',
      accessor: 'id', // Use a unique key, like 'id'
      render: (order: Order) => (
        <div className="flex items-center space-x-2">
          <button onClick={() => handleViewDetails(order)} className="p-2 text-gray-500 hover:text-blue-600 focus:outline-none">
            <EyeIcon className="h-5 w-5" />
          </button>
          <button onClick={() => handleEditOrder(order)} className="p-2 text-gray-500 hover:text-green-600 focus:outline-none">
            <PencilIcon className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];

  // --- Render Logic ---
  if (loading) {
    return <div className="p-6">Loading orders...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="mt-1 text-sm text-gray-600">View, add, and edit orders.</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-4">
          <button
            onClick={handleAddOrder}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Create New Order
          </button>
        </div>
      </div>

      <div className="mt-8">
        <Table
          title="Orders"
          columns={columns}
          data={orders}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedOrder ? 'Edit Order' : 'Create New Order'}>
        <OrderForm order={selectedOrder} onSave={closeModal} />
      </Modal>
    </div>
  );
};

export default OrderList;
