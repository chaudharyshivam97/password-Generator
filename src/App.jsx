import { useState, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  function passwordGenerator() {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "~!@#$%^&*";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str[char];
    }
    setPassword(pass);
  }

  const copyToClipboard = function () {
    navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          placeholder="Password"
          className="outline-none w-full py-1 px-3 "
          value={password}
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 active:bg-blue-900"
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={32}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="cursor-pointer"
          />
          <label>Length: {length}</label>
        </div>
        <div>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label> Number</label>
        </div>
        <div>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label> Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
