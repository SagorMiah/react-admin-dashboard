import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Ecommerce from "./pages/Ecommerce";
import Orders from "./pages/Orders";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Kanban from "./pages/Kanban";
import Editor from "./pages/Editor";
import Calender from "./pages/Calender";
import ColorPicker from "./pages/ColorPicker";
import Line from "./pages/charts/Line";
import Pie from "./pages/charts/Pie";
import Bar from "./pages/charts/Bar";
import Area from "./pages/charts/Area";
import Financial from "./pages/charts/Financial";
import ColorMapping from "./pages/charts/ColorMapping";
import Pyramid from "./pages/charts/Pyramid";
import Stacked from "./pages/charts/Stacked";
import ThemeSetting from "./components/ThemeSetting";

import { useStateContext } from "./contexts/ContextProvider";

const App = () => {
  const {
    activeMenu,
    themeSetting,
    setThemeSetting,
    setCurrentColor,
    setCurrentMode,
    currentMode,
    currentColor,
  } = useStateContext();

  useEffect(() => {
    const currentThemeMode = localStorage.getItem("themeMode");
    const currentThemeColor = localStorage.getItem("themeColor");

    if (currentThemeMode && currentThemeColor) {
      setCurrentMode(currentThemeMode);
      setCurrentColor(currentThemeColor);
    }
  }, []);
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: 100 }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white rounded-full"
                style={{ background: currentColor, borderRadius: "50%" }}
                onClick={() => setThemeSetting(true)}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed dark:bg-secondary-dark-bg bg-white">
            <Sidebar />
          </div>
        ) : null}
        <div
          className={`dark:bg-main-dark-bg bg-main-bg w-full ${
            activeMenu ? "md:pl-72" : "flex-2"
          }`}
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
            <Navbar />
          </div>

          <div>
            {themeSetting && <ThemeSetting />}

            <Routes>
              {/* dashboard */}
              <Route path="/" element={<Ecommerce />} />
              <Route path="/ecommerce" element={<Ecommerce />} />

              {/* pages */}
              <Route path="/orders" element={<Orders />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/customers" element={<Customers />} />

              {/* apps */}
              <Route path="/calender" element={<Calender />} />
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/color-picker" element={<ColorPicker />} />

              {/* charts */}
              <Route path="/line" element={<Line />} />
              <Route path="/area" element={<Area />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/financial" element={<Financial />} />
              <Route path="/color-mapping" element={<ColorMapping />} />
              <Route path="/pyramid" element={<Pyramid />} />
              <Route path="/stacked" element={<Stacked />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
