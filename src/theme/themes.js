export const lightTheme = {
  colors: {
    background: "#ffffff",         // white
    text: "#111827",               // gray-900
    navBackground: "#f9fafb",      // gray-50
    navText: "#1d4ed8",            // blue-700
    navHoverText: "#1e40af",       // blue-800
    accent: "#ec4899",             // pink-500
    accentHover: "#db2777",        // pink-600
    border: "#505664",             // gray-200
    bannerText: "#ec4899",
    bannerHoverText: "#be185d",
    tableHeaderBg: "#ddd",       // gray-100
    tableHeaderText: "#1f2937",     // gray-800
    tableRowAltBg: "#f9fafb",       // gray-50
    tableHoverBg: "#ddd",      // light gray hover
    error: "#e63946", // red tone for light mode
    tableRowEvenBg: "#ffffff",       // white
    tableRowOddBg: "#f9fafb",        // gray-50
    tableRowHoverBg: "#e0f2fe",      // light blue
    icons: {
      default: {
        bg: "#f3f4f6",                // gray-100
        iconBg: "rgba(107, 114, 128, 0.7)", // gray-500
        color: "#ffffff",
        hover: "rgba(107, 114, 128, 0.9)"
      },
      all_templates: {
        bg: "#d1fae5",                // green-100
        iconBg: "rgba(0, 255, 0, 0.7)",
        color: "#ffffff",
        hover: "rgba(0, 200, 0, 0.3)"
      },
      classical: {
        bg: "#d1fae5",                // green-100
        iconBg: "rgba(0, 128, 0, 0.7)",
        color: "#ffffff",
        hover: "rgba(0, 128, 0, 0.9)"
      },
      modern: {
        bg: "#dbeafe",                // blue-100
        iconBg: "rgba(0, 0, 255, 0.7)",
        color: "#ffffff",
        hover: "rgba(0, 0, 255, 0.9)"
      },
      creative: {
        bg: "#fce7f3",                // pink-100
        iconBg: "rgba(255, 99, 132, 0.7)",
        color: "#ffffff",
        hover: "rgba(255, 99, 132, 0.9)"
      },
      simple: {
        bg: "#fef3c7",                // yellow-100
        iconBg: "rgba(255, 206, 86, 0.7)",
        color: "#ffffff",
        hover: "rgba(255, 206, 86, 0.9)"
      }
    },
    button: {
      primary: {
        bg: "#3b82f6",          // blue-500
        text: "#ffffff",
        hoverBg: "#2563eb",     // blue-600
        hoverText: "#ffffff",
        border: "#3b82f6",
      },
      secondary: {
        bg: "#f3f4f6",          // gray-100
        text: "#111827",
        hoverBg: "#e5e7eb",     // gray-200
        hoverText: "#111827",
        border: "#d1d5db",
      },
      outline: {
        bg: "transparent",
        text: "#1d4ed8",
        hoverBg: "#e0f2fe",     // blue-100
        hoverText: "#1d4ed8",
        border: "#1d4ed8",
      },
      danger: {
        bg: "#ef4444",          // red-500
        text: "#ffffff",
        hoverBg: "#dc2626",     // red-600
        hoverText: "#ffffff",
        border: "#ef4444",
      },
      ghost: {
        bg: "transparent",
        text: "#6b7280",         // gray-500
        hoverBg: "#f9fafb",
        hoverText: "#111827",
        border: "transparent",
      },
      disabled: {
        bg: "#e5e7eb",
        text: "#9ca3af",
        border: "#e5e7eb",
      }
    },
    card: {
      background: "#f9fafb",     // a subtle off-white if you want a soft card feel
      text: "#111827",               // for high contrast text
      border: "#505664",             // soft gray border
      hoverBackground: "#f3f4f6",    // light hover effect
      shadow: "rgba(0, 0, 0, 0.05)", // optional box shadow
    }
    
  }
};

