import { Button } from '@mui/material'
import React from 'react'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

function JsonToCsv({mealData}) {
    const fileType = 'xlsx';

    const exportToCSV = () =>{
        const ws = XLSX.utils.json_to_sheet(mealData);
        const wb = {Sheets:{data:ws}, SheetNames:["data"]};
        const excelBuffer = XLSX.write(wb, {bookType:"xlsx", type:"array"});
        const data = new Blob([excelBuffer], {type:fileType});
        FileSaver.saveAs(data, "myfile"+".xlsx")
    }
  return (
    <div>
        <Button onClick={exportToCSV}>Download</Button>
    </div>
  )
}

export default JsonToCsv