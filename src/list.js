import React, { useEffect, useState } from "react";
import axios from "axios";

export default function List() {
  const [data, setData] = useState({
    result: { allItems: [], selectedItems: [] },
  });

  useEffect(() => {
    axios.get(`https://apis.ccbp.in/list-creation/lists`).then((res) => {
      const result = res.data;
      setData({ result: { allItems: result.lists, selectedItems: [] } });
    });
  }, []);

  const handleMoveToRight = (index) => {
    const allItemsCopy = [...data.result.allItems];
    const itemToMove = allItemsCopy.splice(index, 1)[0];
    setData((prevState) => ({
      result: {
        allItems: allItemsCopy,
        selectedItems: [...prevState.result.selectedItems, itemToMove],
      },
    }));
  };

  const handleMoveToLeft = (index) => {
    const selectedItemsCopy = [...data.result.selectedItems];
    const itemToMove = selectedItemsCopy.splice(index, 1)[0];
    setData((prevState) => ({
      result: {
        allItems: [...prevState.result.allItems, itemToMove],
        selectedItems: selectedItemsCopy,
      },
    }));
  };

  return (
    <div style={style.container}>
      <div style={style.list}>
        <h2>All Items {data.result.allItems.length}</h2>
        <div style={style.body}>
          {data.result.allItems.map((item, index) => (
            <div key={index} style={style.card}>
              {item.name}
              <button onClick={() => handleMoveToRight(index)}>&#8594;</button>
            </div>
          ))}
        </div>
      </div>
      <div style={style.list}>
        <h2>Selected Items {data.result.selectedItems.length}</h2>
        <div>
          {data.result.selectedItems.map((item, index) => (
            <div key={index} style={style.card}>
              {item.name}
              <button onClick={() => handleMoveToLeft(index)}>&#8592;</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const style = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
  },
  list: {
    width: "45%",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#f0f4fc",
  },

  card: {
    width: "80%",
    borderRadius: "5%",
    borderStyle: "solid",
    padding: "5px",
    margin: "5px",
    position: "relative",
    backgroundColor: "#fffcfc",
  },
};
