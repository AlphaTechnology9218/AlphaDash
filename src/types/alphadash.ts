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
