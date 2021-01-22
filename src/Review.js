import { Box, Button, Card, CardBody, CardFooter, CardHeader, Text } from "grommet";
import { Edit, Favorite, Trash } from 'grommet-icons';

export default function Review(props) {
  return (
    <Card height="small" width="medium" background="light-1" margin='small'>
      <CardHeader pad="medium">
        <Text weight='bold' size='large'>
          {props.review.title}
        </Text>
      </CardHeader>
      <CardBody pad="medium">
        {props.review.body}
      </CardBody>
      <CardFooter pad={{horizontal: "small"}} background="light-2">
        <Box direction='row'>
          {
            [...Array(5)].map((_, i) => (
              <Favorite
                key={i}
                color={
                  i < props.review.score ? 'accent-2' : ''
                }
              />
            ))
          }
        </Box>
        <Text truncate='10'>
          {props.review.reviewer}
        </Text>
        <Box direction='row'>
          <Button icon={<Edit color='accent-1'/>} onClick={() => { props.openAsEdit(props.review) }}/>
          <Button icon={<Trash color='accent-2'/>} onClick={ () => {props.deleteReview(props.review.id)} }/>
        </Box>
      </CardFooter>
    </Card>
  )
}
