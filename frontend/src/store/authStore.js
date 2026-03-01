import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
export const useAuthStore = create((set) => ({
    user: null,
    isLoading: true,
    isAdmin: false,
    error: null,
    signUp: async (email, password) => {
        try {
            set({ error: null });
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error)
                throw error;
            set({ user: data.user });
        }
        catch (error) {
            set({ error: error instanceof Error ? error.message : 'Sign up failed' });
            throw error;
        }
    },
    signIn: async (email, password) => {
        try {
            set({ error: null });
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error)
                throw error;
            set({ user: data.user });
        }
        catch (error) {
            set({ error: error instanceof Error ? error.message : 'Sign in failed' });
            throw error;
        }
    },
    signOut: async () => {
        try {
            set({ error: null });
            const { error } = await supabase.auth.signOut();
            if (error)
                throw error;
            set({ user: null, isAdmin: false });
        }
        catch (error) {
            set({ error: error instanceof Error ? error.message : 'Sign out failed' });
            throw error;
        }
    },
    checkAuth: async () => {
        try {
            set({ isLoading: true });
            const { data, error } = await supabase.auth.getSession();
            if (error)
                throw error;
            if (data.session?.user) {
                set({ user: data.session.user, isAdmin: data.session.user.email?.endsWith('@founderplane.com') ?? false });
            }
            else {
                set({ user: null, isAdmin: false });
            }
        }
        catch (error) {
            set({ error: error instanceof Error ? error.message : 'Auth check failed' });
        }
        finally {
            set({ isLoading: false });
        }
    },
}));
