import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProfilePage from "./pages/Profile";
import SharedLayout from "./pages/SharedLayout";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import { useAppSelector } from "./state/hooks";

function App() {
  const mode = useAppSelector((state) => state.mode);

  const theme = mode === "light" ? lightTheme : darkTheme;
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
