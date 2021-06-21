import React from 'react';
import { Modal, Button } from 'antd';
import YoutubeEmbed from "./EmbeddedYoutube"


export const VideoViewer = ({isModalVisible, onOk, onCancel, episode}) => {
    console.log("episode query", episode)

    if (!episode) {
        return null
    }

    const findNewEpisode = () =>[
        console.log("Find a new episode")
    ]

    return (
        <Modal title="Random Episode"  visible={isModalVisible} onOk={onOk} onCancel={onCancel}
            footer={[
            <Button key="back" onClick={onCancel}>
              Return
            </Button>,
            <Button
              onClick={findNewEpisode}
            >
              No Rich Evans? Gimme another one...
            </Button>,
          ]}
        >

        { !episode.loading && episode.data &&
                <div>
            <p>{episode.data.randomEpisode.title}</p>
            <YoutubeEmbed embedId={episode.data.randomEpisode.link.split("v=")[1]} />
        </div>

        }

      </Modal>
    )

}
