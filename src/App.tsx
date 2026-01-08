import { useEffect, useState } from "react";
import "./App.css";

type Work = {
  id: number;
  customerName: string;
  phone: string;
  workType: string;
  measurements: string;
  deliveryDate: string;
  status: "Pending" | "Completed";
  createdAt: string;
};

function App() {
  const [works, setWorks] = useState<Work[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [workType, setWorkType] = useState("");
  const [measurements, setMeasurements] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  /* ---------- LOAD & SAVE ---------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tailorWorks") || "[]");
    setWorks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tailorWorks", JSON.stringify(works));
  }, [works]);

  /* ---------- DASHBOARD ---------- */
  const today = new Date().toISOString().split("T")[0];
  const todayCount = works.filter(w => w.deliveryDate === today).length;
  const pendingCount = works.filter(w => w.status === "Pending").length;
  const completedCount = works.filter(w => w.status === "Completed").length;

  /* ---------- ADD / UPDATE ---------- */
  const saveWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !workType) return;

    if (editId) {
      setWorks(works.map(w =>
        w.id === editId
          ? { ...w, customerName, phone, workType, measurements, deliveryDate }
          : w
      ));
      setEditId(null);
    } else {
      const newWork: Work = {
        id: Date.now(),
        customerName,
        phone,
        workType,
        measurements,
        deliveryDate,
        status: "Pending",
        createdAt: new Date().toLocaleDateString(),
      };

      setWorks([newWork, ...works]);

      // BACKEND AUTO SAVE
      fetch("http://localhost:5000/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWork),
      });
    }

    setCustomerName("");
    setPhone("");
    setWorkType("");
    setMeasurements("");
    setDeliveryDate("");
  };

  /* ---------- ACTIONS ---------- */
  const toggleStatus = (id: number) => {
    setWorks(works.map(w =>
      w.id === id
        ? { ...w, status: w.status === "Pending" ? "Completed" : "Pending" }
        : w
    ));
  };

  const deleteWork = (id: number) => {
    if (confirm("Delete this work?")) {
      setWorks(works.filter(w => w.id !== id));
    }
  };

  const editWork = (w: Work) => {
    setEditId(w.id);
    setCustomerName(w.customerName);
    setPhone(w.phone);
    setWorkType(w.workType);
    setMeasurements(w.measurements);
    setDeliveryDate(w.deliveryDate);
  };

  /* ---------- DOWNLOAD TXT ---------- */
  const downloadTXT = () => {
    let text = "TAILOR WORK RECORD\n\n";
    works.forEach((w, i) => {
      text += `
${i + 1}. ${w.customerName}
Phone: ${w.phone}
Work: ${w.workType}
Status: ${w.status}
Delivery: ${w.deliveryDate}
Notes: ${w.measurements}
-----------------------------
`;
    });

    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "tailor-work.txt";
    a.click();
  };

  const filteredWorks = works.filter(w =>
    w.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>👔 Tailor Work Manager</h1>
        <input
        placeholder="Search customer..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {/* DASHBOARD */}
      <div className="dashboard">
        <div className="dash-card">📅 Today<br /><b>{todayCount}</b></div>
        <div className="dash-card">⏳ Pending<br /><b>{pendingCount}</b></div>
        <div className="dash-card">✅ Completed<br /><b>{completedCount}</b></div>
      </div>

      {/* FORM */}
      <form onSubmit={saveWork}>
        <input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Customer Name" />
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
        <input value={workType} onChange={e => setWorkType(e.target.value)} placeholder="Work Type" />
        <textarea className="text-area" value={measurements} onChange={e => setMeasurements(e.target.value)} placeholder="Measurements / Notes" />
        <input type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} />
        <button>{editId ? "Update Work" : "Add Work"}</button>
      </form>

      <button onClick={downloadTXT} className="secondary">⬇ Download TXT</button>
      <button onClick={() => window.print()} className="secondary">🖨 Print</button>

      {/* LIST */}
      {filteredWorks.map(w => (
        <div className="work-card" key={w.id}>
          <h3>{w.customerName} – {w.workType}</h3>
          <p>📞 {w.phone}</p>
          <p>📅 {w.deliveryDate}</p>
          <p>Status: <b>{w.status}</b></p>
          <div className="actions">
            <button onClick={() => toggleStatus(w.id)}>Toggle</button>
            <button onClick={() => editWork(w)}>Edit</button>
            <button onClick={() => deleteWork(w.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
