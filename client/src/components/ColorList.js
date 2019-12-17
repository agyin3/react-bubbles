import React, { useState } from "react";
import axiosWithAuth from "./axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState({color: '', hex: ''})

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addColor = e => {
    e.preventDefault()
    axiosWithAuth()
      .post('/api/colors', {
        ...colorToAdd,
        code: {
          hex: colorToAdd.hex
        }
      })
      .then(res => {
        updateColors(res.data)
      })
      .catch(err => {
        console.log(err.message)
      })

      setColorToEdit({color: '', hex: ''})
  }

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, {
        ...colorToEdit
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err.message)
      })

      axiosWithAuth()
        .get('/api/colors/')
        .then(res => {
          updateColors(res.data)
        })
        .catch(err => {
          console.log(err.message)
        })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        updateColors(colors.filter(color => color.id !== res.data))
      })
      .catch(err => {
        console.log(err.message)
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
              <form onSubmit={addColor}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  hex: e.target.value
                })
              }
              value={colorToAdd.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
          </div>
        </form>
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
