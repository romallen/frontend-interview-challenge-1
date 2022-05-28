import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormGroup,
  List,
  ListItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import tinycolor from "tinycolor2";
import { ErrorComponent } from "../components/ErrorComponent";
export function DetailsModal(props) {
  const [personData, setPersonData] = useState(null);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [detailsError, setDetailsError] = useState({
    isError: false,
    errorMessage: null,
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [fontColor, setFontColor] = useState("#000000");

  useEffect(() => {
    if (props.id) {
      axios
        .get(`http://localhost:3000/persons/${props.id}`)
        .then((res) => {
          if (res.data.errors) {
            setDetailsError({
              isError: true,
              errorMessage: res.data.errors[0],
            });
          } else {
            setPersonData(res.data);
            props.setIsLoading(false);
            setFontColor(tinycolor
              .mostReadable(res.data.favoriteColor, ["#ffffff", "#000000"])
              .toHexString(),);
          }
        })
        .catch((err) => {
          props.setIsLoading(false);
          setDetailsError({ isError: true, errorMessage: err.message });
          console.log("Error: ", err);
        });
    }
  }, [props.id]);

  const handleUpdateClick = () => {
    setIsUpdateLoading(true);

    axios
      .patch(`http://localhost:3000/persons/${personData.id}`, personData)
      .then((res) => {
        if (res.data.errors) {
          setDetailsError({ isError: true, errorMessage: res.data.errors[0] });
        } else {
          props.setDetailsModalOpen(false);
          setIsUpdateLoading(false);
          props.setIsSuccessful({
            isSuccessful: true,
            successMessage: "Updated successfully",
          });
        }
      })
      .catch((err) => {
        setIsUpdateLoading(false);
        setDetailsError({ isError: true, errorMessage: err.message });
        console.log("Error: ", err);
      });
  };

  const handleDeleteClick = () => {
    setIsDeleteLoading(true);
    axios
      .delete(`http://localhost:3000/persons/${personData.id}`)
      .then((res) => {
        if (res.data.errors) {
          setDetailsError({ isError: true, errorMessage: res.data.errors[0] });
        } else {
          setIsDeleteLoading(false);
          props.setDetailsModalOpen(false);
          props.setIsSuccessful({
            isSuccessful: true,
            successMessage: "Deleted successfully",
          });
        }
      })
      .catch((err) => {
        setIsDeleteLoading(false);
        setDetailsError({ isError: true, errorMessage: err.message });
        console.log("Error: ", err);
      });
  };

  return (
    <Modal
      open={props.detailsModalOpen}
      sx={{ height: "100vh", overflow: "scroll" }}
    >
      <Container>
        {detailsError.isError ? (
          <ErrorComponent error={detailsError} setError={setDetailsError} />
        ) : null}
        {personData ? (
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            sx={{
              bgcolor: personData.favoriteColor,
              color: fontColor,
              input: { color: fontColor },
              m: "0 auto",
              pb: 2,
              width: "70%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "10px",
              boxShadow: 2,
            }}
          >
            <FormGroup
              onChange={(e) => {
                setPersonData({
                  ...personData,
                  [e.target.id]: e.target.value,
                });
              }}
            >
              <List dense={true}>
                <ListItem>
                  <Typography sx={{ mr: 2 }}>ID: </Typography>
                  <Typography sx={{ mr: 2 }}>{personData.id} </Typography>
                </ListItem>
                <ListItem>
                  <Typography sx={{ mr: 2 }}>Title: </Typography>
                  <Typography sx={{ mr: 2 }}>{personData.title} </Typography>
                </ListItem>
                <ListItem>
                  <Typography sx={{ mr: 2 }}> First Name: </Typography>
                  <TextField
                    id="firstName"
                    variant="outlined"
                    defaultValue={personData.firstName}
                    required
                  ></TextField>
                </ListItem>
                <ListItem>
                  <Typography sx={{ mr: 2 }}> Last Name: </Typography>
                  <TextField
                    id="lastName"
                    variant="outlined"
                    defaultValue={personData.lastName}
                    required
                  ></TextField>
                </ListItem>
                <ListItem>
                  <Typography sx={{ mr: 2 }}>Email: </Typography>
                  <Typography sx={{ mr: 2 }}>{personData.email} </Typography>
                </ListItem>
                <ListItem>
                  <Typography sx={{ mr: 2 }}>Gender: </Typography>
                  <Typography sx={{ mr: 2 }}>{personData.gender} </Typography>
                </ListItem>
                <ListItem>
                  <Typography sx={{ mr: 2 }}>Address: </Typography>
                </ListItem>

                <ListItem>
                  <Typography sx={{ mx: 2 }}>Country: </Typography>
                  <Typography sx={{ mr: 2 }}>
                    {personData.address.country}{" "}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography sx={{ mx: 2 }}> Street Name: </Typography>
                  <Typography sx={{ mr: 2 }}>
                    {personData.address.streetName}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography sx={{ mx: 2 }}>City: </Typography>
                  <Typography sx={{ mr: 2 }}>
                    {personData.address.city}{" "}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography sx={{ mr: 2 }}>Favorite Books: </Typography>
                  <Typography sx={{ mr: 2 }}>
                    {personData.favoriteBooks.join(", ")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography sx={{ mr: 2 }}>Birthday: </Typography>

                  <TextField
                    id="birthday"
                    defaultValue={personData.birthday}
                    type="date"
                    variant="outlined"
                    sx={{ mr: 1 }}
                    required
                  ></TextField>
                  {`(${
                    new Date().getFullYear() -
                    new Date(personData.birthday).getFullYear()
                  } years old)`}
                </ListItem>
                <ListItem>
                  <Typography sx={{ mr: 2 }}>Comment: </Typography>
                  <TextField
                    id="comment"
                    defaultValue={personData.comment}
                    rows={2}
                    variant="outlined"
                    sx={{ width: "100%" }}
                  ></TextField>
                </ListItem>
              </List>
            </FormGroup>

            <Dialog
              open={openDeleteDialog}
              onClose={() => setOpenDeleteDialog(false)}
            >
              <DialogTitle>{"Confirmation"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You are about to delete this person. Are you sure?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDeleteDialog(false)}>
                  cancel
                </Button>
                <Button
                  onClick={() => {
                    handleDeleteClick();
                    setOpenDeleteDialog(false);
                  }}
                  autoFocus
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                mx: 2,
              }}
            >
              <LoadingButton
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => setOpenDeleteDialog(true)}
                loading={isDeleteLoading}
                loadingIndicator="deleting..."
                variant="contained"
              >
                DELETE
              </LoadingButton>
              <Box>
                <Button
                  variant="contained"
                  sx={{ mr: 1 }}
                  onClick={() => props.setDetailsModalOpen(false)}
                >
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  onClick={handleUpdateClick}
                  loading={isUpdateLoading}
                  loadingIndicator="UPDATING..."
                  variant="contained"
                >
                  UPDATE
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        ) : null}
      </Container>
    </Modal>
  );
}
