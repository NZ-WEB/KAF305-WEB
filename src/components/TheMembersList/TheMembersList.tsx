import { TheMembersListProps } from './TheMembersList.props';
import {
  Avatar,
  ListItem,
  ListItemButton,
  Pagination,
  Typography,
} from '@mui/material';
import { MembersInterface } from '../../../interfaces/members.interface';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const TheMembersList = ({
  members,
}: TheMembersListProps): JSX.Element => {
  const MEMBERS_ON_PAGE = 5;
  const [page, setPage] = useState(1);

  const [computePaginatedMembers, setComputePaginatedMembers] = useState([]);

  const getPaginationCount = (membersOnPage) => {
    return Math.round(members.length / membersOnPage);
  };

  const handleChange = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    const startMembersList = [...members];
    startMembersList.length = MEMBERS_ON_PAGE;
    setComputePaginatedMembers(startMembersList);
  }, [members]);

  useEffect(() => {
    setComputePaginatedMembers(
      members.slice(MEMBERS_ON_PAGE * (page - 1)).slice(0, MEMBERS_ON_PAGE),
    );
  }, [page]);

  return (
    <>
      <Typography variant="h6">Сотрудники кафедры</Typography>
      {members ? (
        <>
          <List>
            {computePaginatedMembers.map((member: MembersInterface) => (
              <ListItem key={member.id} sx={{ padding: '0' }}>
                <Link href={`/member/${member.slug}`} key={member.id}>
                  <ListItemButton>
                    <Avatar alt={member.fullName} src={member.avatar} />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        marginLeft: '1em',
                      }}
                    >
                      <Typography variant="subtitle1">
                        {member.fullName}
                      </Typography>
                      <Typography variant="caption">{member.post}</Typography>
                    </Box>
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Pagination
            count={getPaginationCount(MEMBERS_ON_PAGE)}
            page={page}
            onChange={handleChange}
          />
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
