'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function NewPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const uploadFile = async (file: File, filePath: string) => {
    const { data, error } = await supabase.storage.from('Ekhaya_Bucket').upload(filePath, file);
    if (error) {
      setResult(`Error uploading file: ${error.message}`);
    } else {
      const { data: url } = await supabase.storage.from('Ekhaya_Bucket').getPublicUrl(filePath);
      console.log(url.publicUrl);
      setResult(`File uploaded successfully: ${data}`);
    }
  };

  const handleUpload = () => {
    if (file) {
      setUploading(true);
      const filePath = `image/${uuidv4()}.${file.name.split('.').pop()}`;
      uploadFile(file, filePath).finally(() => setUploading(false));
    } else {
      setResult('No file selected');
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col bg-[#F2F2F2] pt-12">
      <p className="text-[#303030] font-bold text-[32px] ml-8">Home Page</p>
      <input
        type="file"
        accept="image/*"
        className="w-full p-2 border rounded"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload} className="mt-2 p-2 bg-blue-500 text-white rounded" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
      {result && <p>{result}</p>}
     
      {/* <EmployeeTable/> */}
    </main>
  );
}