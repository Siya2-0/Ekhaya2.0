"use client"
import jsPDF from "jspdf";
// import "jspdf-autotable";

const Print = () => {
  const handleGeneratePDF = () => {
    const transactions = [
      {
        id: '13648e52-34c1-4021-b45b-6867d8c17d0d',
        changed_at: '2024-12-30T15:36:14.52247+00:00',
        transaction_id: 65,
        transaction_data: '{"id": 65, "items": "{\\"orderItems\\":[{\\"id\\":18,\\"name\\":\\"Heineken lite\\",\\"category\\":\\"BEERS & CIDERS\\",\\"price\\":20,\\"image\\":\\"https://firebasestorage.googleapis.com/v0/b/glammedup-boutique.appspot.com/o/liquor%2Fheineken.png?alt=media&token=8e9e171f-da87-4066-971e-46e6d217c3c6\\",\\"quantity\\":4},{\\"id\\":83,\\"name\\":\\"BOLS 750ml\\",\\"category\\":\\"BRANDY\\",\\"price\\":250,\\"image\\":\\"https://knnhfplevewsnqnrexkd.supabase.co/storage/v1/object/public/Ekhaya_Bucket/image/8d272eb0-4d78-4a90-aa28-8a4f2c77826d.png\\",\\"quantity\\":4}, {\\"id\\":18,\\"name\\":\\"Heineken lite2\\",\\"category\\":\\"BEERS & CIDERS\\",\\"price\\":20,\\"image\\":\\"https://firebasestorage.googleapis.com/v0/b/glammedup-boutique.appspot.com/o/liquor%2Fheineken.png?alt=media&token=8e9e171f-da87-4066-971e-46e6d217c3c6\\",\\"quantity\\":4}, {\\"id\\":18,\\"name\\":\\"Heineken lite\\",\\"category\\":\\"BEERS & CIDERS\\",\\"price\\":20,\\"image\\":\\"https://firebasestorage.googleapis.com/v0/b/glammedup-boutique.appspot.com/o/liquor%2Fheineken.png?alt=media&token=8e9e171f-da87-4066-971e-46e6d217c3c6\\",\\"quantity\\":4},{\\"id\\":18,\\"name\\":\\"Heineken lite\\",\\"category\\":\\"BEERS & CIDERS\\",\\"price\\":20,\\"image\\":\\"https://firebasestorage.googleapis.com/v0/b/glammedup-boutique.appspot.com/o/liquor%2Fheineken.png?alt=media&token=8e9e171f-da87-4066-971e-46e6d217c3c6\\",\\"quantity\\":4}]}", "notes": "No notes", "status": "paid", "total_price": 270, "customer_name": "", "payment_method": "Credit Card", "employee_username": "njabuloboiki@gmail.com", "transaction_date_time": "2024-12-30T14:33:58.537186+00:00"}',
        employee_username: 'njabuloboiki@gmail.com',
      },
      {
        id: '13648e52-34c1-4021-b45b-6867d8c17d0d',
        changed_at: '2024-12-30T15:36:14.52247+00:00',
        transaction_id: 65,
        transaction_data: '{"id": 65, "items": "{\\"orderItems\\":[{\\"id\\":18,\\"name\\":\\"Heineken lite\\",\\"category\\":\\"BEERS & CIDERS\\",\\"price\\":20,\\"image\\":\\"https://firebasestorage.googleapis.com/v0/b/glammedup-boutique.appspot.com/o/liquor%2Fheineken.png?alt=media&token=8e9e171f-da87-4066-971e-46e6d217c3c6\\",\\"quantity\\":4},{\\"id\\":83,\\"name\\":\\"BOLS 750ml\\",\\"category\\":\\"BRANDY\\",\\"price\\":250,\\"image\\":\\"https://knnhfplevewsnqnrexkd.supabase.co/storage/v1/object/public/Ekhaya_Bucket/image/8d272eb0-4d78-4a90-aa28-8a4f2c77826d.png\\",\\"quantity\\":4}, {\\"id\\":18,\\"name\\":\\"Heineken lite\\",\\"category\\":\\"BEERS & CIDERS\\",\\"price\\":20,\\"image\\":\\"https://firebasestorage.googleapis.com/v0/b/glammedup-boutique.appspot.com/o/liquor%2Fheineken.png?alt=media&token=8e9e171f-da87-4066-971e-46e6d217c3c6\\",\\"quantity\\":4},{\\"id\\":18,\\"name\\":\\"Heineken lite\\",\\"category\\":\\"BEERS & CIDERS\\",\\"price\\":20,\\"image\\":\\"https://firebasestorage.googleapis.com/v0/b/glammedup-boutique.appspot.com/o/liquor%2Fheineken.png?alt=media&token=8e9e171f-da87-4066-971e-46e6d217c3c6\\",\\"quantity\\":4}]}", "notes": "No notes", "status": "unpaid", "total_price": 270, "customer_name": "", "payment_method": "Credit Card", "employee_username": "njabuloboiki@gmail.com", "transaction_date_time": "2024-12-30T14:33:58.537186+00:00"}',
        employee_username: 'njabuloboiki@gmail.com',
      },
      {
        id: '13648e52-34c1-4021-b45b-6867d8c17d0d',
        changed_at: '2024-12-30T15:36:14.52247+00:00',
        transaction_id: 65,
        transaction_data: '{"id": 65, "items": "{\\"orderItems\\":[{\\"id\\":18,\\"name\\":\\"Heineken lite\\",\\"category\\":\\"BEERS & CIDERS\\",\\"price\\":20,\\"image\\":\\"https://firebasestorage.googleapis.com/v0/b/glammedup-boutique.appspot.com/o/liquor%2Fheineken.png?alt=media&token=8e9e171f-da87-4066-971e-46e6d217c3c6\\",\\"quantity\\":4},{\\"id\\":83,\\"name\\":\\"BOLS 750ml\\",\\"category\\":\\"BRANDY\\",\\"price\\":250,\\"image\\":\\"https://knnhfplevewsnqnrexkd.supabase.co/storage/v1/object/public/Ekhaya_Bucket/image/8d272eb0-4d78-4a90-aa28-8a4f2c77826d.png\\",\\"quantity\\":4}]}", "notes": "No notes", "status": "unpaid", "total_price": 270, "customer_name": "", "payment_method": "Credit Card", "employee_username": "njabuloboiki@gmail.com", "transaction_date_time": "2024-12-30T14:33:58.537186+00:00"}',
        employee_username: 'njabuloboiki@gmail.com',
      },
      {
        id: '13648e52-34c1-4021-b45b-6867d8c17d0d',
        changed_at: '2024-12-30T15:36:14.52247+00:00',
        transaction_id: 65,
        transaction_data: '{"id": 65, "items": "{\\"orderItems\\":[{\\"id\\":18,\\"name\\":\\"Heineken lite\\",\\"category\\":\\"BEERS & CIDERS\\",\\"price\\":20,\\"image\\":\\"https://firebasestorage.googleapis.com/v0/b/glammedup-boutique.appspot.com/o/liquor%2Fheineken.png?alt=media&token=8e9e171f-da87-4066-971e-46e6d217c3c6\\",\\"quantity\\":1},{\\"id\\":83,\\"name\\":\\"BOLS 750ml\\",\\"category\\":\\"BRANDY\\",\\"price\\":250,\\"image\\":\\"https://knnhfplevewsnqnrexkd.supabase.co/storage/v1/object/public/Ekhaya_Bucket/image/8d272eb0-4d78-4a90-aa28-8a4f2c77826d.png\\",\\"quantity\\":4}]}", "notes": "No notes", "status": "unpaid", "total_price": 270, "customer_name": "", "payment_method": "Credit Card", "employee_username": "njabuloboiki@gmail.com", "transaction_date_time": "2024-12-30T14:33:58.537186+00:00"}',
        employee_username: 'njabuloboiki@gmail.com',
      },
      {
        id: '13648e52-34c1-4021-b45b-6867d8c17d0d',
        changed_at: '2024-12-30T15:36:14.52247+00:00',
        transaction_id: 65,
        transaction_data: '{"id": 65, "items": "{\\"orderItems\\":[{\\"id\\":18,\\"name\\":\\"Heineken lite\\",\\"category\\":\\"BEERS & CIDERS\\",\\"price\\":20,\\"image\\":\\"https://firebasestorage.googleapis.com/v0/b/glammedup-boutique.appspot.com/o/liquor%2Fheineken.png?alt=media&token=8e9e171f-da87-4066-971e-46e6d217c3c6\\",\\"quantity\\":1},{\\"id\\":83,\\"name\\":\\"BOLS 750ml\\",\\"category\\":\\"BRANDY\\",\\"price\\":250,\\"image\\":\\"https://knnhfplevewsnqnrexkd.supabase.co/storage/v1/object/public/Ekhaya_Bucket/image/8d272eb0-4d78-4a90-aa28-8a4f2c77826d.png\\",\\"quantity\\":1}]}", "notes": "No notes", "status": "unpaid", "total_price": 270, "customer_name": "", "payment_method": "Credit Card", "employee_username": "njabuloboiki@gmail.com", "transaction_date_time": "2024-12-30T14:33:58.537186+00:00"}',
        employee_username: 'njabuloboiki@gmail.com',
      },
      // Add more transactions as needed
    ];

    generatePDF(transactions);
  };

  return (
    <div>
        <main className="relative flex min-h-screen flex-col bg-[#F2F2F2] pt-12">
        <p className="text-[#303030] font-bold text-[32px] ml-8">Employee Management</p>
         
        <button className="mt-2 p-2 bg-blue-500 text-white rounded"   onClick={handleGeneratePDF}>
        Upload
        </button>
        </main>
    </div>
  )
}

