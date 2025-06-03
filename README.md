Step 1: Prepare Your Spreadsheet
First row = column headers (these become your placeholders).
Each following row = a unique record (e.g., a client).
--
Step 2: Create Your Template Doc
Insert placeholders that match headers exactly, wrapped in {{ }}.
E.g., {{Client Name}}, {{Client's Point of Contact Email}}.
--
Step 3: Set Up the Script
In Google Apps Script, paste the generalized script above.
Replace the following in runDocumentMerge():
SHEET_ID → Your spreadsheet ID.
SHEET_NAME → Tab name (e.g., Sheet1).
TEMPLATE_DOC_ID → The Doc template ID.
TARGET_FOLDER_ID → Folder ID to save new docs.
--
Step 4: Run It
Select runDocumentMerge from the dropdown in the Apps Script editor.
Hit ▶️ Run.
Authorize the script if prompted.
--
Notes:
Placeholders must match the header names exactly (case and spacing).
Ensure your template file is a Google Doc, and all destination folders are accessible.
