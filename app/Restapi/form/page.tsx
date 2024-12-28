

import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { addTransaction, deleteTransaction, fetchTransactionHistory, modifyTransaction, UpdateInventory } from '../restapi';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function NewPage() {

  // const responseThree = await modifyTransaction(27,"Sibusiso2232", "johimok750@chosenx.com", "item1, item2, item3", 189.99, "Cash","Pending", "siya hlangana extreme" );
  // console.log(responseThree);
  const response = await UpdateInventory(48);
  console.log(response);
  // const [file, setFile] = useState<File | null>(null);
  // const [uploading, setUploading] = useState(false);
  // const [result, setResult] = useState("");

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setFile(event.target.files[0]);
  //   }
  // };

  // const uploadFile = async (file: File, filePath: string) => {
  //   const { data, error } = await supabase.storage.from('Ekhaya_Bucket').upload(filePath, file);
  //   if (error) {
  //     setResult(`Error uploading file: ${error.message}`);
  //   } else {
  //     const { data: url } = await supabase.storage.from('Ekhaya_Bucket').getPublicUrl(filePath);
  //     console.log(url.publicUrl);
  //     setResult(`File uploaded successfully: ${data}`);
  //   }
  // };

  // const handleUpload = () => {
  //   if (file) {
  //     setUploading(true);
  //     const filePath = `image/${uuidv4()}.${file.name.split('.').pop()}`;
  //     uploadFile(file, filePath).finally(() => setUploading(false));
  //   } else {
  //     setResult('No file selected');
  //   }
  // };

  return (
    <main className="relative flex min-h-screen flex-col bg-[#F2F2F2] pt-12">
      <p className="text-[#303030] font-bold text-[32px] ml-8">Home Page</p>
      <input
        type="file"
        accept="image/*"
        className="w-full p-2 border rounded"
       
      />
      <button  className="mt-2 p-2 bg-blue-500 text-white rounded">
      
      </button>
    
     
      {/* <EmployeeTable/> */}
    </main>
  );
}