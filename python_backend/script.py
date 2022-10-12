from openpyxl import Workbook
from openpyxl.styles import Font
import xml.etree.ElementTree as ET
import urllib.request

# RUN THIS COMMAND TO INSTALL openpyxl BEFORE RUNNING THIS SCRIPT
# $ pip install openpyxl

# GET XML API
url = 'http://127.0.0.1:8000/'
response = urllib.request.urlopen(url).read()
tree = ET.fromstring(response)
students = tree.findall('student')


# CREATE WORKBOOK AND HEADER
work_book = Workbook()
work_sheet = work_book.active
work_sheet.title = "Students"

# WRITE HEADER
work_sheet['A1'] = 'ID'
work_sheet['B1'] = 'STUDENT_ID'
work_sheet['C1'] = 'FIRST_NAME'
work_sheet['D1'] = 'LAST_NAME'
work_sheet['E1'] = 'EMAIL'
work_sheet['F1'] = 'DATE_OF_BIRTH'
work_sheet['G1'] = 'BIRTH_PLACE'
work_sheet['H1'] = 'FINAL_GRADE'
for char in range(ord('A'), ord('H') + 1):
    work_sheet[chr(char) + '1'].font = Font(bold=True)


# READ FROM XML TO XLSX
row_index = 2
for student in students:
    work_sheet['A' + str(row_index)] = student.attrib['id']
    work_sheet['B' + str(row_index)] = student.find('student_id').text
    work_sheet['C' + str(row_index)] = student.find('first_name').text
    work_sheet['D' + str(row_index)] = student.find('last_name').text
    work_sheet['E' + str(row_index)] = student.find('email').text
    work_sheet['F' + str(row_index)] = student.find('date_of_birth').text
    work_sheet['G' + str(row_index)] = student.find('birth_place').text
    work_sheet['H' + str(row_index)] = student.find('final_grade').text
    row_index += 1
    
work_book.save(filename="Students.xlsx")
print(">>> SCRIPT RUNNING COMPLETE...")
