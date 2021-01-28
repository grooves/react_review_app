import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Container, Grid, makeStyles } from "@material-ui/core";
import axios, { AxiosError } from "axios";
import { fetchReviews, postReview, putReview } from "./api";
import { ReviewModal } from "./components/ReviewModal";
import { Item, BasicItemProps } from "./components/Item";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function App() {
  const [items, setItems] = useState<BasicItemProps[]>([]);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [itemId, setItemId] = useState("0");
  const [formData, setFormData] = useState({
    title: "",
    score: 5,
    body: "",
    reviewer: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  function openModal() {
    setIsModalOpened(true);
  }

  function openEditModal(item: BasicItemProps) {
    setItemId(item.id);
    setFormData({
      title: item.title,
      score: item.score,
      body: item.body,
      reviewer: item.reviewer,
    });
    setIsEdit(true);
    openModal();
  }

  function closeModal() {
    setIsModalOpened(false);
    setItemId("0");
    setFormData({
      title: "",
      score: 5,
      body: "",
      reviewer: "",
    });
    setIsEdit(false);
    setErrors([]);
  }

  function changeTitle(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, title: e.target.value });
  }

  function changeScore(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, score: Number(e.target.value) });
  }

  function changeBody(e: ChangeEvent<HTMLTextAreaElement>) {
    setFormData({ ...formData, body: e.target.value });
  }

  function changeReviewer(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, reviewer: e.target.value });
  }

  function updateItems() {
    if (isEdit) {
      const updatedItem = {
        id: itemId,
        title: formData.title,
        score: formData.score,
        body: formData.body,
        reviewer: formData.reviewer,
      };
      putReview(updatedItem)
        .then(() => {
          const updatedItems = items.map((item) => {
            if (item.id === itemId) {
              return updatedItem;
            }
            return item;
          });
          setItems(updatedItems);
          closeModal();
        })
        .catch((err) => {
          throwErrors(err);
        });
    } else {
      const newItem = {
        id: `${items.length}`,
        title: formData.title,
        score: formData.score,
        body: formData.body,
        reviewer: formData.reviewer,
      };
      postReview(newItem)
        .then(() => {
          setItems([...items, newItem]);
          closeModal();
        })
        .catch((err) => {
          throwErrors(err);
        });
    }
  }

  function throwErrors(err: AxiosError) {
    if (err?.response?.data?.errors) {
      setErrors(err.response.data.errors);
    } else {
      setErrors(["何らかの理由でエラーになりました"]);
    }
  }

  async function deleteItem(id: string) {
    if (window.confirm("本当に削除してよろしいですか？")) {
      const url = `https://bookreview-ten.vercel.app/api/reviews/${id}`;
      await axios.delete(url);
      setItems(items.filter((item: BasicItemProps) => item.id !== id));
    }
  }

  useEffect(() => {
    fetchReviews().then((response) => {
      setItems(response.data);
    });
  }, []);

  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Grid container className={classes.root} spacing={2}>
        <h2 className="mt-5 mb-3">Book Review App</h2>
        <Grid item xs={12}>
          <Grid container spacing={5}>
            {items.map((item) => (
              <Item
                item={item}
                openModal={openModal}
                openEditModal={openEditModal}
                deleteItem={deleteItem}
                key={item.id}
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify="center" style={{ marginTop: "2rem" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={openModal}
        >
          登録
        </Button>
        <ReviewModal
          isModalOpened={isModalOpened}
          closeModal={closeModal}
          errors={errors}
          updateItems={updateItems}
          formData={formData}
          changeTitle={changeTitle}
          changeScore={changeScore}
          changeBody={changeBody}
          changeReviewer={changeReviewer}
        />
      </Grid>
    </Container>
  );
}

export default App;
