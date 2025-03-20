import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import HomePage from "./pages/HomePage/HomePage"
import NetflixPage from "./pages/NetflixPage/NetflixPage"
import CrudListPage from "./pages/CrudPage/CrudListPage"
import CrudViewPage from "./pages/CrudPage/CrudViewPage"
import AddUserPage from "./pages/CrudPage/AddUserPage"
import { UserProvider } from "./context/UserContext"

function App() {

  return (
    <>
      <UserProvider>
        <BrowserRouter>

          <Header />

          <div className="mt-5 pt-4">
            <Routes>
              <Route path="/" element={<HomePage />}/>
              <Route path="/netflix" element={<NetflixPage />}/>
              <Route path="/crud" element={<CrudListPage />}/>
              <Route path="/crud/:id" element={<CrudViewPage />}/>
              <Route path="/crud/add" element={<AddUserPage />}/>
            </Routes>
          </div>

          <Footer />
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App
