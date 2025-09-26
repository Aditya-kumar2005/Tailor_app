import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "./firebase-config";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

// --- MAIN REACT COMPONENT ---
function App() {
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newCustomerMeasurements, setNewCustomerMeasurements] = useState('');
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');

  // --- Firebase Initialization and Authentication ---
  useEffect(() => {
    try {
      // --- PASTE YOUR FIREBASE CONFIG HERE ---
      // const firebaseConfig = {
      //   apiKey: "YOUR_API_KEY",
      //   authDomain: "YOUR_PROJECT.firebaseapp.com",
      //   projectId: "YOUR_PROJECT_ID",
      //   storageBucket: "YOUR_PROJECT.appspot.com",
      //   messagingSenderId: "YOUR_SENDER_ID",
      //   appId: "YOUR_APP_ID"
      // };
      // -----------------------------------------

      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      const database = getFirestore(app);
      const authService = getAuth(app);
      const appId = firebaseConfig.appId; // Use your app ID

      setDb(database);
      setAuth(authService);
      setFeedback('Firebase initialized. Authenticating...');

      const unsubscribe = onAuthStateChanged(authService, async (user) => {
        if (user) {
          setUserId(user.uid);
          setFeedback(`Authenticated as user: ${user.uid}. Loading data...`);
        } else {
          await signInAnonymously(authService);
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.error('Firebase initialization error:', error);
      setFeedback(`Error: ${error.message}`);
      setLoading(false);
    }
  }, []);

  // --- Firestore Data Listener (Real-time Updates) ---
  useEffect(() => {
    if (db && userId) {
      setFeedback('Fetching customer data...');
      try {
        const customerCollectionRef = collection(db, `users/${userId}/customers`);
        const q = query(customerCollectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const customersArray = [];
          snapshot.forEach((doc) => {
            customersArray.push({ id: doc.id, ...doc.data() });
          });
          setCustomers(customersArray);
          setLoading(false);
          setFeedback('Data loaded successfully.');
        }, (error) => {
          console.error("Error listening to Firestore:", error);
          setFeedback(`Error loading data: ${error.message}`);
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error setting up snapshot listener:", error);
        setFeedback(`Error loading data: ${error.message}`);
        setLoading(false);
      }
    } else {
      setLoading(true);
    }
  }, [db, userId]);

  // --- Add a new customer to Firestore ---
  const handleAddCustomer = async (e) => {
    e.preventDefault();
    if (!newCustomerName || !newCustomerPhone) {
      setFeedback('Please fill in both name and phone number.');
      return;
    }
    setFeedback('Adding new customer...');
    try {
      const customerCollectionRef = collection(db, `users/${userId}/customers`);
      await addDoc(customerCollectionRef, {
        name: newCustomerName,
        phone: newCustomerPhone,
        measurements: newCustomerMeasurements,
        createdAt: serverTimestamp(),
      });
      setNewCustomerName('');
      setNewCustomerPhone('');
      setNewCustomerMeasurements('');
      setFeedback('Customer added successfully!');
    } catch (error) {
      console.error('Error adding document:', error);
      setFeedback(`Failed to add customer: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Tailor Manager</h1>
          <p className="text-gray-500">Your personal customer and order tracker.</p>
          {userId && (
            <div className="mt-4 text-sm text-gray-600">
              <span className="font-semibold">User ID:</span> {userId}
            </div>
          )}
        </header>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add a New Customer</h2>
          <form onSubmit={handleAddCustomer} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Customer Name"
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={newCustomerPhone}
                onChange={(e) => setNewCustomerPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <textarea
              placeholder="Measurements or Order Details"
              value={newCustomerMeasurements}
              onChange={(e) => setNewCustomerMeasurements(e.target.value)}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Customer
            </button>
          </form>
          <div className="mt-4 text-sm text-center text-gray-500">{feedback}</div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Customer List</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading customers...</p>
          ) : customers.length === 0 ? (
            <p className="text-center text-gray-500">No customers found. Add one above!</p>
          ) : (
            <ul className="space-y-4">
              {customers.map((customer) => (
                <li key={customer.id} className="bg-gray-50 p-6 rounded-xl shadow-inner">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-medium text-gray-900">{customer.name}</span>
                    <span className="text-sm text-gray-500">{customer.phone}</span>
                  </div>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{customer.measurements}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;