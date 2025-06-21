import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportToExcel<T extends object>(
  data: T[],
  headers: Partial<Record<keyof T, string>>,
  fileName = "export.xlsx"
): void {
  const headerKeys = Object.keys(headers) as (keyof T)[];
  const headerLabels = headerKeys.map((key) => headers[key] || (key as string));

  const exportData = data.map((item) => {
    const row: Record<string, T[keyof T]> = {};
    headerKeys.forEach((key) => {
      row[headers[key] || (key as string)] = item[key];
    });
    return row;
  });

  const ws = XLSX.utils.json_to_sheet(exportData, { header: headerLabels });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "sheet1");

  const buf = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
  saveAs(new Blob([buf], { type: "application/octet-stream" }), fileName);
}
