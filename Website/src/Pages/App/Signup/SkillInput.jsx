import React, { useState } from "react";

export default function SkillInput({
  label,
  placeholder,
  suggestions,
  onChange,
}) {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);

  const addTag = (value) => {
    const val = value.trim();
    if (val && !tags.includes(val)) {
      const newTags = [...tags, val];
      setTags(newTags);
      onChange(newTags);
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onChange(newTags);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
      setInput("");
    } else if (e.key === "Backspace" && input === "") {
      removeTag(tags.length - 1);
    }
  };

  const filteredSuggestions = suggestions.filter(
    (s) => s.toLowerCase().includes(input.toLowerCase()) && !tags.includes(s)
  );

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </label>
      <div className="bg-slate-700 text-white w-full pl-3 pr-3 py-2 rounded-lg border border-slate-600 focus:outline-none input-focus flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="tag bg-slate-600 px-2 py-1 rounded flex items-center text-sm"
          >
            {tag}
            <i
              className="fas fa-times ml-2 text-xs cursor-pointer hover:text-red-400"
              onClick={() => removeTag(index)}
            ></i>
          </span>
        ))}
        <input
          type="text"
          className="bg-transparent text-white outline-none flex-grow"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {input && filteredSuggestions.length > 0 && (
        <ul className="bg-slate-800 border border-slate-600 mt-1 rounded max-h-32 overflow-y-auto">
          {filteredSuggestions.map((suggestion, idx) => (
            <li
              key={idx}
              onClick={() => {
                addTag(suggestion);
                setInput("");
              }}
              className="px-3 py-1 text-white hover:bg-slate-700 cursor-pointer text-sm"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
