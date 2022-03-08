import { AppProfileExpandedProps } from './AppProfileExpanded.props';
import { CardContent, Collapse, Typography } from '@mui/material';
import { AppPublicationCard } from '../AppPublicationCard/AppPublicationCard';
import * as React from 'react';
import { useState } from 'react';
import { TheProfileAddingPublications } from '../TheProfileAddingPublication/TheProfileAddingPublications';
import { PublicationInterface } from '../../../interfaces/publication.interface';

export const AppProfileExpanded = ({
  expanded,
  errors,
  setErrors,
  member,
  auth,
  ...props
}: AppProfileExpandedProps): JSX.Element => {
  const [adding, setAdding] = useState<boolean>(false);
  const [publications, setPublications] = useState(member.publications);

  const handlePublications = (updatedPublication: PublicationInterface) => {
    const replaceIndex = publications.findIndex(
      (publication) => publication.id === updatedPublication.id,
    );
    const newState = [...publications];
    newState[replaceIndex] = updatedPublication;

    setPublications(newState);
  };

  const handleAddPublications = (newPublication: PublicationInterface) => {
    setPublications([...publications, newPublication]);
  };

  const handleDeletePublication = (
    deletedPublication: PublicationInterface,
  ) => {
    const replaceIndex = publications.findIndex(
      (p) => p.id === deletedPublication.id,
    );

    const newState = [...publications];
    newState.splice(replaceIndex, 1);

    setPublications(newState);
  };

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit {...props}>
      <CardContent>
        <Typography variant={'h6'}>
          Колличество публикаций: {publications.length}
        </Typography>
      </CardContent>

      {publications.length &&
        publications.map((publication) => {
          return (
            <AppPublicationCard
              key={publication.title}
              errors={errors}
              setErrors={setErrors}
              auth={auth}
              publication={publication}
              setPublications={handlePublications}
              setDeletePublication={handleDeletePublication}
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
        setPublications={handleAddPublications}
      />
    </Collapse>
  );
};
