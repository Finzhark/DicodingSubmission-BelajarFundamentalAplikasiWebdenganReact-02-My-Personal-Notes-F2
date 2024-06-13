import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUserLogged, putAccessToken } from "./api";
import { LocaleProvider } from "./contexts/LocaleContexts";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import ArchivePage from "./pages/ArchivePage";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./components/Footer";

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [locale, setLocale] = useState(localStorage.getItem("locale") || "id");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return newLocale;
    });
  };

  const toggleTheme = () => {
    setTheme((prevState) => {
      const newTheme = prevState === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const localeContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  useEffect(() => {
    async function getData() {
      return await getUserLogged().then(({ data }) => {
        setAuthedUser(data);
        setTimeout(() => {
          setInitializing(false);
        }, 2600);
      });
    }

    getData();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  function onLogout() {
    putAccessToken("");
    setAuthedUser(null);
  }


  if (authedUser === null) {
    return (
      <LocaleProvider value={localeContextValue}>
        <ThemeProvider value={themeContextValue}>
          <div className="app-container">
            <Header logoutx={onLogout} />
            <main>
              <Routes>
                <Route
                  path="/"
                  element={<LoginPage loginSuccess={onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </LocaleProvider>
    );
  }

  return (
    <LocaleProvider value={localeContextValue}>
      <ThemeProvider value={themeContextValue}>
        <div className="app-container">
          <Header logout={onLogout} name={authedUser.name} />
          <main>
            <Routes>
              <Route path="/*" element={<NotFoundPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/archive" element={<ArchivePage />} />
              <Route path="/notes/new" element={<AddPage />} />
              <Route path="/notes/:id" element={<DetailPage />} />
              <Route path="/notes/:id/edit" element={<EditPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </LocaleProvider>
  );
}

export default App;