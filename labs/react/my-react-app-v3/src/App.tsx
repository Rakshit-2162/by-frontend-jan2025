import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import AddUserPage from "./pages/CrudPage/AddUserPage"
import CrudListPage from "./pages/CrudPage/CrudListPage"
import CrudViewPage from "./pages/CrudPage/CrudViewPage"
import HomePage from "./pages/HomePage/HomePage"
import NetflixPage from "./pages/NetflixPage/NetflixPage"


const App = () => (
  <div className="App">
    <BrowserRouter>

      <Header />

      <div className="mt-5 pt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/netflix" element={<NetflixPage />} />
          <Route path="/crud" element={<CrudListPage />} />
          <Route path="/crud/:id" element={<CrudViewPage />} />
          <Route path="/crud/add" element={<AddUserPage />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  </div>
)

export default App
