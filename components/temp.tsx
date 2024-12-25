// interface OrderItem {
//     id: number;
//     name: string;
//     category: string;
//     price: number;
//     image: string;
//     quantity: number;
//   }

//   const newOrder = {
//     id: Date.now(),
//     items: currentOrders,
//     total: currentOrders.reduce((acc: any, item: any) => acc + item.total, 0),
//     status: paymentMethod === "card" ? "paid" : "unpaid",
//     timestamp: new Date().toISOString()
//   };