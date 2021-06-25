
import { Card, Row, Col } from 'antd';

const { Meta } = Card;

const FilmCard = (film) => {
    console.log("FIlm", film)

    const redirectToFilm = () => {
        if(film.url) {
          window.location.href= film.url
        } else {

        }
    }

    return (
      <Card
        hoverable
        cover={<img alt="film poster" src={film.poster} />}
        onClick={ redirectToFilm }
      >
        <Meta title={film.title}/>
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
