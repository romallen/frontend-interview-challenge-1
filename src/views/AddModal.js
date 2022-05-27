import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  FormControlLabel,
  FormGroup,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdef", 13);
const personDataSchema = {
  id: nanoid(),
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  address: {
    country: "",
    streetName: "",
    city: "",
    postalCode: "N/A",
  },
  favoriteBooks: [],
  birthday: "",
  favoriteColor: "",
  comment: "",
};
export function AddModal(props) {
  const [newPersonData, setNewPersonData] = useState({ personDataSchema });

  const handleAddClick = () => {
    axios
      .post(`http://localhost:3000/persons`, newPersonData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  return (
    <Modal open={props.addModalOpen}>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        sx={{ bgcolor: "#ffffff", m: "0 auto", width: "70%", py: 2 }}
      >
        <FormGroup
          onChange={(e) => {
            console.log(e.target.value);
            setNewPersonData({
              ...newPersonData,
              [e.target.id]: e.target.value,
            });
          }}
        >
          <List>
            <ListItem>
              <Typography sx={{ mr: 2 }}>Title: </Typography>
              <TextField
                id="title"
                inputProps={{ minLength: 2 }}
                type="text"
                variant="standard"
                required
              />
            </ListItem>
            <ListItem>
              <Typography sx={{ mr: 2 }}> First Name: </Typography>
              <TextField id="firstName" variant="outlined" required></TextField>
            </ListItem>
            <ListItem>
              <Typography sx={{ mr: 2 }}> Last Name: </Typography>
              <TextField id="lastName" variant="outlined" required></TextField>
            </ListItem>

            <ListItem>
              <Typography sx={{ mr: 2 }}>Email: </Typography>
              <TextField
                id="email"
                type="email"
                variant="standard"
                required
              ></TextField>
            </ListItem>
            <ListItem>
              <Typography sx={{ mr: 2 }}>Gender: </Typography>
              <RadioGroup row>
                <FormControlLabel
                  value="Female"
                  control={<Radio id="gender" size="small" required />}
                  label="Female"
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio id="gender" size="small" required />}
                  label="Male"
                />
                <FormControlLabel
                  value="Genderfluid"
                  control={<Radio id="gender" size="small" required />}
                  label="Genderfluid"
                />
              </RadioGroup>
            </ListItem>
            <ListItem>
              <Typography sx={{ mr: 2 }}>Address: </Typography>
            </ListItem>

            <ListItem>
              <Typography sx={{ mr: 2 }}>Country: </Typography>
              <TextField id="country" variant="standard" required></TextField>
            </ListItem>
            <ListItem>
              <Typography sx={{ mr: 2 }}> Street Name: </Typography>
              <TextField
                id="streetName"
                variant="standard"
                required
              ></TextField>
            </ListItem>
            <ListItem>
              <Typography sx={{ mr: 2 }}>City: </Typography>
              <TextField id="city" variant="standard" required></TextField>
            </ListItem>
            <ListItem>
              <Typography sx={{ mr: 2 }}>Favorite Books: </Typography>
              <TextField
                id="favoriteBooks"
                variant="standard"
                required
              ></TextField>
            </ListItem>
            <ListItem>
              <Typography sx={{ mr: 2 }}>Birthday: </Typography>
              <TextField
                id="birthday"
                type="date"
                variant="outlined"
                sx={{ mr: 1 }}
                required
              ></TextField>
              {newPersonData.birthday
                ? `(${
                    new Date().getFullYear() -
                    new Date(newPersonData.birthday).getFullYear()
                  } years old)`
                : null}
            </ListItem>
            <ListItem>
              <Typography sx={{ mr: 2 }}>Favorite Color: </Typography>
              {newPersonData.favoriteColor ? (
                `(${newPersonData.favoriteColor})`
              ) : (
                <TextField
                  placeholder="Pick a Color"
                  value={newPersonData.favoriteColor}
                  sx={{ width: "20%", ml: 1 }}
                  variant="standard"
                  required
                ></TextField>
              )}

              <TextField
                id="favoriteColor"
                type="color"
                sx={{ width: "15%", ml: 1 }}
                variant="standard"
              ></TextField>
            </ListItem>
            <ListItem>
              <Typography sx={{ mr: 2 }}>Comment: </Typography>
              <TextField
                id="comment"
                variant="outlined"
                rows={2}
                multiline
              ></TextField>
            </ListItem>
          </List>
        </FormGroup>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mx: 2,
          }}
        >
          <LoadingButton
            type="submit"
            onClick={handleAddClick}
            // loading={isUpdateLoading}
            loadingIndicator="ADDING..."
            variant="contained"
          >
            ADD
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
}