export default Print

// function generatePDF(transactions: any) {
//   const doc = new jsPDF();

//   // Set the title
//   doc.setFontSize(18);
//   doc.text('Transaction History', 14, 22);

//   // Set the table headers vertically
//   doc.setFontSize(12);
//   const headers = [ 'Date', 'Employee', 'Total Price', 'Status', 'Payment Method'];
//   let headerY = 32;
//   headers.forEach((header) => {
//     doc.text(header, 14, headerY);
//     headerY += 10;
//   });

//   let x = 50; // Initial x position for the first column of data

//   transactions.forEach((transaction: any) => {
//     let transactionData;
//     try {
//       transactionData = JSON.parse(transaction.transaction_data);
//     } catch (error) {
//       console.error('Error parsing transaction_data:', error);
//       return;
//     }

//     let y = 32; // Reset y position for each transaction

    
    
//     doc.text(new Date(transaction.changed_at).toLocaleString(), x, y);
//     y += 10;
//     doc.text(transaction.employee_username, x, y);
//     y += 10;
//     doc.text(transactionData.total_price.toString(), x, y);
//     y += 10;
//     doc.text(transactionData.status, x, y);
//     y += 10;
//     doc.text(transactionData.payment_method, x, y);

//     y += 10; // Move to the next row

//     // Add order items if they exist
//     if (transactionData.items) {
//       try {
//         transactionData.items = JSON.parse(transactionData.items);
//       } catch (error) {
//         console.error('Error parsing items:', error);
//         return;
//       }
//     }

