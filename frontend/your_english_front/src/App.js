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
import SingleWordBaseLayout from "./layouts/singleWordBaseLayout/SingleWordBaseLayout";
import HomeLayout from "./layouts/homeLayout/HomeLayout";
import MainPage from "./pages/mainPage/MainPage";
import WordbasesLayout from "./layouts/wordbasesLayout/WordbasesLayout";
import {
  flashcardsLoader,
  homeLoader,
  practiceLoader,
  sidebarLoader,
  singleWordBaseLoader,
  wordbasesLoader,
} from "./utils/loaders/loaders";
import PracticeLayout from "./layouts/practiceLayout/PracticeLayout";
import FlashcardsLayout from "./layouts/practice/flashcards/FlashcardsLayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<BlankPage />}>
        <Route path="login" element={<LogInPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/" element={<MainPage />} loader={sidebarLoader}>
          <Route path="/" element={<HomeLayout />} loader={homeLoader} />
          <Route
            path="wordbases"
            element={<WordbasesLayout />}
            loader={wordbasesLoader}
          />
          <Route
            path="wordbase/:name"
            element={<SingleWordBaseLayout />}
            loader={singleWordBaseLoader}
          />
          <Route path="practice">
            <Route
              path=""
              element={<PracticeLayout />}
              loader={practiceLoader}
            />
            <Route
              path="flashcards"
              element={<FlashcardsLayout />}
              loader={flashcardsLoader}
            />
          </Route>
          <Route path="/settings" element={<div>Settings</div>} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
