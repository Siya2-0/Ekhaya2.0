
import { addTransaction, FetchDailyTotals, FetchTotalPaid, FetchTotalUnPaid, fetchTransaction, fetchTransactionHistory, UpdateInventory } from "../restapi";
import { deleteUser, fetchUsers, UpdaterUser } from "../restapi copy";
// import { AuthProvider, useAuth } from '../../AuthContext';
// import InactivityPopup from "@/components/InactivityPopup";



export default async function FormPage() {
  // const [users, setUsers] = useState([]);

  const response = await FetchDailyTotals(2);
  console.log(response);
  const response1 = await FetchTotalPaid('2024-12-30');
  console.log(response1);
  const response2 = await FetchTotalUnPaid('2024-12-30');
  console.log(response2);

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
      <button className="mt-2 p-2 bg-blue-500 text-white rounded">
        Upload
      </button>
     {/* <InactivityPopup/> */}
 
    </main>
  );
}

