import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/**
 * 將資料導出為 Excel（支援欄位轉換 + 自訂檔名）
 * @param data 資料陣列
 * @param headers 欄位轉換對應：key 對應標題
 * @param fileName 匯出檔名（預設：export.xlsx）
 */
export function exportToExcel<T extends object>(
  data: T[],
  headers: Partial<Record<keyof T, string>>,
  fileName = "export.xlsx"
): void {
  // 1. 產生欄位 key 的順序與標題
  const headerKeys = Object.keys(headers) as (keyof T)[];
  const headerLabels = headerKeys.map((key) => headers[key] || (key as string));

  // 2. 轉換資料為新陣列
  const exportData = data.map((item) => {
    const row: Record<string, T[keyof T]> = {};
    headerKeys.forEach((key) => {
      row[headers[key] || (key as string)] = item[key];
    });
    return row;
  });

  // 3. 建立工作表與工作簿
  const ws = XLSX.utils.json_to_sheet(exportData, { header: headerLabels });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "sheet1");

  // 4. 匯出
  const buf = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
  saveAs(new Blob([buf], { type: "application/octet-stream" }), fileName);
}
