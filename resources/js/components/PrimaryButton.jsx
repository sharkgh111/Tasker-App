import React from "react";

export default function PrimaryButton({ className = "", children, ...props }) {
     return (
          <button
               {...props}
               className={`inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 ${className}`}
          >
               {children}
          </button>
     );
}
