import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material'
import { HeroForm } from '..'



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'comics_appeared_in', headerName: 'Price', width: 130 },
    { field: 'name', headerName: 'Hero Name', width: 130 },
    {
      field: 'cost_of_production',
      headerName: 'Production cost',
      type: 'number',
      width: 140,
    },
    {
      field: 'series',
      headerName: 'Series',
      description: 'Series',
      sortable: false,
      width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
  ];

interface gridData {
    data: {
        id?: string;
    }
}

    export const DataTable = () => {
        let { heroData, getData } = useGetData();
        let [open, setOpen] = useState(false);
        let [gridData, setData] = useState<GridSelectionModel>([])
    let handleOpen = () => {
        setOpen(true)
    }

    let handleClose = () => {
        setOpen(false)
    }

    let deleteData = async () => {
        await server_calls.delete(`${gridData[0]}`)
        getData()
    }

    console.log(gridData) // a list of id's from checked rows

        return (
            <div style={{ height: 400, width: '100%' }}>
            <h2>Heroes In Inventory</h2>
            <DataGrid 
                            rows={heroData} 
                            columns={columns} 
                            pageSize={5} 
                            checkboxSelection 
                            onSelectionModelChange = {(newSelectionModel) => {setData(newSelectionModel);}}
                            {...heroData}  
                        />

            <Button onClick={handleOpen}>Update</Button>
            <Button variant="contained" color="error" onClick={deleteData}>Delete</Button>

            {/*Dialog Pop Up begin */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update A Hero</DialogTitle>
            <DialogContent>
                <DialogContentText>Hero: {gridData[0]}</DialogContentText>
                <HeroForm id={`${gridData[0]}`}/>
            </DialogContent>
            <DialogActions>
                <Button onClick = {handleClose} color="primary">Cancel</Button>
                <Button onClick={handleClose} color = "primary">Done</Button> 
            </DialogActions>
            </Dialog>
            </div>
        );
}