import { useState } from "react";

export default function Fleet() {
const [trucks, setTrucks] = useState([
{ id: 1, name: "Truck #1", capacity: 10, load: 3 },
{ id: 2, name: "Truck #2", capacity: 8, load: 8 },
{ id: 3, name: "Truck #3", capacity: 12, load: 5 },
]);

function addTruck() {
const newTruck = {
id: Date.now(),
name: `Truck #${trucks.length + 1}`,
capacity: 10,
load: 0,
};

setTrucks([newTruck, ...trucks]);
}

function loadColor(load, capacity) {
const percent = (load / capacity) * 100;

if (percent >= 100) return "text-red-500";
if (percent >= 70) return "text-yellow-500";
return "text-green-500";
}

return (
<div>
<h1 className="text-2xl font-bold mb-4">Fleet 🚛</h1>

<button
onClick={addTruck}
className="mb-4 bg-black text-white px-4 py-2 rounded"
>
Add Truck
</button>

<div className="grid gap-3">
{trucks.map((t) => (
<div
key={t.id}
className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
>
<div>
<div className="font-bold">{t.name}</div>
<div className={`text-sm ${loadColor(t.load, t.capacity)}`}>
Load: {t.load} / {t.capacity}
</div>
</div>

<div className="text-sm text-gray-500">
{((t.load / t.capacity) * 100).toFixed(0)}%
</div>
</div>
))}
</div>
</div>
);
}