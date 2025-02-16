import Header from "@/components/Header"
import DocumentManagement from "@/components/home/DocumentManagement"

function Home() {
  return (
    <div className="bg-slate-200 h-screen flex flex-col">
      <Header />
      <div className="flex items-center justify-center h-[90%]">
        <DocumentManagement />
      </div>
    </div>
  )
}

export default Home
