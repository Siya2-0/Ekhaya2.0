 //"use client"
//import { addTransaction, count_transactions_by_date, FetchDailyTotals, fetchLowStock, FetchTotalPaid, FetchTotalUnPaid, fetchTransaction, fetchTransactionHistory, UpdateInventory } from "../restapi";
//import { deleteUser, fetchUsers, UpdaterUser } from "../restapi copy";
// import { AuthProvider, useAuth } from '../../AuthContext';
// import InactivityPopup from "@/components/InactivityPopup";
import jsPDF from "jspdf";


export default  async function FormPage() {
  // const [users, setUsers] = useState([]);

 // const response = await fetchLowStock(false);
 // console.log(response);
  //const response1 = await fetchLowStock(true);
  //console.log(response1);
  // const response2 = await fetchTransactionHistory(65);
  // console.log(response2);


  const transactions = [
    {
      id: '13648e52-34c1-4021-b45b-6867d8c17d0d',
      changed_at: '2024-12-30T15:36:14.52247+00:00',
      transaction_id: 65,
      transaction_data: '{"id": 65, "items": "{\\"orderItems\\":[{\\"id\\":18,\\"name\\":\\"Heineken lite\\",\\"category\\":\\"BEERS & CIDERS\\",\\"price\\":20,\\"image\\":\\"https://firebasestorage.googleapis.com/v0/b/glammedup-boutique.appspot.com/o/liquor%2Fheineken.png?alt=media&token=8e9e171f-da87-4066-971e-46e6d217c3c6\\",\\"quantity\\":1},{\\"id\\":83,\\"name\\":\\"BOLS 750ml\\",\\"category\\":\\"BRANDY\\",\\"price\\":250,\\"image\\":\\"https://knnhfplevewsnqnrexkd.supabase.co/storage/v1/object/public/Ekhaya_Bucket/image/8d272eb0-4d78-4a90-aa28-8a4f2c77826d.png\\",\\"quantity\\":1}]}", "notes": "No notes", "status": "paid", "total_price": 270, "customer_name": "", "payment_method": "Credit Card", "employee_username": "njabuloboiki@gmail.com", "transaction_date_time": "2024-12-30T14:33:58.537186+00:00"}',
      employee_username: 'njabuloboiki@gmail.com',
    },
    // Add more transactions as needed
  ];

  
  generatePDF(transactions);

  // useEffect(() => {
  //   fetchUsers()
  //     .then(data => setUsers(data))
  //     .catch(error => console.error('Error fetching users:', error));
  // }, []);

  return (
    <main className="relative flex min-h-screen flex-col bg-[#F2F2F2] pt-12">
      <p className="text-[#303030] font-bold text-[32px] ml-8">Home Page</p>
      <input
        type="file"
        accept="image/*"
        className="w-full p-2 border rounded"
      />
      <button className="mt-2 p-2 bg-blue-500 text-white rounded"  >
        Upload
      </button>
     {/* <InactivityPopup/> */}
 
    </main>
  );
}


export function generatePDF(transactions: any) {
  const doc = new jsPDF();

  // Set the title
  doc.setFontSize(18);
  doc.text('Transaction History', 14, 22);

  // Set the table headers vertically
  doc.setFontSize(12);
  const headers = ['ID', 'Date', 'Employee', 'Total Price', 'Status', 'Payment Method'];
  let headerY = 32;
  headers.forEach((header) => {
    doc.text(header, 14, headerY);
    headerY += 10;
  });

  let x = 50; // Initial x position for the first column of data

  transactions.forEach((transaction: any) => {
    let transactionData;
    try {
      transactionData = JSON.parse(transaction.transaction_data);
    } catch (error) {
      console.error('Error parsing transaction_data:', error);
      return;
    }

    let y = 32; // Reset y position for each transaction

    doc.text(transaction.id, x, y);
    y += 10;
    doc.text(new Date(transaction.changed_at).toLocaleString(), x, y);
    y += 10;
    doc.text(transaction.employee_username, x, y);
    y += 10;
    doc.text(transactionData.total_price.toString(), x, y);
    y += 10;
    doc.text(transactionData.status, x, y);
    y += 10;
    doc.text(transactionData.payment_method, x, y);

    y += 10; // Move to the next row

    // Add order items if they exist
    if (transactionData.items && transactionData.items.orderItems) {
      transactionData.items.orderItems.forEach((item: any) => {
        doc.text(`- ${item.name}`, x, y);
        y += 10;
        doc.text(`Price: ${item.price}`, x, y);
        y += 10;
        doc.text(`Quantity: ${item.quantity}`, x, y);
        y += 10; // Move to the next row for each item
      });
    }

    x += 60; // Move to the next column for the next transaction
  });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  // Save the PDF with timestamp in the filename
  doc.save(`transaction_history_${timestamp}.pdf`);
};