import { createContext, useContext, useEffect, useState } from "react";
import defaultOrders from "../data/orders";
import defaultTrucks from "../data/trucks";

const AppContext = createContext();

export function AppProvider({ children }) {
const [orders, setOrders] = useState(() => {
const saved = localStorage.getItem("orders");
return saved ? JSON.parse(saved) : defaultOrders;
});

const [trucks, setTrucks] = useState(defaultTrucks);

useEffect(() => {
localStorage.setItem("orders", JSON.stringify(orders));
}, [orders]);

const value = {
orders,
setOrders,
trucks,
setTrucks,
};

return (
<AppContext.Provider value={value}>
{children}
</AppContext.Provider>
);
}

export function useApp() {
return useContext(AppContext);
}