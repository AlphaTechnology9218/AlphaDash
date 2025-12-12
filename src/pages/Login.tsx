import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
<<<<<<< HEAD
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authAPI } from "@/lib/api";
=======
import { Leaf, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
>>>>>>> 080ccb36f7e52678ca30626daa71d3fa742913fc

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
<<<<<<< HEAD
    try {
      await authAPI.login(email, password);
      toast({
        title: "Login realizado!",
        description: "Bem-vindo de volta!",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: error.message || "Não foi possível fazer login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
=======
    // TODO: Implementar lógica de autenticação
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login realizado!",
        description: "Bem-vindo de volta ao AlphaDash.",
      });
      navigate("/");
    }, 1000);
>>>>>>> 080ccb36f7e52678ca30626daa71d3fa742913fc
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="glass-card p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="section-icon mb-4">
              <Leaf className="w-8 h-8" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">AlphaDash</h1>
            <p className="text-muted-foreground text-sm mt-1">Entre na sua conta</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

<<<<<<< HEAD
            <div className="flex items-center justify-between">
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
=======
            <div className="flex justify-end">
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:text-primary/80 transition-colors"
>>>>>>> 080ccb36f7e52678ca30626daa71d3fa742913fc
              >
                Esqueceu a senha?
              </Link>
            </div>

<<<<<<< HEAD
            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
=======
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
>>>>>>> 080ccb36f7e52678ca30626daa71d3fa742913fc
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{" "}
<<<<<<< HEAD
              <Link 
                to="/signup" 
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
=======
              <Link to="/signup" className="text-primary hover:text-primary/80 font-medium transition-colors">
>>>>>>> 080ccb36f7e52678ca30626daa71d3fa742913fc
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
<<<<<<< HEAD

=======
>>>>>>> 080ccb36f7e52678ca30626daa71d3fa742913fc
