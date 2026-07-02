function MenuItem({ title, onClick }) {
return (
<div
onClick={onClick}
style={{
padding: "10px 0",
cursor: "pointer",
opacity: 0.8,
}}
>
{title}
</div>
);
}

export default function Sidebar({ setPage }) {
return (
<div
style={{
width: 220,
background: "#111",
color: "#fff",
padding: 20,
}}
>
<h2>CargoOS 🚛</h2>

<MenuItem title="Dashboard" onClick={() => setPage("dashboard")} />
<MenuItem title="Orders" onClick={() => setPage("orders")} />
<MenuItem title="Fleet" onClick={() => setPage("fleet")} />
<MenuItem title="Finance" onClick={() => setPage("finance")} />
</div>
);
}