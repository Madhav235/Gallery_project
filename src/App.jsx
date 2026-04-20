import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [UserData, setUserData] = useState([]);

  async function getData() {
    let response = await axios.get(
      "https://picsum.photos/v2/list?page=2&limit=30",
    );

    setUserData(response.data);
    console.log(response);
  }

  let printUserdata = "No data available";

  if (UserData.length > 0) {
    printUserdata = UserData.map((item) => {
      return (
        <a target="_blank" href={item.url}>
          <div>
            <div className="w-44 h-40 rounded-2xl bg-white">
              <img
                className="h-full w-full rounded-2xl object-cover"
                src={item.download_url}
              ></img>
            </div>
            <h2 className="font-bold text-md">{item.author}</h2>
          </div>
        </a>
      );
    });
  }

  return (
    <div className="w-screen h-screen bg-black px-5 py-5 overflow-auto">
      <button
        onClick={getData}
        className="w-45 h-15 mb-4 bg-green-500 text-white rounded-2xl font-bold text-lg hover:cursor-pointer"
      >
        Get data
      </button>
      <div className="text-white flex flex-wrap gap-2">{printUserdata}</div>
    </div>
  );
};

export default App;
