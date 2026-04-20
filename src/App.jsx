import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [UserData, setUserData] = useState([]);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    getData();
  }, [index]);

  let printUserdata = (
    <h1 className="text-gray-500 font-semibold text-md italic absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 ">
      Loading...
    </h1>
  );

  function prev() {
    if (index > 1) {
      setIndex(index - 1);
      setUserData([]);
    }
  }

  function next() {
    setIndex(index + 1);
    setUserData([]);
  }

  async function getData() {
    let response = await axios.get(
      `https://picsum.photos/v2/list?page=${index}&limit=20`,
    );

    setUserData(response.data);
    console.log(response);
  }

  console.log(index);

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
      <div className="text-white flex flex-wrap gap-2 h-[82%] ">
        {printUserdata}
      </div>
      <div className="flex gap-4 justify-center items-center mt-5">
        <button
        style={{opacity: index===1?0.6:1}}
          onClick={() => {
            prev();
          }}
          className="px-8 py-2.5 bg-amber-400 rounded-md hover:cursor-pointer"
        >
          Prev
        </button>
        <h2 className="text-white">Page {index}</h2>
        <button
          onClick={() => {
            next();
          }}
          className="px-8 py-2.5 bg-amber-400 rounded-md hover:cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
