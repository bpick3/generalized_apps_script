/**
 * Reads all rows of data (excluding header) from a specified sheet.
 * @param {string} sheetId - The ID of the Google Sheet.
 * @param {string} sheetName - The name of the sheet/tab.
 * @return {Array[]} - 2D array of row data.
 */
function getAllSheetData(sheetId, sheetName) {
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  var numRows = sheet.getLastRow() - 1; // Exclude header
  return sheet.getRange(2, 1, numRows, sheet.getLastColumn()).getValues();
}

/**
 * Creates a new doc from template and replaces placeholders with data.
 * @param {Array} data - Array of values from a row.
 * @param {Array} headers - Array of header names to match placeholders.
 * @param {string} templateDocId - The ID of the template Google Doc.
 * @param {string} targetFolderId - The ID of the destination folder.
 */
function createDocumentFromData(data, headers, templateDocId, targetFolderId) {
  var fileName = data[0] + " - Generated Doc"; // Customize if needed
  var copy = DriveApp.getFileById(templateDocId).makeCopy(fileName, DriveApp.getFolderById(targetFolderId));
  var doc = DocumentApp.openById(copy.getId());
  var body = doc.getBody();

  headers.forEach(function(header, i) {
    body.replaceText('{{' + header + '}}', data[i]);
  });

  doc.saveAndClose();
}

/**
 * Main function to run the merge process.
 * Update these values before running:
 *  - SHEET_ID
 *  - SHEET_NAME
 *  - TEMPLATE_DOC_ID
 *  - TARGET_FOLDER_ID
 */
function runDocumentMerge() {
  const SHEET_ID = 'YOUR_SHEET_ID_HERE';
  const SHEET_NAME = 'Sheet1';
  const TEMPLATE_DOC_ID = 'YOUR_TEMPLATE_DOC_ID_HERE';
  const TARGET_FOLDER_ID = 'YOUR_FOLDER_ID_HERE';

  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var dataRows = getAllSheetData(SHEET_ID, SHEET_NAME);

  dataRows.forEach(function(row) {
    createDocumentFromData(row, headers, TEMPLATE_DOC_ID, TARGET_FOLDER_ID);
  });
}
