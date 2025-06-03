# Google Docs Merge Script

This Google Apps Script reads data from a Google Sheet, duplicates a Google Docs template for each row, replaces placeholders in the template with the row's values, and saves the generated documents into a specified Google Drive folder.

## Setup Instructions

### Step 1: Prepare Your Spreadsheet

- The **first row** should contain column headers (these will be used as placeholders).
- Each subsequent row should represent a unique record (e.g., one client per row).

### Step 2: Create Your Template Doc

- Insert placeholders into your Google Doc using the same names as your spreadsheet headers.
- Wrap placeholders with double curly braces. Example:
  - `{{Client Name}}`
  - `{{Client's Point of Contact Email}}`

### Step 3: Set Up the Script

- Open the [Google Apps Script editor](https://script.google.com/) and paste in the provided script.
- In the `runDocumentMerge()` function, replace the following:
  - `SHEET_ID` → Your spreadsheet ID
  - `SHEET_NAME` → The name of the tab (e.g., `Sheet1`)
  - `TEMPLATE_DOC_ID` → The ID of your template Google Doc
  - `TARGET_FOLDER_ID` → The ID of the Drive folder where new docs will be saved

### Step 4: Run It

- In the script editor, select `runDocumentMerge` from the dropdown.
- Click the Run button.
- Authorize the script if prompted.

## Notes

- Placeholder text in the Google Doc must match spreadsheet header names **exactly** (including case and spacing).
- The template must be a **Google Docs** file.
- Ensure that the script has permission to access the source Sheet, template Doc, and target Drive folder.

