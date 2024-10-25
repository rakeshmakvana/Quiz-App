import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Quiz from "../pages/Quiz";
import Languages from "../pages/Languages";
import Result from "../pages/Result";
import Header from "./Header";
import Auth from "./Auth";
import AddLanguageAndQuestion from "./QuestionForm";

const Layout = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route element={<Auth />}>
          <Route path="/languages" element={<Languages />} />
          <Route path="/quiz/:languageId" element={<Quiz />} />
          <Route path="/quiz/add" element={<AddLanguageAndQuestion />} />
          <Route path="/results" element={<Result />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Layout;
