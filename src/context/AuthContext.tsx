import { jwtDecode } from "jwt-decode";
import {
    createContext,
    type ReactNode,
    useContext,
    useEffect,
    useState
} from "react";

type User = {
    nombre: string;
    rol: string;
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (data: LoginData) => Promise<void>;
    logout: () => void;
};

interface LoginData {
    correoElectronico: string;
    contrasena: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (token) {
            const decoded: any = jwtDecode(token);
            setUser({
                nombre: decoded.sub,
                rol: decoded.rol,
            });
        }
    }, [token]);

    const login = async ({ correoElectronico, contrasena }: LoginData) => {
        const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ correoElectronico, contrasena }), // ✅ ahora sí existen
        });

        if (!res.ok) throw new Error("Credenciales inválidas");

        const json = await res.json();
        localStorage.setItem("token", json.token);
        setToken(json.token);
    };


    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};
