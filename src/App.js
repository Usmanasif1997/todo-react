
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./home/index";
import Todo from "./todo/index";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
