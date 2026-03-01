import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
export default function NotFound() {
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-6xl font-bold mb-4", children: "404" }), _jsx("p", { className: "text-2xl text-gray-600 mb-8", children: "Page not found" }), _jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition", children: [_jsx(Home, { size: 20 }), "Back to Home"] })] }) }));
}
