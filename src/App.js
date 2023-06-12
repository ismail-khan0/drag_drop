import React, { useState } from "react";
import Table from "./Components/Table";
import Mapping from "./Components/Mapping";
import "./App.css"; // Import the CSS file for styling
function App() {
  const [droppedButtons, setDroppedButtons] = useState([]);
  const [buttonText, setButtonText] = useState("");
  const [tabledata, settabledata] = useState([
    [
      "",
      "Autumn 1",
      "Autumn 2 ",
      "Autumn 3",
      "Autumn 4",
      "Autumn 5",
      "Autumn 6",
    ],
    ["EYFS", "", "", "", "", "", ""],
    ["KSY1", "", "", "", "", "", ""],
    ["KSY2", "", "", "", "", "", ""],
    ["KSY3", "", "", "", "", "", ""],
  ]);

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("button");
    const target = event.target;

    // Check if the target is a td element
    if (target.tagName !== "TD") {
      return;
    }

    const existingContent = target.innerHTML;

    // Check if the cell already has two buttons
    if (existingContent.split("<button").length - 1 >= 2) {
      alert("You can only drop two buttons in each cell!");
      return;
    }

    // Check if the cell contains any of the restricted values
    const restrictedValues = ["Autumn", "EYFS", "KSY1", "KSY2", "KSY3"];
    const containsRestrictedValue = restrictedValues.some((value) =>
      existingContent.includes(value)
    );
    if (containsRestrictedValue) {
      alert("This cell cannot receive buttons!");
      return;
    }

    // Check if the button already exists in the cell
    if (existingContent.includes(data)) {
      alert("This button already exists in the cell!");
      return;
    }

    // Add the new button to the cell
    const buttonWrapper = document.createElement("div");
    buttonWrapper.className = "button-wrapper";
    buttonWrapper.innerHTML = `${data}`;
    target.appendChild(buttonWrapper);

    // Get the updated cell content and update the table data state
    const updatedContent = target.innerHTML;
    const rowIndex = target.parentNode.rowIndex;
    const cellIndex = target.cellIndex;
    const updatedTableData = [...tabledata];
    updatedTableData[rowIndex][cellIndex] = updatedContent;
    settabledata(updatedTableData);

    // Add the dropped button to the droppedButtons state array
    setDroppedButtons((prevState) => [...prevState, data]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDeleteDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("button");
  
    // Remove the dropped button from the droppedButtons state array
    setDroppedButtons((prevState) => prevState.filter((item) => item !== data));
  };
  
  return (
    <div className="app">
      <div className="mapping-wrapper">
        <Mapping />
      </div>

      <div className="table-wrapper">
        <Table
          buttonText={buttonText}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onMobileDeleteDrop={handleDeleteDrop} // New prop for mobile delete drop
          tableData={tabledata}
        />
      </div>
    </div>
  );
}
export default App;