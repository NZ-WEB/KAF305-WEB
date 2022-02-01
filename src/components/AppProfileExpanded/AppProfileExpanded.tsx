import { AppProfileExpandedProps } from './AppProfileExpanded.props';
import { CardContent, Collapse, Typography } from '@mui/material';
import { AppPublicationCard } from '../AppPublicationCard/AppPublicationCard';
import * as React from 'react';
import { useState } from 'react';
import { TheProfileAddingPublications } from '../TheProfileAddingPublication/TheProfileAddingPublications';

export const AppProfileExpanded = ({
  expanded,
  errors,
  setErrors,
  member,
  auth,
  ...props
}: AppProfileExpandedProps): JSX.Element => {
  const [adding, setAdding] = useState<boolean>(false);

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit {...props}>
      <CardContent>
        <Typography variant={'h6'}>Публикации</Typography>
      </CardContent>

      {member.publications &&
        member.publications.map((publication) => {
          return (
            <AppPublicationCard
              errors={errors}
              setErrors={setErrors}
              auth={auth}
              publication={publication}
            />
          );
        })}

      <TheProfileAddingPublications
        adding={adding}
        setAdding={setAdding}
        auth={auth}
        errors={errors}
        setErrors={setErrors}
        member={member}
      />
    </Collapse>
  );
};
