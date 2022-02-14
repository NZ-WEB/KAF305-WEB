import { AppSideBarListItemProps } from './AppSideBarListItem.props';
import { Collapse, ListItemButton } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import PeopleIcon from '@mui/icons-material/People';
import ListItemText from '@mui/material/ListItemText';
import { ExpandLess } from '@mui/icons-material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const AppSideBarListItem = ({
  title,
  route,
  expanding = false,
  children,
  ...props
}: AppSideBarListItemProps): JSX.Element => {
  const router = useRouter();
  const [collapseIsOpened, setCollapseIsOpened] = useState<boolean>(false);

  const handleClick = () => {
    setCollapseIsOpened(!collapseIsOpened);
  };

  if (expanding) {
    return (
      <>
        <ListItemButton onClick={handleClick} {...props}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary={title} />
          {collapseIsOpened ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={collapseIsOpened} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      </>
    );
  } else {
    return (
      <ListItemButton
        onClick={() => router.push(route)}
        sx={{ pl: 4 }}
        {...props}
      >
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    );
  }
};

export default AppSideBarListItem;
