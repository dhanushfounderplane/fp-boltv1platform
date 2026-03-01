import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useLeadsStore } from '@/store/leadsStore';
import { LogOut, Plus, Search, Filter, Trash2 } from 'lucide-react';
export default function Admin() {
    const navigate = useNavigate();
    const { user, signOut } = useAuthStore();
    const { leads, isLoading, fetchLeads, deleteLead } = useLeadsStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);
    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };
    const handleDelete = async (id) => {
        await deleteLead(id);
        setDeleteConfirm(null);
    };
    const filteredLeads = leads.filter((lead) => {
        const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
        const matchesStatus = !statusFilter || lead.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
    const statuses = Array.from(new Set(leads.map((l) => l.status)));
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("header", { className: "bg-white border-b sticky top-0 z-40", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Admin Dashboard" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("span", { className: "text-sm text-gray-600", children: user?.email }), _jsx("button", { onClick: handleLogout, className: "p-2 hover:bg-gray-100 rounded-lg transition", title: "Logout", children: _jsx(LogOut, { size: 20, className: "text-gray-600" }) })] })] }) }), _jsx("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "bg-white rounded-lg shadow", children: [_jsxs("div", { className: "p-6 border-b", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-xl font-bold", children: "Leads" }), _jsxs("button", { className: "bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium inline-flex items-center gap-2 transition", children: [_jsx(Plus, { size: 20 }), "New Lead"] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-3 text-gray-400", size: 20 }), _jsx("input", { type: "text", placeholder: "Search by name, email, or company...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" })] }), _jsxs("div", { className: "relative", children: [_jsx(Filter, { className: "absolute left-3 top-3 text-gray-400", size: 20 }), _jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent", children: [_jsx("option", { value: "", children: "All Statuses" }), statuses.map((status) => (_jsx("option", { value: status, children: status }, status)))] })] })] })] }), _jsx("div", { className: "overflow-x-auto", children: isLoading ? (_jsx("div", { className: "p-8 text-center", children: _jsx("div", { className: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" }) })) : filteredLeads.length === 0 ? (_jsx("div", { className: "p-8 text-center text-gray-500", children: _jsx("p", { children: "No leads found" }) })) : (_jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-gray-50 border-t", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider", children: "Name" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider", children: "Email" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider", children: "Company" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider", children: "Status" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider", children: "Created" }), _jsx("th", { className: "relative px-6 py-3", children: _jsx("span", { className: "sr-only", children: "Actions" }) })] }) }), _jsx("tbody", { className: "bg-white divide-y", children: filteredLeads.map((lead) => (_jsxs("tr", { className: "hover:bg-gray-50 transition", children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: lead.name }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-600", children: lead.email }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-600", children: lead.company || '-' }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("span", { className: "px-3 py-1 text-sm font-medium rounded-full bg-primary-100 text-primary-800", children: lead.status }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-600", children: new Date(lead.created_at).toLocaleDateString() }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm", children: deleteConfirm === lead.id ? (_jsxs("div", { className: "flex gap-2 justify-end", children: [_jsx("button", { onClick: () => handleDelete(lead.id), className: "px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition", children: "Confirm" }), _jsx("button", { onClick: () => setDeleteConfirm(null), className: "px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-900 text-xs rounded transition", children: "Cancel" })] })) : (_jsx("button", { onClick: () => setDeleteConfirm(lead.id), className: "p-2 hover:bg-gray-100 rounded transition", title: "Delete lead", children: _jsx(Trash2, { size: 16, className: "text-gray-400" }) })) })] }, lead.id))) })] })) })] }) })] }));
}
