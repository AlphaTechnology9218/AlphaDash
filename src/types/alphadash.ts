export interface ScoreData {
  expressoEcologico1: number;
  expressoEcologico2: number;
  expressoEcologico3: number;
  expressoEcologico4: number;
  bonificacaoExpresso: number;
  reflorestamentoAzul: number;
  reflorestamentoVerde: number;
  departamentoEcologico: number;
}

export interface TimeRecord {
  id: string;
  time: number;
  date: string;
  scores: ScoreData;
}

export interface Session {
  id: string;
  name: string;
  date: string;
  scores: ScoreData;
  times: TimeRecord[];
  totalScore: number;
  maxPossibleScore: number;
  accuracyPercentage: number;
}

export const defaultScoreData: ScoreData = {
  expressoEcologico1: 0,
  expressoEcologico2: 0,
  expressoEcologico3: 0,
  expressoEcologico4: 0,
  bonificacaoExpresso: 0,
  reflorestamentoAzul: 0,
  reflorestamentoVerde: 0,
  departamentoEcologico: 0,
};

export const MAX_SCORES = {
  expressoEcologico: 55,
  bonificacaoExpresso: 50,
  reflorestamento: 75,
  departamentoEcologico: 80,
};

export const calculateTotalScore = (scores: ScoreData): number => {
  return (
    scores.expressoEcologico1 +
    scores.expressoEcologico2 +
    scores.expressoEcologico3 +
    scores.expressoEcologico4 +
    scores.bonificacaoExpresso +
    scores.reflorestamentoAzul +
    scores.reflorestamentoVerde +
    scores.departamentoEcologico
  );
};

export const calculateMaxPossibleScore = (): number => {
  return (
    MAX_SCORES.expressoEcologico * 4 +
    MAX_SCORES.bonificacaoExpresso +
    MAX_SCORES.reflorestamento * 2 +
    MAX_SCORES.departamentoEcologico
  );
};

export const calculateAccuracy = (scores: ScoreData): number => {
  const total = calculateTotalScore(scores);
  const max = calculateMaxPossibleScore();
  return Math.round((total / max) * 100);
};
