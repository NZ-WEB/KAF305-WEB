import { TheMembersTableProps } from './TheMembersTable.props';
import { Button, Card, CardContent } from '@mui/material';
import { DataGrid, GridApi, GridCellValue, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import { MembersInterface } from '../../../interfaces/members.interface';

export const TheMembersTable = ({
  members,
  ...props
}: TheMembersTableProps): JSX.Element => {
  const router = useRouter();

  if (members.length === 0) {
    return <Typography>Загрузка...</Typography>;
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 20,
    },
    {
      field: 'fullName',
      headerName: 'Ф.И.О.',
      width: 280,
    },
    { field: 'post', headerName: 'Должность', width: 130 },
    {
      field: 'btn',
      headerName: '',
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();

          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );

          const [{ slug }] = members.filter(
            (member: MembersInterface) => member.id === thisRow.id,
          );

          return router.push(`/member/${slug}`);
        };

        return <Button onClick={onClick}>Профиль</Button>;
      },
    },
  ];

  const rows = [];

  members.forEach((member: MembersInterface) => {
    rows.push({
      id: member.id,
      fullName: member.fullName,
      post: member.post,
      slug: member.slug,
    });
  });

  return (
    <Card {...props}>
      <CardContent>
        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight={true}
            autoPageSize={true}
            isRowSelectable={() => false}
          />
        </div>
      </CardContent>
    </Card>
  );
};
