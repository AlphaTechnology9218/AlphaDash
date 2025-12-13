import { useState, useEffect, useCallback } from "react";
import { formsAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export interface FormResponse {
  _id?: string;
  formId: string;
  responseId: string;
  timestamp: string;
  respondentEmail?: string;
  answers: Record<string, any>;
  rawData?: any;
  syncedAt: string;
}

export function useFormResponses(formId?: string) {
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadResponses = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await formsAPI.getSyncedResponses(formId);
      setResponses(data.responses || []);
    } catch (error: any) {
      console.error("Erro ao carregar respostas do Forms:", error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível carregar respostas do Forms",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [formId, toast]);

  useEffect(() => {
    loadResponses();
  }, [loadResponses]);

  const deleteResponse = useCallback(
    async (responseId: string) => {
      try {
        await formsAPI.deleteResponse(responseId);
        setResponses((prev) => prev.filter((r) => r.responseId !== responseId));
        toast({
          title: "Sucesso",
          description: "Resposta removida com sucesso",
        });
      } catch (error: any) {
        console.error("Erro ao remover resposta:", error);
        toast({
          title: "Erro",
          description: error.message || "Não foi possível remover a resposta",
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  return { responses, isLoading, loadResponses, deleteResponse };
}

