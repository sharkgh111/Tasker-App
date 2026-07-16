import React from "react";

export default function TextInput({ className = "", ...props }) {
     return (
          <input
               {...props}
               className={`rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${className}`}
          />
     );
}
