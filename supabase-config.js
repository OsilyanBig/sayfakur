// Supabase Config
const SUPABASE_URL = 'https://nbekigcpdwrnqnxesrwo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iZWtpZ2NwZHdybnFueGVzcndvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MTk1MzgsImV4cCI6MjA5Mzk5NTUzOH0._fQexs8wcvEksBqc72gxnJLcVbmLJLBYHGSjqMNE8pE';

// Supabase Client oluştur
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Oturum kontrol yardımcıları
async function getUser() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    return user;
}

async function getSession() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    return session;
}

async function signOut() {
    await supabaseClient.auth.signOut();
    window.location.href = '/';
}

// Korumalı sayfa kontrolü (dashboard vb.)
async function requireAuth() {
    const user = await getUser();
    if (!user) {
        window.location.href = '/giris.html';
        return null;
    }
    return user;
}

// Giriş yapmışsa yönlendir (kayıt/giriş sayfalarında)
async function redirectIfLoggedIn() {
    const user = await getUser();
    if (user) {
        window.location.href = '/dashboard.html';
    }
}
