import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useLeadsStore } from '@/store/leadsStore';
import { validateEmail } from '@/lib/utils';
export default function LeadCaptureForm({ onSuccess, sourcePage = 'home' }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service_interest: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('idle');
    const { createLead } = useLeadsStore();
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setIsSubmitting(true);
        setSubmitStatus('idle');
        try {
            await createLead({
                ...formData,
                source_page: sourcePage,
                status: 'New',
            });
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                service_interest: '',
                message: '',
            });
            if (onSuccess) {
                setTimeout(onSuccess, 2000);
            }
        }
        catch (error) {
            setSubmitStatus('error');
            console.error('Failed to submit form:', error);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [submitStatus === 'success' && (_jsxs("div", { className: "p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3", children: [_jsx(CheckCircle, { className: "text-green-600 flex-shrink-0", size: 20 }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-green-900", children: "Thank you!" }), _jsx("p", { className: "text-sm text-green-700", children: "We've received your information and will be in touch soon." })] })] })), submitStatus === 'error' && (_jsxs("div", { className: "p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3", children: [_jsx(AlertCircle, { className: "text-red-600 flex-shrink-0", size: 20 }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-red-900", children: "Error" }), _jsx("p", { className: "text-sm text-red-700", children: "Failed to submit form. Please try again." })] })] })), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Name *" }), _jsx("input", { type: "text", name: "name", value: formData.name, onChange: handleChange, className: `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition ${errors.name ? 'border-red-500' : 'border-gray-300'}`, placeholder: "Your full name", disabled: isSubmitting }), errors.name && _jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.name })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Email *" }), _jsx("input", { type: "email", name: "email", value: formData.email, onChange: handleChange, className: `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`, placeholder: "your@email.com", disabled: isSubmitting }), errors.email && _jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.email })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Phone" }), _jsx("input", { type: "tel", name: "phone", value: formData.phone, onChange: handleChange, className: `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition ${errors.phone ? 'border-red-500' : 'border-gray-300'}`, placeholder: "+1 (555) 123-4567", disabled: isSubmitting }), errors.phone && _jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.phone })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Company" }), _jsx("input", { type: "text", name: "company", value: formData.company, onChange: handleChange, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition", placeholder: "Your company name", disabled: isSubmitting })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Service Interest" }), _jsxs("select", { name: "service_interest", value: formData.service_interest, onChange: handleChange, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition", disabled: isSubmitting, children: [_jsx("option", { value: "", children: "Select a service" }), _jsx("option", { value: "B2B Bolt", children: "B2B Bolt" }), _jsx("option", { value: "Bolt Runway", children: "Bolt Runway" }), _jsx("option", { value: "Bolt Guider", children: "Bolt Guider" }), _jsx("option", { value: "Brand to Fly", children: "Brand to Fly" }), _jsx("option", { value: "D2C Bolt", children: "D2C Bolt" }), _jsx("option", { value: "Scale Runway", children: "Scale Runway" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Message" }), _jsx("textarea", { name: "message", value: formData.message, onChange: handleChange, rows: 4, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition", placeholder: "Tell us about your business...", disabled: isSubmitting })] }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition", children: isSubmitting ? 'Submitting...' : 'Submit' })] }));
}
