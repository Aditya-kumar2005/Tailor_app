
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { fetchPayments } from '../../slices/paymentSlice';
import type { Payment } from '../../types';
import Table from '../../components/Table';
import type { Column } from '../../components/Table';
import Modal from '../../components/Modal';
import PaymentForm from './PaymentForm';
import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline';

const PaymentList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { payments, loading, error } = useSelector((state: RootState) => state.payments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const handleSave = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
    dispatch(fetchPayments());
  };

  const openModal = (payment: Payment | null = null) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const columns: Column<Payment>[] = [
    { header: 'Order ID', accessor: 'orderId' },
    { header: 'Amount', accessor: 'amount',
       render: (payment) => {
          const amount = Number(payment.amount) || 0;
          return `$${amount.toFixed(2)}`;
        }},
    { header: 'Status', accessor: 'status' },
    { header: 'Method', accessor: 'method' },
    { header: 'Date', accessor: 'date' },
    {
      header: 'Actions',
      accessor: 'id',
      render: (payment) => (
        <button onClick={() => openModal(payment)} className="p-2 text-gray-500 hover:text-green-600 focus:outline-none">
            <PencilIcon className="h-5 w-5" />
        </button>
      ),
    },
  ];

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
                <p className="mt-1 text-sm text-gray-600">Manage payments.</p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4">
                <button
                    onClick={() => openModal()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                    Add Payment
                </button>
            </div>
        </div>

      <div className="mt-8">
        <Table
            title="Payments"
            columns={columns}
            data={payments ??[]}
        />
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedPayment ? 'Edit Payment' : 'Add Payment'}>
        <PaymentForm payment={selectedPayment} onSave={handleSave} />
      </Modal>
    </div>
  );
};

export default PaymentList;
