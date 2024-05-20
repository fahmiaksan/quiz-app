import { Route, Navigate } from 'react-router-dom';

// Custom Route untuk mengatur akses terhadap rute yang dilindungi
export const ProtectedRoute = ({ path, element }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Cek apakah user sudah login
  if (!user) {
    // Jika belum login, redirect ke halaman login
    return <Navigate to="/login" />;
  }

  // Cek jika user mencoba mengakses halaman login atau halaman beranda
  if (path === '/login' || path === '/') {
    // Jika user sudah login dan mencoba mengakses halaman login atau beranda, redirect ke /quiz
    return <Navigate to="/quiz" />;
  }

  // Jika user sudah login dan mencoba mengakses rute lain, izinkan akses
  return <Route path={path} element={element} />;
};

// Custom Route untuk mengatur akses terhadap halaman /quiz
export const QuizRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Cek apakah user sudah login
  if (!user) {
    // Jika belum login, redirect ke halaman login
    return <Navigate to="/login" />;
  }

  // Izinkan akses ke halaman /quiz
  return <Route element={element} />;
};

