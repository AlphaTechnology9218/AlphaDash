import { Settings, Palette, Info, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "@/hooks/use-toast";

export function SettingsView() {
  const [, setScores] = useLocalStorage("alphadash-scores", null);
  const [, setTimes] = useLocalStorage("alphadash-times", null);
  const [, setSessions] = useLocalStorage("alphadash-sessions", null);

  const clearAllData = () => {
    localStorage.removeItem("alphadash-scores");
    localStorage.removeItem("alphadash-times");
    localStorage.removeItem("alphadash-sessions");
    window.location.reload();
    toast({
      title: "Dados limpos",
      description: "Todos os dados foram removidos com sucesso.",
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="section-header">
        <div className="section-icon">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Configurações
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie suas preferências
          </p>
        </div>
      </div>

      {/* App Info */}
      <div className="glass-card p-5 animate-slide-up">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-info/15 flex items-center justify-center">
            <Info className="w-5 h-5 text-info" />
          </div>
          <div>
            <h2 className="font-display font-bold text-foreground">
              Sobre o AlphaDash
            </h2>
            <p className="text-sm text-muted-foreground">Versão 1.0.0</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          AlphaDash é uma aplicação de pontuação ecológica desenvolvida para acompanhar 
          e registrar métricas de sustentabilidade. Acompanhe seus pontos em diferentes 
          categorias, registre tempos e visualize sua evolução através de gráficos interativos.
        </p>
      </div>

      {/* Theme Info */}
      <div className="glass-card p-5 animate-slide-up delay-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <Palette className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display font-bold text-foreground">
              Tema
            </h2>
            <p className="text-sm text-muted-foreground">Cores do aplicativo</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full gradient-primary" />
            <span className="text-sm text-muted-foreground">Verde (Principal)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full gradient-accent" />
            <span className="text-sm text-muted-foreground">Laranja (Destaque)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full gradient-info" />
            <span className="text-sm text-muted-foreground">Azul (Info)</span>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass-card p-5 border-destructive/30 animate-slide-up delay-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-destructive/15 flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h2 className="font-display font-bold text-foreground">
              Zona de Perigo
            </h2>
            <p className="text-sm text-muted-foreground">Ações irreversíveis</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Limpar todos os dados irá remover todas as sessões, tempos e pontuações salvos. 
          Esta ação não pode ser desfeita.
        </p>
        <Button
          variant="destructive"
          size="sm"
          onClick={clearAllData}
        >
          <Trash2 className="w-4 h-4" />
          Limpar Todos os Dados
        </Button>
      </div>
    </div>
  );
}
