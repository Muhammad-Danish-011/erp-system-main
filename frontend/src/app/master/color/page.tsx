"use client";
import { useState } from "react";

export default function CarColorMaster() {
  const [colorName, setColorName] = useState("");
  const [hexCode, setHexCode] = useState("#FFE4C9");
  const [isActive, setIsActive] = useState(true);
  const [colors, setColors] = useState([
    { id: 1, name: "Beige", hex: "#FFE4C9", active: true },
    { id: 2, name: "Black", hex: "#000000", active: true },
    { id: 3, name: "Blue", hex: "#0000FF", active: true },
    { id: 4, name: "Brown", hex: "#A52A2A", active: true },
    { id: 5, name: "Gold", hex: "#FFD700", active: true },
    { id: 6, name: "Gray", hex: "#808080", active: true },
    { id: 7, name: "Green", hex: "#008000", active: true },
    { id: 8, name: "Orange", hex: "#FFA500", active: true },
    { id: 9, name: "Purple", hex: "#800080", active: true },
    { id: 10, name: "Red", hex: "#FF0000", active: true },
    { id: 11, name: "Silver", hex: "#C0C0C0", active: true },
    { id: 12, name: "Yellow", hex: "#FFFF00", active: true },
    { id: 13, name: "Mint Green", hex: "#F9F9FF", active: true },
    { id: 14, name: "Forged Green", hex: "#296e01", active: true },
    { id: 15, name: "Electric Blue", hex: "#7DF9FF", active: true },
  ]);

  const handleSave = () => {
    if (!colorName.trim()) return;
    const newColor = {
      id: colors.length + 1,
      name: colorName,
      hex: hexCode,
      active: isActive,
    };
    setColors([...colors, newColor]);
    setColorName("");
    setHexCode("#000000");
    setIsActive(true);
  };

  const handleClear = () => {
    setColorName("");
    setHexCode("#000000");
    setIsActive(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Top Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Update
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Delete
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Clear
        </button>
      </div>

      {/* Input Section */}
      <div className="flex items-center gap-4 mb-4">
        <label className="text-sm font-medium">Color Name :</label>
        <input
          type="text"
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-64"
          placeholder="Enter color name..."
        />
        <input
          type="color"
          value={hexCode}
          onChange={(e) => setHexCode(e.target.value)}
          className="h-10 w-16 border rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4"
          />
          Is Active
        </label>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-300 rounded">
        <table className="min-w-full text-sm">
          <thead className=" text-left">
            <tr>
              <th className="px-4 py-2 border">Color ID</th>
              <th className="px-4 py-2 border">Color Name</th>
              <th className="px-4 py-2 border">Hex Code</th>
              <th className="px-4 py-2 border">Active</th>
            </tr>
          </thead>
          <tbody>
            {colors.map((color) => (
              <tr key={color.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{color.id}</td>
                <td className="px-4 py-2 border">{color.name}</td>
                <td className="px-4 py-2 border">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-4 w-4 rounded border"
                      style={{ backgroundColor: color.hex }}
                    ></span>
                    {color.hex}
                  </div>
                </td>
                <td className="px-4 py-2 border text-center">
                  <input
                    type="checkbox"
                    checked={color.active}
                    readOnly
                    className="h-4 w-4"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
