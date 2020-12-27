import React, { useEffect, useState } from "react";
import { Button, Container, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import { ReviewModal } from "./components/ReviewModal";
import { Item, BasicItemProps } from "./components/Item";

async function fetchReviews() {
  const url = "https://bookreview-ten.vercel.app/api/reviews";
  return await axios.get(url);
}

async function postReview(newReview: BasicItemProps) {
  const url = "https://bookreview-ten.vercel.app/api/reviews";
  return await axios.post(url, newReview);
}

async function putReview(updatedReview: BasicItemProps) {
  const url = `https://bookreview-ten.vercel.app/api/reviews/${updatedReview.id}`;
  return await axios.put(url, updatedReview);
}

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
  const [itemId, setItemId] = useState(0);
  const [title, setTitle] = useState("");
  const [score, setScore] = useState(5);
  const [body, setBody] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  function openModal() {
    setIsModalOpened(true);
  }

  function closeModal() {
    setIsModalOpened(false);
    setItemId(0);
    setTitle("");
    setScore(5);
    setBody("");
    setReviewer("");
    setIsEdit(false);
    setErrors([]);
  }

  function updateItems() {
    if (isEdit) {
      const updatedItem = { id: itemId, title, score, body, reviewer };
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
          if (err?.response?.data?.errors) {
            setErrors(err.response.data.errors);
          } else {
            setErrors(["何らかの理由でエラーになりました"]);
          }
        });
    } else {
      const newItem = {
        id: Number(items.length),
        title,
        score,
        body,
        reviewer,
      };
      postReview(newItem)
        .then(() => {
          setItems([...items, newItem]);
          closeModal();
        })
        .catch((err) => {
          if (err?.response?.data?.errors) {
            setErrors(err.response.data.errors);
          } else {
            setErrors(["何らかの理由でエラーになりました"]);
          }
        });
    }
  }

  async function deleteItem(id: number) {
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
                setItemId={setItemId}
                setTitle={setTitle}
                setScore={setScore}
                setBody={setBody}
                setReviewer={setReviewer}
                setIsEdit={setIsEdit}
                openModal={openModal}
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
          title={title}
          setTitle={setTitle}
          score={score}
          setScore={setScore}
          body={body}
          setBody={setBody}
          reviewer={reviewer}
          setReviewer={setReviewer}
        />
      </Grid>
    </Container>
  );
}

export default App;
