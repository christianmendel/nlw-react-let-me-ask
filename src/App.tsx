import { Home } from "./pages/Home";

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NewRoom } from "./pages/NewRoom";

import { AuthContextProvider } from './contexts/AuthContext'
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        <Routes>
          <Route path='/rooms/new' element={<NewRoom />} />
        </Routes>
        <Routes>
          <Route path='/rooms/:id' element={<Room />} />
        </Routes>
        <Routes>
          <Route path="/admin/rooms/:id" element={<AdminRoom />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>

  );
}

export default App;