//     // Add order items if they exist
//     if (transactionData.items && transactionData.items.orderItems) {
//       transactionData.items.orderItems.forEach((item: any) => {
//         doc.text(`- ${item.name}`, x, y);
//         y += 10;
//         doc.text(`Price: ${item.price}`, x, y);
//         y += 10;
//         doc.text(`Quantity: ${item.quantity}`, x, y);
//         y += 10; // Move to the next row for each item
//       });
//     }
//     x += 60; // Move to the next column for the next transaction
//   });

//   const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

//   // Save the PDF with timestamp in the filename
//   doc.save(`transaction_history_${timestamp}.pdf`);
// };

// function generatePDF(transactions: any) {
//   const doc = new jsPDF();

// // Set the title
// doc.setFontSize(18);
// doc.setTextColor(40);
// doc.text('Transaction History', 14, 22);

// // Define the table headers
// const headers = ['ID','Date', 'Employee', 'Total Price', 'Status', 'Payment Method'];

// // Define the initial positions
// let startX = 14;
// let startY = 30;
// let lineHeight = 10;

// // Draw table headers
// doc.setFontSize(12);
// doc.setFillColor(0, 57, 107);
// doc.setTextColor(255, 255, 255);
// headers.forEach((header, index) => {
//   doc.rect(startX + index * 45, startY, 40, lineHeight, 'F');
//   doc.text(header, startX + index * 30 + 2, startY + 7);
// });

