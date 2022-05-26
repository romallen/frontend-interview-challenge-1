import { useEffect, useState } from "react";
import { Box, Container, Modal } from "@mui/material";
import axios from "axios";

export function DetailsModal(props) {
  const [personData, setPersonData] = useState(null);

  useEffect(() => {
    if (props.id) {
      axios
        .get(`http://localhost:3000/persons/${props.id}`)
        .then((res) => {
          console.log(res.data);
          setPersonData(res.data);
          props.setIsLoading(false);
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    }
  }, [props.id]);

  return (
    <Modal open={props.detailsModalOpen}>
      {personData ? <Box>person data</Box> : <Box>loading</Box>}
    </Modal>
  );
}
