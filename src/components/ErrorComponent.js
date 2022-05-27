import { Alert, Snackbar } from "@mui/material";

export function ErrorComponent(props) {

  const handleCloseSnackbar = (event, reason) => {
      console.log(reason)
    if (reason === "clickaway") {
      return;
    }
    props.setError({isError: false, errorMessage: null});
  };
  return (
    <Snackbar
      open={props.error.isError}
      autoHideDuration={10000}
      onClose={handleCloseSnackbar}
      sx={{ width: "100%" }}
      anchorOrigin={{ vertical:"top", horizontal:"center" }}
    >
      <Alert
        onClose={handleCloseSnackbar}
        variant="filled"
        severity="error"
        sx={{ width: "100%" }}
       
      >
        {props.error.errorMessage}
      </Alert>
    </Snackbar>
  );
}
