import React from "react";
import {
  Backdrop,
  Button,
  Fade,
  Grid,
  Modal,
  makeStyles,
} from "@material-ui/core";
import { Form, FormProps } from "./Form";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 0),
  },
}));

type ReviewModalProps = {
  isModalOpened: boolean;
  closeModal: () => void;
  errors: string[];
  updateItems: () => void;
} & FormProps;

export function ReviewModal({
  isModalOpened,
  closeModal,
  errors,
  updateItems,
  title,
  setTitle,
  score,
  setScore,
  body,
  setBody,
  reviewer,
  setReviewer,
}: ReviewModalProps) {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isModalOpened}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isModalOpened}>
        <div className={classes.paper}>
          <div className="row">
            <div className="col-lg-10 p-0">
              <ul>
                {errors.map((error) => (
                  <li className="error-message" key={error}>
                    {error}
                  </li>
                ))}
              </ul>
              <Form
                title={title}
                setTitle={setTitle}
                score={score}
                setScore={setScore}
                body={body}
                setBody={setBody}
                reviewer={reviewer}
                setReviewer={setReviewer}
              />
              <Grid container justify="center" style={{ margin: "2rem" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={updateItems}
                >
                  保存
                </Button>
              </Grid>
            </div>
            <div className="col-lg-2 p-0">
              <Button onClick={closeModal}>x</Button>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
