import { useAuth } from "hooks/useAuth";
import Navigation from "components/Navigation";
import { useState } from "react";

export default function Register() {
    const { register } = useAuth();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async () => {
        if (email && password && name) {
            try {
                await register(email, name, password);
            } catch (error) {
                console.log(name);
            }
        }
    }
    return (
        <>
            <h2>Register</h2>
            
            <Navigation />

            <div className="flex flex-col gap-5">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />

                <button type="button" onClick={onSubmit}>Sign Up</button>
            </div>
        </>
    )
}