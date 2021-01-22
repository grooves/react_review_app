import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faPencilAlt);
library.add(faTimes);

export function Review({
  index,
  id,
  title,
  score,
  body,
  reviewer,
  removeReview,
  openEditModal,
}) {
  return (
    <tr>
      <th>{index + 1}</th>
      <th>{title}</th>
      <th>{score}</th>
      <th>{body}</th>
      <th>{reviewer}</th>
      <th>
        <div className="is-flex">
          <button onClick={() => openEditModal(id)} className="button">
            <FontAwesomeIcon icon="pencil-alt" />
          </button>
          <button onClick={() => removeReview(id)} className="button">
            <FontAwesomeIcon icon="times" />
          </button>
        </div>
      </th>
    </tr>
  );
}

// named exportとdefault exportの違いを意識しよう
// 10/30日次はapiをfetchするaxiosを使っていいhttpクライアントが必要
