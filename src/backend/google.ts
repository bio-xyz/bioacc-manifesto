import type { Signer, Submission } from '@/types/google'
import Google from '@googleapis/sheets'

const SPREADSHEET_ID = import.meta.env.GOOGLE_SHEETS_SPREADSHEET_ID
//type SheetRowData = [string, string, string, string, string]

const makeClient = () => {
  const auth = new Google.auth.JWT({
    email: import.meta.env.GOOGLE_SHEETS_SERVICE_CLIENT_EMAIL,
    key: import.meta.env.GOOGLE_SHEETS_SERVICE_CLIENT_PRIVATE_KEY.replace(
      /\\n/g,
      '\n',
    ),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return Google.sheets({ version: 'v4', auth })
}

export async function appendData(submission: Submission) {
  const Sheets = makeClient()
  return Sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'submissions!A2:F',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [
        [
          submission.name,
          submission.email,
          submission.twitterHandle,
          submission.affiliation,
          new Date().toUTCString(),
          'foo ' + submission.wallet,
        ],
      ],
    },
  })
}

export async function readData(): Promise<Array<Signer>> {
  const Sheets = makeClient()

  const response = await Sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'signed!A2:D',
  })
  const rows = response.data.values
  if (!rows) return []

  return rows.map((row) => ({
    name: row[0],
    twitterHandle: row[2],
    affiliation: row[3],
  }))
}
