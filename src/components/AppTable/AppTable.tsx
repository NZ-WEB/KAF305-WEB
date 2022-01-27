import {AppTableProps} from "./AppTable.props";
import {DataGrid, GridApi, GridCellValue, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {Button} from "@mui/material";
import {useRouter} from "next/router";

export const AppTable = ({members}: AppTableProps): JSX.Element => {
    const router = useRouter();

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 20
        },
        {
            field: 'fullName',
            headerName: 'Ф.И.О.',
            width: 280,
        },
        {field: 'post', headerName: 'Должность', width: 130},
        {
            field: 'btn',
            headerName: '',
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking

                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridCellValue> = {};

                    api
                        .getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach(
                            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                        );

                    const [{slug}] = members.filter((member) => member.id === thisRow.id);


                    return router.push(`/member/${slug}`);
                };

                return <Button onClick={onClick}>Профиль</Button>;
            }
        }
    ];

    const rows = [];
    members.forEach((member) => {
       rows.push({
           id: member.id,
           fullName: member.fullName,
           post: member.post,
           slug: member.slug
       }) ;
    });

    return (
        <div style={{padding: "0px 10px", height: "400px", color: "#fff!important"}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                isRowSelectable={() => false}

                sx={{
                    color: "#fff",
                    border: "none",
                    "& .MuiDataGrid-cell:focus-within": {
                        outline: "none"
                    },
                    "& .MuiDataGrid-columnHeader:focus" : {
                        outline: "none"
                    },
                    "& .MuiSvgIcon-root ": {
                      display: "none"
                    },
                    "& .MuiDataGrid-cell:focus": {
                        outline: "none"
                    },
                    "& .MuiDataGrid-footerContainer": {
                        color: "#fff",
                        "& .MuiTablePagination-root": {
                            color: "#fff",
                            "svg": {
                                fill: "#fff"
                            }
                        }
                    }
                }}
                localeText={{}}
            />
        </div>
    );
};