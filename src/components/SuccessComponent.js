import { Alert, Snackbar } from "@mui/material";

export function SuccessComponent(props) {

  const handleCloseSnackbar = (event, reason) => {

    if (reason === "clickaway") {
      return;
    }
    props.setSuccess({isSuccessful: false, successMessage: null});
  };
  return (
    <Snackbar
      open={props.success.isSuccessful}
      autoHideDuration={10000}
      onClose={handleCloseSnackbar}
      sx={{ width: "100%" }}
      anchorOrigin={{ vertical:"top", horizontal:"center" }}
    >
      <Alert
        onClose={handleCloseSnackbar}
        variant="filled"
        severity="success"
        sx={{ width: "100%" }}
       
      >
        {props.success.successMessage}
      </Alert>
    </Snackbar>
  );
}
