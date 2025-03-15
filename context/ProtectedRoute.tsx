import { Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();

    if (loading) return null; // Kullanıcı durumu yüklenirken bekle

    if (!user) {
        return <Redirect href="/Login" />; // Kullanıcı giriş yapmadıysa Login sayfasına yönlendir
    }

    return <>{children}</>; // Giriş yapıldıysa sekmeleri göster
};

export default ProtectedRoute;
