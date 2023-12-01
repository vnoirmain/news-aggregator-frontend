import { useAuth } from "hooks/useAuth";
import Navigation from "components/Navigation";
import { useState } from "react";

export default function Login() {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async () => {
        if (email && password) {
            try {
                await login(email, password);
            } catch (error) {
                
            }
        }
    }
    return (
        <>
            <h2>Login</h2>

            <Navigation />

            <div className="flex flex-col gap-5">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />

                <button type="button" onClick={onSubmit}>Sign In</button>
            </div>
        </>
    )
}