import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error('Credenciais inválidas');
            }

            const { token } = await res.json();
            setErrorMessage('');
            localStorage.setItem('token', token); 
            router.push('/home'); 
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('Ocorreu um erro desconhecido');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="w-full h-full bg-white grid grid-cols-2">
            <section className="flex items-center justify-center bg-gray-100 p-8">
                <div className="w-full max-w-md">
                    <h1
                        className="text-2xl font-bold mb-4"
                        style={{ fontFamily: 'Libre Caslon Text, serif' }}
                    >
                        Bem-vindo!
                    </h1>
                    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            label="Senha"
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" variant="default" disabled={isLoading}>
                            {isLoading ? 'Carregando...' : 'ENTRAR'}
                        </Button>
                    </form>
                    {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                </div>
            </section>
            <section className="flex items-center justify-center bg-amber-900">
                <div>
                    <h2
                        className="text-xl text-white"
                        style={{ fontFamily: 'Libre Caslon Text, serif' }}
                    >
                        Imagem ou Banner Aqui
                    </h2>
                </div>
            </section>
        </main>
    );
}
