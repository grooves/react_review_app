import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { Edit, Delete, StarBorder } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 18,
  },
});

export type BasicItemProps = {
  id: number;
  title: string;
  score: number;
  body: string;
  reviewer: string;
};

type ItemProps = {
  item: BasicItemProps;
  setItemId: (itemId: number) => void;
  setTitle: (title: string) => void;
  setScore: (score: number) => void;
  setBody: (body: string) => void;
  setReviewer: (reviewer: string) => void;
  setIsEdit: (isEdit: boolean) => void;
  openModal: () => void;
  deleteItem: (id: number) => void;
};

export function Item({
  item,
  setItemId,
  setTitle,
  setScore,
  setBody,
  setReviewer,
  setIsEdit,
  openModal,
  deleteItem,
}: ItemProps) {
  const classes = useStyles();

  function openEditModal() {
    setItemId(item.id);
    setTitle(item.title);
    setScore(item.score);
    setBody(item.body);
    setReviewer(item.reviewer);
    setIsEdit(true);
    openModal();
  }

  return (
    <Grid item>
      <Card className={classes.root} key={item.id}>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            {item.title}
          </Typography>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating
              name="customized-empty"
              defaultValue={Number(item.score)}
              precision={0.5}
              emptyIcon={<StarBorder fontSize="inherit" />}
            />
          </Box>
          <Typography gutterBottom>{item.body}</Typography>
          <Typography
            color="textSecondary"
            align="right"
            style={{ fontStyle: "italic" }}
            gutterBottom
          >
            {item.reviewer}
          </Typography>
        </CardContent>
        <Grid container justify="center">
          <div className="row mb-3">
            <div className="col-lg-6 pl-1">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Edit />}
                onClick={openEditModal}
              >
                編集
              </Button>
            </div>
            <div className="col-lg-6 pr-1">
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Delete />}
                onClick={() => deleteItem(item.id)}
              >
                削除
              </Button>
            </div>
          </div>
        </Grid>
      </Card>
    </Grid>
  );
}
