import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import BlankPage from "./pages/BlankPage";
import RegisterPage from "./pages/authPage/RegisterPage";
import LogInPage from "./pages/authPage/LogInPage";
import WordbasesLayout from "./layouts/WordbasesLayout";
import SingleWordBaseLayout from "./layouts/SingleWordBaseLayout";
import HomeLayout from "./layouts/HomeLayout";
import MainPage from "./pages/mainPage/MainPage";
import { homeLoader } from "./utils/loaders/loaders";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<BlankPage />}>
        <Route path="login" element={<LogInPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/" element={<MainPage />}>
          <Route path="/" element={<HomeLayout />} loader={homeLoader} />
          <Route path="wordbases" element={<WordbasesLayout />} />
          <Route path="wordbase/:name" element={<SingleWordBaseLayout />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
