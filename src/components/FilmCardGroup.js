
import { Card, Row, Col } from 'antd';

const FilmCard = (film) => {
    const defaultPoster = 'https://a.ltrbxd.com/resized/film-poster/7/1/1/1/8/71118-nukie-0-125-0-187-crop.jpg?k=891d05d317'

    const redirectToFilm = () => {
        if(film.url) {
          window.location.href= film.url
        } else {

        }
    }

    return (
      <Card
        hoverable
        cover={<img alt="film poster" src={film.poster ? film.poster : defaultPoster} />}
        style={{width: "10em"}}
        onClick={ redirectToFilm }
      >
        <p><b>{film.title}</b></p>
      </Card>
    )
}

export const FilmCardGroup = ({films}) => {

    return (
      <Row gutter={16}>
      {films.map((f) => {
        return(
          <Col span={8}>
            {FilmCard(f)}
          </Col>
        )
      })}
    </Row>
    )
}
