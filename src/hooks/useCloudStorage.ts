import { useState, useEffect, useCallback } from "react";
import { dataAPI } from "@/lib/api";
import { ScoreData, TimeRecord, Session, defaultScoreData } from "@/types/alphadash";
import { useToast } from "@/hooks/use-toast";

// Hook para scores
export function useCloudScores() {
  const [scores, setScores] = useState<ScoreData>(defaultScoreData);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadScores = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await dataAPI.getScores();
      // Remover campos do MongoDB que não são parte do ScoreData
      const { userId, _id, __v, createdAt, updatedAt, ...scoreData } = data;
      setScores(scoreData as ScoreData);
    } catch (error) {
      console.error("Erro ao carregar scores:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os scores da nuvem",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const updateScores = useCallback(
    async (newScores: ScoreData | ((prev: ScoreData) => ScoreData)) => {
      try {
        const scoresToUpdate =
          typeof newScores === "function" ? newScores(scores) : newScores;
        setScores(scoresToUpdate);
        await dataAPI.updateScores(scoresToUpdate);
      } catch (error) {
        console.error("Erro ao atualizar scores:", error);
        toast({
          title: "Erro",
          description: "Não foi possível salvar os scores na nuvem",
          variant: "destructive",
        });
        // Reverter em caso de erro
        loadScores();
      }
    },
    [scores, toast, loadScores]
  );

  useEffect(() => {
    loadScores();
  }, [loadScores]);

  return [scores, updateScores, isLoading] as const;
}

// Hook para time records
export function useCloudTimes() {
  const [times, setTimes] = useState<TimeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadTimes = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await dataAPI.getTimes();
      // Converter para formato TimeRecord (remover campos MongoDB)
      const formattedTimes = data.map((t: any) => ({
        id: t.id || t._id,
        time: t.time,
        date: t.date,
        scores: t.scores,
      }));
      setTimes(formattedTimes);
    } catch (error) {
      console.error("Erro ao carregar times:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os times da nuvem",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const addTime = useCallback(
    async (timeRecord: TimeRecord) => {
      try {
        setTimes((prev) => [timeRecord, ...prev]);
        await dataAPI.createTime(timeRecord);
      } catch (error) {
        console.error("Erro ao salvar time:", error);
        toast({
          title: "Erro",
          description: "Não foi possível salvar o time na nuvem",
          variant: "destructive",
        });
        loadTimes();
      }
    },
    [toast, loadTimes]
  );

  const deleteTime = useCallback(
    async (id: string) => {
      try {
        setTimes((prev) => prev.filter((t) => t.id !== id));
        await dataAPI.deleteTime(id);
      } catch (error) {
        console.error("Erro ao deletar time:", error);
        toast({
          title: "Erro",
          description: "Não foi possível deletar o time",
          variant: "destructive",
        });
        loadTimes();
      }
    },
    [toast, loadTimes]
  );

  useEffect(() => {
    loadTimes();
  }, [loadTimes]);

  return [times, addTime, deleteTime, isLoading] as const;
}

// Hook para sessions
export function useCloudSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadSessions = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await dataAPI.getSessions();
      // Converter para formato Session (remover campos MongoDB)
      const formattedSessions = data.map((s: any) => ({
        id: s._id || s.id,
        name: s.name,
        date: s.date,
        scores: s.scores,
        times: s.times || [],
        totalScore: s.totalScore,
        maxPossibleScore: s.maxPossibleScore,
        accuracyPercentage: s.accuracyPercentage,
      }));
      setSessions(formattedSessions);
    } catch (error) {
      console.error("Erro ao carregar sessions:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as sessões da nuvem",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const addSession = useCallback(
    async (session: Session) => {
      try {
        setSessions((prev) => [session, ...prev]);
        await dataAPI.createSession(session);
      } catch (error) {
        console.error("Erro ao salvar session:", error);
        toast({
          title: "Erro",
          description: "Não foi possível salvar a sessão na nuvem",
          variant: "destructive",
        });
        loadSessions();
      }
    },
    [toast, loadSessions]
  );

  const deleteSession = useCallback(
    async (id: string) => {
      try {
        setSessions((prev) => prev.filter((s) => s.id !== id));
        await dataAPI.deleteSession(id);
      } catch (error) {
        console.error("Erro ao deletar session:", error);
        toast({
          title: "Erro",
          description: "Não foi possível deletar a sessão",
          variant: "destructive",
        });
        loadSessions();
      }
    },
    [toast, loadSessions]
  );

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  return [sessions, addSession, deleteSession, isLoading] as const;
}

