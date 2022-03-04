import { TheMembersListProps } from './TheMembersList.props';
import { AppCard } from '../AppCard/AppCard';
import List from '@mui/material/List';
import { ListItem, ListItemButton, Pagination } from '@mui/material';
import { MembersInterface } from '../../../interfaces/members.interface';
import { useRouter } from 'next/router';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

export const TheMembersList = ({
  members,
}: TheMembersListProps): JSX.Element => {
  const MEMBERS_ON_PAGE = 5;
  console.log(members.length, 'start');

  const router = useRouter();
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
      <Typography variant="h6">Сотрудники кафедры</Typography>
      <List>
        {members &&
          computePaginatedMembers.map((member: MembersInterface) => (
            <ListItem disablePadding key={member.id}>
              <ListItemButton
                onClick={() => router.push(`/member/${member.slug}`)}
              >
                {member.fullName}
              </ListItemButton>
              <Divider />
            </ListItem>
          ))}
      </List>
      <Pagination
        count={getPaginationCount(MEMBERS_ON_PAGE)}
        page={page}
        onChange={handleChange}
      />
    </AppCard>
  );
};
