import * as React from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { AppModalProps } from './AppModal.props';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(80px);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: '50wh',
  bgcolor: 'background.paper',
  border: 'none',
  p: 2,
  px: 4,
  pb: 3,
};

export const AppModal = ({
  title,
  subtitle,
  withButton = false,
  btnText,
  handle,
  icon = false,
}: AppModalProps): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    handle();
    handleClose();
  };

  return (
    <div>
      {icon ? (
        <IconButton onClick={handleOpen}>
          <DeleteIcon />
        </IconButton>
      ) : (
        <Button type="button" variant="contained" onClick={handleOpen}>
          {btnText}
        </Button>
      )}

      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <h2 id="unstyled-modal-title">{title}</h2>
          <p id="unstyled-modal-description">{subtitle}</p>
          {withButton && (
            <Button onClick={() => handleClick()} type="button">
              {btnText}
            </Button>
          )}
        </Box>
      </StyledModal>
    </div>
  );
};
