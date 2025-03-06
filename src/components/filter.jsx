  import React from "react";
import { useNavigate } from "react-router-dom";
  const ButtonGroup = () => {
    const buttons = [
      "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Telugu",
  "Hindi",
  "History",
  "Geography",
  "Economics",
      
    ];
const navigate=useNavigate();
    return (
      <div className="flex overflow-x-auto bg-[#F1F6F9] rounded-lg shadow-sm p-2 w-full scrollbar-hide">
        {buttons.map((label, index) => (
          <button
            onClick={()=>{
              navigate(`/filter?subject=${label}`);
            }}
            key={index}
            className="flex-none w-36 text-center py-3 text-[#394867] bg-transparent rounded-md transition-all hover:bg-[#9BA4B4] hover:text-white hover:font-semibold hover:shadow-md active:bg-[#14274E] mx-1 font-bold"
          >
            {label}
          </button>
        ))}
      </div>
    );
  };

  export default ButtonGroup;
