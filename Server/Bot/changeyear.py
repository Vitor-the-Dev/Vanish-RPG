import gspread
import json
import sys
scope = ["https://spreadsheets.google.com/feeds",'https://www.googleapis.com/auth/spreadsheets',"https://www.googleapis.com/auth/drive.file","https://www.googleapis.com/auth/drive"]

client = gspread.service_account("Server\Bot\service_account.json")

spreadsheet = 'testbed bf'


def changey():
    sheet = client.open(spreadsheet)

    worksheet = sheet.worksheet("Year Change Database ")
    this_year_loganomics = worksheet.get('B5:B36')
    next_year_loganomics = worksheet.get('CE5:FF36')

    worksheet.update('B5:CC1036', next_year_loganomics)

    worksheet = sheet.worksheet("Next Year equipment database")
    next_year_equipments = worksheet.get('AY11:CT402')
    worksheet.update('B11', next_year_equipments)

    worksheet = sheet.worksheet("Military")
    next_year_military = worksheet.get('H3:J35')
    worksheet.update('D3:F35', next_year_military)

    #worksheet = sheet.worksheet("Statistics")
    #next_year_statistics = worksheet.cell('B1:B72').value
    #worksheet.update(1, ((worksheet.cell('B1').value)-(worksheet.cell('C1').value)+1),next_year_statistics)

    #worksheet = sheet.worksheet("Main")
    #worksheet.update('A1', ((worksheet.cell('A1').value)+1))

    converttolist = []
    for i in this_year_loganomics:
        #Each i is a list 
        #this_Year_loganomics is a <class 'gspread.worksheet.ValueRange'>
        #we build the list converttolist to turn it into a json later        
        converttolist.append(i)
    json_string = json.dumps(converttolist)
    return json_string
#changey()

print(changey())
sys.stdout.flush()
