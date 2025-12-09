import { ScoreData, Session, TimeRecord, calculateTotalScore, calculateMaxPossibleScore, calculateAccuracy } from "@/types/alphadash";

// Export data to CSV format
export function exportToCSV(sessions: Session[], savedTimes: TimeRecord[]): void {
  const headers = [
    "Nome da Sessão",
    "Data",
    "Expresso 1",
    "Expresso 2",
    "Expresso 3",
    "Expresso 4",
    "Bonificação",
    "Refl. Azul",
    "Refl. Verde",
    "Departamento",
    "Total",
    "Máximo",
    "Acerto %"
  ];

  const rows = sessions.map((session) => [
    session.name,
    session.date,
    session.scores.expressoEcologico1,
    session.scores.expressoEcologico2,
    session.scores.expressoEcologico3,
    session.scores.expressoEcologico4,
    session.scores.bonificacaoExpresso,
    session.scores.reflorestamentoAzul,
    session.scores.reflorestamentoVerde,
    session.scores.departamentoEcologico,
    session.totalScore,
    session.maxPossibleScore,
    session.accuracyPercentage
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(","))
  ].join("\n");

  downloadFile(csvContent, "alphadash-sessoes.csv", "text/csv");
}

// Export data to JSON format
export function exportToJSON(sessions: Session[], savedTimes: TimeRecord[], currentScores?: ScoreData): void {
  const data = {
    exportDate: new Date().toISOString(),
    currentSession: currentScores ? {
      scores: currentScores,
      totalScore: calculateTotalScore(currentScores),
      maxPossibleScore: calculateMaxPossibleScore(),
      accuracyPercentage: calculateAccuracy(currentScores)
    } : null,
    sessions,
    savedTimes
  };

  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, "alphadash-dados.json", "application/json");
}

// Export data to Excel-compatible format (TSV that Excel can open)
export function exportToExcel(sessions: Session[], savedTimes: TimeRecord[]): void {
  const headers = [
    "Nome da Sessão",
    "Data",
    "Expresso 1",
    "Expresso 2",
    "Expresso 3",
    "Expresso 4",
    "Bonificação",
    "Refl. Azul",
    "Refl. Verde",
    "Departamento",
    "Total",
    "Máximo",
    "Acerto %"
  ];

  const rows = sessions.map((session) => [
    session.name,
    session.date,
    session.scores.expressoEcologico1,
    session.scores.expressoEcologico2,
    session.scores.expressoEcologico3,
    session.scores.expressoEcologico4,
    session.scores.bonificacaoExpresso,
    session.scores.reflorestamentoAzul,
    session.scores.reflorestamentoVerde,
    session.scores.departamentoEcologico,
    session.totalScore,
    session.maxPossibleScore,
    session.accuracyPercentage
  ]);

  // Create XML spreadsheet format for better Excel compatibility
  const xmlContent = generateExcelXML(headers, rows);
  downloadFile(xmlContent, "alphadash-sessoes.xls", "application/vnd.ms-excel");
}

function generateExcelXML(headers: string[], rows: (string | number)[][]): string {
  const headerCells = headers.map(h => `<Cell><Data ss:Type="String">${h}</Data></Cell>`).join("");
  const dataRows = rows.map(row => {
    const cells = row.map((cell, i) => {
      const type = typeof cell === "number" ? "Number" : "String";
      return `<Cell><Data ss:Type="${type}">${cell}</Data></Cell>`;
    }).join("");
    return `<Row>${cells}</Row>`;
  }).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Worksheet ss:Name="AlphaDash">
<Table>
<Row>${headerCells}</Row>
${dataRows}
</Table>
</Worksheet>
</Workbook>`;
}

// Export times separately
export function exportTimesToCSV(savedTimes: TimeRecord[]): void {
  const headers = ["ID", "Data", "Tempo (ms)", "Tempo Formatado", "Pontuação Total"];
  
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  const rows = savedTimes.map((record) => [
    record.id,
    record.date,
    record.time,
    formatTime(record.time),
    calculateTotalScore(record.scores)
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(","))
  ].join("\n");

  downloadFile(csvContent, "alphadash-tempos.csv", "text/csv");
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
