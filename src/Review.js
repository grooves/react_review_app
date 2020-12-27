export default function Review(props) {
  return (
    <>
      <table>
        <thead>
          <th>タイトル</th>
          <th>本文</th>
          <th>スコア</th>
          <th>レビュワー</th>
          <th></th>
        </thead>
        <tbody>
          <td>{props.review.title}</td>
          <td>{props.review.body}</td>
          <td>{props.review.score}</td>
          <td>{props.review.reviewer}</td>
          <td>
            <button onClick={props.openModal}>編集</button>
          </td>
        </tbody>
      </table>
    </>
  )
}
