import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
export const useLeadsStore = create((set) => ({
    leads: [],
    isLoading: false,
    error: null,
    fetchLeads: async () => {
        try {
            set({ isLoading: true, error: null });
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false });
            if (error)
                throw error;
            set({ leads: data || [] });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to fetch leads';
            set({ error: message });
        }
        finally {
            set({ isLoading: false });
        }
    },
    createLead: async (lead) => {
        try {
            set({ error: null });
            const { data, error } = await supabase
                .from('leads')
                .insert([lead])
                .select()
                .maybeSingle();
            if (error)
                throw error;
            if (!data)
                throw new Error('Failed to create lead');
            set((state) => ({ leads: [data, ...state.leads] }));
            return data;
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create lead';
            set({ error: message });
            throw error;
        }
    },
    updateLead: async (id, updates) => {
        try {
            set({ error: null });
            const { error } = await supabase
                .from('leads')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', id);
            if (error)
                throw error;
            set((state) => ({
                leads: state.leads.map((l) => (l.id === id ? { ...l, ...updates } : l)),
            }));
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to update lead';
            set({ error: message });
            throw error;
        }
    },
    deleteLead: async (id) => {
        try {
            set({ error: null });
            const { error } = await supabase
                .from('leads')
                .delete()
                .eq('id', id);
            if (error)
                throw error;
            set((state) => ({
                leads: state.leads.filter((l) => l.id !== id),
            }));
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to delete lead';
            set({ error: message });
            throw error;
        }
    },
}));
