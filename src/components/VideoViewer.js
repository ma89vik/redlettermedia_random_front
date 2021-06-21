import React from 'react';
import { Modal, Button } from 'antd';
import YoutubeEmbed from "./EmbeddedYoutube"
import HostAvatarGroup from "./HostAvatarGroup"


export const VideoViewer = ({isModalVisible, onOk, onCancel, episode, getNewEpisode}) => {
    console.log("episode query", episode)

    if (!episode) {
        return null
    }


    return (
        <Modal title="Random Episode"  visible={isModalVisible} onOk={onOk} onCancel={onCancel}
            footer={[
            <Button key="back" onClick={onCancel}>
              Return
            </Button>,
            <Button
              onClick={getNewEpisode}
            >
              No Rich Evans? Gimme another one...
            </Button>,
          ]}
        >

        { !episode.loading && episode.data &&
            <div>
                <p>{episode.data.randomEpisode.title}</p>
                <YoutubeEmbed embedId={episode.data.randomEpisode.link.split("v=")[1]} />
                <HostAvatarGroup hosts={episode.data.randomEpisode.hosts}/>
            </div>

        }

      </Modal>
    )

}
