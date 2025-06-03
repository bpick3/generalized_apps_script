function getAllSheetData(sheetId, sheetName) {
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  var numRows = sheet.getLastRow() - 1; // Exclude header
  return sheet.getRange(2, 1, numRows, sheet.getLastColumn()).getValues();
}

function createPDFfromTemplate(data, headers, templateDocId, targetFolderId) {
  var fileName = data[0] + " - PDF Output";
  var templateCopy = DriveApp.getFileById(templateDocId).makeCopy(fileName);
  var docId = templateCopy.getId();
  var doc = DocumentApp.openById(docId);
  var body = doc.getBody();

  // Replace placeholders
  headers.forEach(function(header, i) {
    body.replaceText('{{' + header + '}}', data[i]);
  });

  doc.saveAndClose();

  // Export the doc as PDF
  var pdfBlob = DriveApp.getFileById(docId).getAs(MimeType.PDF);
  pdfBlob.setName(fileName + ".pdf");

  // Save the PDF to the target folder
  DriveApp.getFolderById(targetFolderId).createFile(pdfBlob);

  // Optional: Delete the intermediate Google Doc
  DriveApp.getFileById(docId).setTrashed(true);
}

function runDocumentMerge() {
  const SHEET_ID = 'YOUR_SHEET_ID_HERE';
  const SHEET_NAME = 'Sheet1';
  const TEMPLATE_DOC_ID = 'YOUR_TEMPLATE_DOC_ID_HERE';
  const TARGET_FOLDER_ID = 'YOUR_FOLDER_ID_HERE';

  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var dataRows = getAllSheetData(SHEET_ID, SHEET_NAME);

  dataRows.forEach(function(row) {
    createPDFfromTemplate(row, headers, TEMPLATE_DOC_ID, TARGET_FOLDER_ID);
  });
}
