import React from 'react';
import { Modal } from 'antd';


export const VideoViewer = ({isModalVisible, onOk, onCancel, episode}) => {
    console.log("episode query", episode)

    if (!episode) {
        return null
    }

    return (
        <Modal title="Basic Modal"  visible={isModalVisible} onOk={onOk} onCancel={onCancel}>

        { !episode.loading && episode.data &&
                <div>
            <p>{episode.data.randomEpisode.title}</p>
            <p>{episode.data.randomEpisode.gimmick}</p>
            <p>{episode.data.randomEpisode.hosts}</p>
        </div>

        }

      </Modal>
    )

}
