import React from "react";
import { Button, Container, Grid } from "@material-ui/core";
import { ReviewModal } from "./components/ReviewModal";
import { Item } from "./components/Item";
import { useBookReviewApp } from "./useBookReviewApp";

function App() {
  const {
    classes,
    items,
    openModal,
    openEditModal,
    deleteItem,
    isModalOpened,
    closeModal,
    errors,
    updateItems,
    formData,
    changeTitle,
    changeScore,
    changeBody,
    changeReviewer,
  } = useBookReviewApp();

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