// // Draw table rows
// doc.setFontSize(10);
// doc.setTextColor(0, 0, 0);
// transactions.forEach((transaction: any, rowIndex:number) => {
//   let transactionData;
//   try {
//     transactionData = JSON.parse(transaction.transaction_data);
//   } catch (error) {
//     console.error('Error parsing transaction_data:', error);
//     return;
//   }

//   // Parse items if they exist and are a string
//  /* if (transactionData.items) {
//     try {
//       transactionData.items = JSON.parse(transactionData.items);
//     } catch (error) {
//       console.error('Error parsing items:', error);
//       return;
//     }
//   }

//   const rowY = startY + (rowIndex + 1) * lineHeight;
//   const row = [
//     transaction.id,
//     new Date(transaction.changed_at).toLocaleString(),
//     transaction.employee_username,
//     transactionData.total_price.toString(),
//     transactionData.status,
//     transactionData.payment_method,
//   ];

//   row.forEach((cell, cellIndex) => {
//     doc.rect(startX + cellIndex * 30, rowY, 30, lineHeight);
//     doc.text(String(cell), startX + cellIndex * 30 + 2, rowY + 7);
//   });

//   // Add order items if they exist
//   if (transactionData.items && transactionData.items.orderItems) {
//     transactionData.items.orderItems.forEach((item: any, itemIndex:number) => {
//       const itemY = rowY + (itemIndex + 1) * lineHeight;
//       doc.text(`- ${item.name}`, startX + 2, itemY + 7);
//       doc.text(`Price: ${item.price}`, startX + 32, itemY + 7);
//       doc.text(`Quantity: ${item.quantity}`, startX + 62, itemY + 7);
//     });
//   }*/
// });

//   const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

//   // Save the PDF with timestamp in the filename
//   doc.save(`transaction_history_${timestamp}.pdf`);
// }


function generatePDF(transactions: any) {
  const doc = new jsPDF();

  // Set the title
  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text('Transaction History', 14, 22);

  // Define the table headers
  const headers = ['Date', 'Employee', 'Total Price', 'Status', 'Payment Method'];

  // Define the initial positions
  let startX = 4;
  let startY = 30;
  const lineHeight = 10;

  // Draw table headers
  doc.setFontSize(12);
  doc.setFillColor(0, 57, 107);
  doc.setTextColor(255, 255, 255);
  headers.forEach((header, index) => {
    doc.setFillColor(0, 57, 107);
    doc.rect(startX + index * 39, startY, 39, lineHeight, 'F');
    doc.text(header, startX + index * 39 + 5, startY + 7);
  });

  // Draw table rows
  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0);

  transactions.forEach((transaction: any, rowIndex: number) => {
    let transactionData;
    try {
      transactionData = JSON.parse(transaction.transaction_data);
    } catch (error) {
      console.error('Error parsing transaction_data:', error);
      return;
    }

    const rowY = startY + (rowIndex + 1) * lineHeight;
    
    const row = [
      new Date(transaction.changed_at).toLocaleString(),
      transaction.employee_username || 'N/A',
      transactionData?.total_price?.toFixed(2) || '0.00',
      transactionData?.status || 'Unknown',
      transactionData?.payment_method || 'Unknown',
    ];

    row.forEach((cell, cellIndex) => {
      doc.rect(startX + cellIndex * 39, rowY, 39, lineHeight);
      doc.text(String(cell), startX + cellIndex * 39 + 5, rowY + 7);
    });

    
    transactionData.items = JSON.parse(transactionData.items);
    if (transactionData.items?.orderItems?.length) {
      transactionData.items.orderItems.forEach((item: any, itemIndex: number) => {
        const itemY = rowY + (itemIndex + 1) * lineHeight;
        const itemDetails = `- ${item.name} | Price: ${item.price.toFixed(2)} | Qty: ${item.quantity}`;
        doc.text(itemDetails, startX + 5, itemY + 7);
      });

      startY=startY + (transactionData.items?.orderItems?.length + 1) * lineHeight; 
    }
  });

  // Generate timestamp for the filename
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  // Save the PDF with a timestamp in the filename
  doc.save(`transaction_history_${timestamp}.pdf`);
}