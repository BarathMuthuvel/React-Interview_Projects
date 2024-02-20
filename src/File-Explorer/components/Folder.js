import React, { useState } from "react";

const Folder = ({ explorer ,handleInsertNode}) => {
  console.log(explorer);
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true)
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if(e.keyCode === 13 && e.target.value){
        handleInsertNode(explorer.id, e.target.value,showInput.isFolder)
        setShowInput({...showInput,visible: false})
    }
  }

  if (explorer.isFolder) {
    return (
      <div style={{ margin: 5 }}>
        <div
          className="folder"
          style={{ cursor: "pointer" }}
          onClick={() => setExpand(!expand)}
        >
          <span>📁{explorer.name}</span>
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>📁</button>
            <button onClick={(e) => handleNewFolder(e, false)}>📄</button>
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 20 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                onKeyDown={onAddFolder}
                className="inputContainer__input"
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                autoFocus
              />
            </div>
          )}
          {explorer.items.map((item) => {
            return <Folder handleInsertNode={handleInsertNode} key={item.id} explorer={item} />;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="file" style={{ margin: 5 }}>
        <div>
          <span>📄{explorer.name}</span>
        </div>
      </div>
    );
  }
};

export default Folder;
