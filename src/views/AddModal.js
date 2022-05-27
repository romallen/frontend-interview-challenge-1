import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    FormLabel,
    FormGroup,
    Modal,
    TextField,
    Typography,
  } from "@mui/material";
export function AddModal(props) {

    return (
        <Modal open={props.addModalOpen}>
            <Box >ADD Modal</Box>
        </Modal>
    )}