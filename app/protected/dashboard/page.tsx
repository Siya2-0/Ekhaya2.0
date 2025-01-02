
import AuthButton from '@/components/header-auth'
import InactivityPopup from '@/components/InactivityPopup'
import InactivityPopupServer from '@/components/inactivitypopupserver'
import EmployeeTable from '@/components/table'

const Dashboard = () => {
  return (
    <div>
        <main className="relative flex min-h-screen flex-col bg-[#F2F2F2] pt-12">
        <p className="text-[#303030] font-bold text-[32px] ml-8">Dashboard Page</p>
        <AuthButton />
            {/* <EmployeeTable/> */}
            <InactivityPopupServer/> 
        </main>
    </div>
  )
}

export default Dashboard