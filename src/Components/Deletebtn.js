import React from 'react'

function Deletebtn({ onDeleteDrop }) {
    return (
      <div
        style={{ width: 100, height: 100, backgroundColor: "red" }}
        onDrop={onDeleteDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        Drop here to delete
      </div>
    );
  }
  
export default Deletebtn
