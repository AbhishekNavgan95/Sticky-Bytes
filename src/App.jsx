import { useEffect, useState } from "react";
import Notes from "./components/Notes";
import ThemeToggle from "./components/ThemeToggle";
import AddNote from "./components/AddNote";
import logo from "./assets/logo.png"

function App() {
  const [notes, setNotes] = useState([]);
  const [darkActive, setDarkActive] = useState(JSON.parse(localStorage.getItem("theme")) || false);



  return (
    <div className={`w-full scroll-y-none min-h-screen ${darkActive ? "bg-emerald-950" : "bg-emerald-400"}`}>
      <span className="py-5 max-w-[1280px] mx-auto flex justify-between">
        <img src={logo} alt="" className="h-10" />
        <ThemeToggle darkActive={darkActive} setDarkActive={setDarkActive} />
      </span>
      <Notes notes={notes} setNotes={setNotes} />
      <AddNote notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default App;