export const darkTheme = {
  colors: {
    background: "#111827",         // gray-900
    text: "#ffffff",               // white
    navBackground: "#1f2937",      // gray-800
    navText: "#93c5fd",            // blue-300
    navHoverText: "#60a5fa",       // blue-400
    accent: "#f472b6",             // pink-400
    accentHover: "#ec4899",        // pink-500
    border: "#888",             // gray-700
    bannerText: "#f472b6",
    bannerHoverText: "#ec4899",
    tableHeaderBg: "#374151",       // gray-700
    tableHeaderText: "#f3f4f6",     // gray-100
    tableRowAltBg: "#1f2937",       // gray-800
    tableHoverBg: "#4b5563",        // gray-600
    tableRowEvenBg: "#0f172a",      // slate-900
    tableRowOddBg: "#1e293b",       // slate-800
    tableRowHoverBg: "#334155",     // slate-700
    error: "#ff6b6b", // slightly lighter red for dark background
    button: {
        // gray-500
        primary: {
          bg: "#3b82f6",          // blue-500
          text: "#ffffff",
          hoverBg: "#2563eb",     // blue-600
          hoverText: "#ffffff",
          border: "#3b82f6",
        },
        secondary: {
          bg: "#f3f4f6",          // gray-100
          text: "#111827",
          hoverBg: "#e5e7eb",     // gray-200
          hoverText: "#111827",
          border: "#d1d5db",
        },
        outline: {
          bg: "transparent",
          text: "#1d4ed8",
          hoverBg: "#e0f2fe",     // blue-100
          hoverText: "#1d4ed8",
          border: "#1d4ed8",
        },
        danger: {
          bg: "#ef4444",          // red-500
          text: "#ffffff",
          hoverBg: "#dc2626",     // red-600
          hoverText: "#ffffff",
          border: "#ef4444",
        },
        ghost: {
          bg: "transparent",
          text: "#6b7280",         // gray-500
          hoverBg: "#f9fafb",
          hoverText: "#111827",
          border: "transparent",
        },
        disabled: {
          bg: "#e5e7eb",
          text: "#9ca3af",
          border: "#e5e7eb",
        }
      },
    icons: {
      default: {
        bg: "#1f2937",                // gray-800
        iconBg: "rgba(107, 114, 128, 0.5)", // gray-500
        color: "#ffffff",
        hover: "rgba(107, 114, 128, 0.7)"
      },
      all_templates: {
        bg: "#064e3b",                // dark greenish
        iconBg: "rgba(0, 255, 0, 0.5)",
        color: "#ffffff",
        hover: "rgba(0, 255, 0, 0.7)"
      },
      classical: {
        bg: "#065f46",                // darker green
        iconBg: "rgba(0, 128, 0, 0.5)",
        color: "#ffffff",
        hover: "rgba(0, 128, 0, 0.7)"
      },
      modern: {
        bg: "#1e3a8a",                // dark blue
        iconBg: "rgba(0, 0, 255, 0.5)",
        color: "#ffffff",
        hover: "rgba(0, 0, 255, 0.7)"
      },
      creative: {
        bg: "#831843",                // deep pink/maroon
        iconBg: "rgba(255, 99, 132, 0.5)",
        color: "#ffffff",
        hover: "rgba(255, 99, 132, 0.7)"
      },
      simple: {
        bg: "#78350f",                // warm brown
        iconBg: "rgba(255, 206, 86, 0.5)",
        color: "#ffffff",
        hover: "rgba(255, 206, 86, 0.7)"
      }
    },
    card: {
      background: "#1f2937",         // dark gray (navBackground)
      text: "#ffffff",               // high contrast white
      border: "#7b879b",             // subtle border
      hoverBackground: "#374151",    // slightly lighter on hover
      shadow: "rgba(0, 0, 0, 0.2)",  // optional soft shadow for lift
    }
    
  }
};
