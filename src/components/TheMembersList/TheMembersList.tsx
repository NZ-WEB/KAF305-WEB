import { TheMembersListProps } from './TheMembersList.props';
import { AppCard } from '../AppCard/AppCard';
import {
  CardActions,
  CardContent,
  ListItem,
  ListItemButton,
  Pagination,
  Typography,
} from '@mui/material';
import { MembersInterface } from '../../../interfaces/members.interface';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import List from '@mui/material/List';

export const TheMembersList = ({
  members,
}: TheMembersListProps): JSX.Element => {
  const MEMBERS_ON_PAGE = 5;
  console.log(members.length, 'start');

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
    <AppCard>
      <CardContent>
        <Typography variant="h6" paddingBottom="1em">
          Сотрудники кафедры
        </Typography>
        <List>
          {members &&
            computePaginatedMembers.map((member: MembersInterface) => (
              <ListItem sx={{ padding: '0' }}>
                <Link href={`/member/${member.slug}`} key={member.id}>
                  <ListItemButton>{member.fullName}</ListItemButton>
                </Link>
              </ListItem>
            ))}
        </List>
      </CardContent>
      <CardActions>
        <Pagination
          count={getPaginationCount(MEMBERS_ON_PAGE)}
          page={page}
          onChange={handleChange}
        />
      </CardActions>
    </AppCard>
  );
};
