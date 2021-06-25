import React from 'react';
import { Modal, Button, Row, Col } from 'antd';
import YoutubeEmbed from "./EmbeddedYoutube"
import HostAvatarGroup from "./HostAvatarGroup"

import { FilmCardGroup } from './FilmCardGroup';

const EpisodeView = ({randomEpisode}) => {
  return(
    <div>
      <h2>{randomEpisode.title}</h2>
        <YoutubeEmbed embedId={randomEpisode.link.split("v=")[1]} />
        <br></br>
        <br></br>
        <Row justify="center" gutter={[16,16]} align="top">
            <FilmCardGroup films={randomEpisode.films}>
            </FilmCardGroup>
        </Row>
        <br></br>
        <br></br>
        <Row>
          <Col >
            <b>Hosts:</b>

            <HostAvatarGroup hosts={randomEpisode.hosts}/>
          </Col>
        </Row>
    </div>
  )
}


export const VideoViewer = ({isModalVisible, onOk, onCancel, episode, getNewEpisode}) => {

    console.log("episode query", episode)

    if (!episode || !episode.data) {
        return null
    }

    let episodeView
    if (episode.data.randomEpisode) {
      episodeView = <EpisodeView randomEpisode={episode.data.randomEpisode} />
    } else {
      episodeView = <p><b>No episode found that matches the search criteria</b></p>
    }


    return (
        <Modal title="Random Episode" visible={isModalVisible} onOk={onOk} onCancel={onCancel}
            footer={[
            <Button key="back" onClick={onCancel}>
              Return
            </Button>,
            <Button
              onClick={getNewEpisode}
              key="new"
            >
              No Rich Evans? Gimme another one...
            </Button>,
          ]}
          width={'50em'}
        >
        {episodeView}
      </Modal>
    )

}
