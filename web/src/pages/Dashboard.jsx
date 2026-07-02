function Card({ title, value, color }) {
return (
<div className="bg-white p-5 rounded-xl shadow">
<div className="text-gray-500 text-sm">{title}</div>
<div className={`text-2xl font-bold ${color}`}>
{value}
</div>
</div>
);
}

export default function Dashboard({ orders }) {
const total = orders.length;
const pending = orders.filter(o => o.status === "Pending").length;
const transit = orders.filter(o => o.status === "In transit").length;
const delivered = orders.filter(o => o.status === "Delivered").length;

// “виртуальная выручка”
const revenue = delivered * 1200;

return (
<div>
<h1 className="text-2xl font-bold mb-4">
Dashboard 📊
</h1>

<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<Card title="Total Orders" value={total} />
<Card title="Pending" value={pending} color="text-yellow-500" />
<Card title="In Transit" value={transit} color="text-blue-500" />
<Card title="Delivered" value={delivered} color="text-green-500" />
</div>

<div className="mt-6 bg-black text-white p-6 rounded-xl">
<div className="text-gray-300 text-sm">
Estimated Revenue
</div>
<div className="text-3xl font-bold">
€ {revenue}
</div>
</div>
</div>
);
}