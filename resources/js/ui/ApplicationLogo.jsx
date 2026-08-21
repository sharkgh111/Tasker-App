import React from "react";

export default function ApplicationLogo({ className = "" }) {
     return (
          <svg viewBox="0 0 100 100" className={className} fill="currentColor">
               <rect x="10" y="10" width="80" height="80" rx="16" />
          </svg>
     );
}
