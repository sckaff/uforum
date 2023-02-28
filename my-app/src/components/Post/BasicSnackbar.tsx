import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SnackbarNotification(props: any) {

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={props.hide}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

    return (
        <div>
            <Snackbar
                data-cy="popup"
                open={props.open}
                onClose={props.hide}
                message={props.message}
                autoHideDuration={4000}
                action={action}
            />
        </div>
    )
}