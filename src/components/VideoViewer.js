import React from 'react';
import { Modal, Button } from 'antd';
import YoutubeEmbed from "./EmbeddedYoutube"
import HostAvatarGroup from "./HostAvatarGroup"

import shortid from 'shortid'
import { FilmCardGroup } from './FIlmCardGroup';

export const VideoViewer = ({isModalVisible, onOk, onCancel, episode, getNewEpisode}) => {
    console.log("episode query", episode)

    if (!episode || !episode.data) {
        return null
    }

    const randomEpisode = episode.data.randomEpisode

    return (
        <Modal title="Random Episode"  visible={isModalVisible} onOk={onOk} onCancel={onCancel}
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

        { !episode.loading &&
            <div>
                <h2>{randomEpisode.title}</h2>

                <YoutubeEmbed embedId={randomEpisode.link.split("v=")[1]} />

                  <div>
                    <b>Hosts:</b>
                    <HostAvatarGroup hosts={randomEpisode.hosts}/>
                  </div>
                  <br></br>
                  <div>
                    <b>Films:</b>
                    <FilmCardGroup films={randomEpisode.films}>

                    </FilmCardGroup>
                  </div>



            </div>

        }

      </Modal>
    )

}
