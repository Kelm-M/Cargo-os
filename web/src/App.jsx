import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Fleet from "./pages/Fleet";

export default function App() {
const [page, setPage] = useState("dashboard");

// 📦 ORDERS
const [orders, setOrders] = useState(() => {
const saved = localStorage.getItem("orders");
return saved
? JSON.parse(saved)
: [
{ id: 1, from: "Paris", to: "Lyon", status: "Pending", assignedTo: null },
{ id: 2, from: "Marseille", to: "Nice", status: "Delivered", assignedTo: null },
];
});

// 🚛 TRUCKS
const [trucks, setTrucks] = useState([
{ id: 1, name: "Truck #1", capacity: 10, load: 0 },
{ id: 2, name: "Truck #2", capacity: 8, load: 0 },
]);

const [from, setFrom] = useState("");
const [to, setTo] = useState("");

// 💾 save orders
useEffect(() => {
localStorage.setItem("orders", JSON.stringify(orders));
}, [orders]);

// ➕ add order
function addOrder() {
if (!from || !to) return;

const newOrder = {
id: Date.now(),
from,
to,
status: "Pending",
assignedTo: null,
};

setOrders([newOrder, ...orders]);
setFrom("");
setTo("");
}

// 🔁 change status
function changeStatus(id) {
const updated = orders.map((o) => {
if (o.id !== id) return o;

let newStatus = "Pending";

if (o.status === "Pending") newStatus = "In transit";
else if (o.status === "In transit") newStatus = "Delivered";
else newStatus = "Pending";

return { ...o, status: newStatus };
});

setOrders(updated);
}

// ❌ delete order
function deleteOrder(id) {
setOrders(orders.filter((o) => o.id !== id));
}

// 🚛 assign order to truck
function assignOrder(orderId, truckId) {
const updatedOrders = orders.map((o) => {
if (o.id !== orderId) return o;
return { ...o, assignedTo: truckId };
});

const updatedTrucks = trucks.map((t) => {
if (t.id !== truckId) return t;
return { ...t, load: t.load + 1 };
});

setOrders(updatedOrders);
setTrucks(updatedTrucks);
}

return (
<div className="flex h-screen bg-gray-100 font-sans">
<Sidebar setPage={setPage} />

<div className="flex-1 p-6 overflow-auto">
{page === "dashboard" && <Dashboard orders={orders} />}

{page === "orders" && (
<Orders
orders={orders}
from={from}
to={to}
setFrom={setFrom}
setTo={setTo}
addOrder={addOrder}
changeStatus={changeStatus}
deleteOrder={deleteOrder}
/>
)}

{page === "fleet" && (
<Fleet
trucks={trucks}
orders={orders}
assignOrder={assignOrder}
/>
)}

{page === "finance" && (
<h1 className="text-2xl font-bold">Finance 💰</h1>
)}
</div>
</div>
);
}

/* ---------------- ORDERS ---------------- */

function Orders({
orders,
from,
to,
setFrom,
setTo,
addOrder,
changeStatus,
deleteOrder,
}) {
const [filter, setFilter] = useState("ALL");

const filtered = orders.filter((o) => {
if (filter === "ALL") return true;
return o.status === filter;
});

return (
<div>
<h1 className="text-2xl font-bold mb-4">Orders 📦</h1>

{/* FILTERS */}
<div className="flex gap-2 mb-4">
{["ALL", "Pending", "In transit", "Delivered"].map((f) => (
<button
key={f}
onClick={() => setFilter(f)}
className={`px-3 py-1 rounded ${
filter === f ? "bg-black text-white" : "bg-white border"
}`}
>
{f}
</button>
))}
</div>

{/* FORM */}
<div className="flex gap-2 mb-4">
<input
className="p-2 border rounded"
placeholder="From"
value={from}
onChange={(e) => setFrom(e.target.value)}
/>

<input
className="p-2 border rounded"
placeholder="To"
value={to}
onChange={(e) => setTo(e.target.value)}
/>

<button
onClick={addOrder}
className="bg-black text-white px-4 py-2 rounded"
>
Add
</button>
</div>

{/* LIST */}
{filtered.map((o) => (
<div
key={o.id}
className="bg-white p-4 mt-3 rounded-xl shadow flex justify-between items-center"
>
<div>
<b>{o.from}</b> → <b>{o.to}</b>
<p className="text-gray-500">
Status: {o.status}
</p>

{o.assignedTo && (
<p className="text-sm text-blue-500">
Assigned to truck #{o.assignedTo}
</p>
)}
</div>

<div className="flex gap-2">
<button
onClick={() => changeStatus(o.id)}
className="px-3 py-1 bg-blue-500 text-white rounded"
>
Next
</button>

<button
onClick={() => deleteOrder(o.id)}
className="px-3 py-1 bg-red-500 text-white rounded"
>
Delete
</button>
</div>
</div>
))}
</div>
);
}
