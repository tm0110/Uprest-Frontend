import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import './App.css';

const backendURL = (location) => {
  let prefix = "http://localhost/uprest";

  return prefix + location;
}

const Main = () => {
  const [status, setStatus] = useState("Connecting to server...");

  let navigate = useNavigate();

  useEffect(() => {
    const toWelcome = () => { 
      navigate("/Welcome");
    }

    fetch(backendURL("/meta/uprest"))
       .then((response) => response.json())
       .then((data) => {
          if (data === 1) {
            setStatus("Successfully connected to server!");
            toWelcome();
          }
          else {
            setStatus("Error: invalid response from server.");
            test.className = "Test";
          }
       })
       .catch((err) => {
          setStatus("Error: could not connect to server.");
          test.className = "Test";
       });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <table id="test">
          <tbody>
            <tr>
              <td>{status}</td>
            </tr>
            </tbody>
        </table>
      </header>
    </div>
  );
};

const Welcome = () => {
  let navigate = useNavigate(); 

  const toServerTime = () => { 
    navigate("/ServerTime");
  }

  const toGuestbook = () => { 
    navigate("/Guestbook");
  }

  const toVersion = () => { 
    navigate("/Version");
  }

  return (
    <div className="App">
      <header className="App-header">
        <table id="test">
          <tbody>
            <tr>
              <td>Welcome to Uprest!</td>
            </tr>
            <tr>
              <td><button onClick={toServerTime}>Server Time</button> <button onClick={toGuestbook}>Guestbook</button > <button onClick={toVersion}>Version</button ></td>
            </tr>
            </tbody>
        </table>
      </header>
    </div>
  );
};

const ServerTime = () => {
  const [timestamp, setTimestamp] = useState("Timestamp?");

  let navigate = useNavigate();

  const toWelcome = () => { 
    navigate("/Welcome");
  }

 useEffect(() => {
      fetch(backendURL("/module/time"))
         .then((response) => response.json())
         .then((data) => {
            setTimestamp(data.time);
         })
         .catch((err) => {
            setTimestamp("Couldn't get server time");
         });
   }, []);

  return (
    <div className="App">
      <header className="App-header">
        <table id="test">
          <tbody>
            <tr>
              <td>{timestamp}</td>
            </tr>
            <tr>
              <td><button onClick={toWelcome}>Back</button></td>
            </tr>
            </tbody>
        </table>
      </header>
    </div>
  );
};

const Guestbook = () => {
  const [newEntry, setNewEntry] = useState("");
  const [entries, setEntries] = useState("");

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    navigate("/");
  }

  const addEntry = async(text) => {
    await fetch(backendURL("/module/guestbook"), {
      method: "POST",
      body: newEntry,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    });
  }

  const deleteAll = async() => {
    let response = await fetch(backendURL("/module/guestbook"), {
      method: "DELETE",
      body: "",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    });

    await response.json();
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setEntries(entries + newEntry);
    addEntry(newEntry);
  }

  const onDelete = (e) => {
    e.preventDefault();
    deleteAll();
    setEntries("");
  }

 useEffect(() => {
      fetch(backendURL("/module/guestbook"))
         .then((response) => response.json())
         .then((data) => {
            var tmp = "";

            for (var i = 0; i < data.length; i++)
              tmp += data[i].entry;
            setEntries(tmp);
         })
         .catch((err) => {
            setEntries("Couldn't get guestbook entries");
         });
   }, []);

  return (
    <div className="App">
      <header className="App-header">
        <table id="test">
          <tbody>
            <tr>
              <td>Guestbook</td>
            </tr>
            <tr>
              <td>
                <textarea name="Text1" cols="40" rows="5" onChange={e => setNewEntry(e.target.value)}></textarea> <button onClick={onSubmit}>Submit</button> <button onClick={onDelete}>Delete all</button>
              </td>
            </tr>
            <tr>
              <td>{entries}</td>
            </tr>
            <tr>
              <td><button onClick={routeChange}>Back</button></td>
            </tr>
            </tbody>
        </table>
      </header>
    </div>
  );
};

const Version = () => {
  const [version, setVersion] = useState("");

 useEffect(() => {
      fetch(backendURL("/meta/version"))
         .then((response) => response.json())
         .then((data) => {
            setVersion(data.version);
         })
         .catch((err) => {
            setVersion("Couldn't get Uprest version");
         });
   }, []);

  let navigate = useNavigate(); 
  const toWelcome = () => { 
    navigate("/Welcome");
  }

  return (
    <div className="App">
      <header className="App-header">
        <table id="test">
          <tbody>
            <tr>
              <td>Uprest version: {version}</td>
            </tr>
            <tr>
              <td><button onClick={toWelcome}>Back</button></td>
            </tr>
            </tbody>
        </table>
      </header>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/Welcome" element={<Welcome />} />
        <Route exact path="/ServerTime" element={<ServerTime />} />
        <Route exact path="/Guestbook" element={<Guestbook />} />
        <Route exact path="/Version" element={<Version />} />
      </Routes>
    </Router>
  );
}

export default App;
