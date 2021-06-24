import React, {useState} from 'react'
import { useQuery, useLazyQuery } from '@apollo/client';
import shortid from 'shortid';
import { Checkbox, Row, Col, Space, Button } from 'antd';

import { ALL_HOSTS, ALL_GIMMICKS, GET_RANDOM_EPISODE } from '../queries/episodeQuery'
import { VideoViewer } from './VideoViewer'


const ChoiceItem = ({text, toggleSearchParam}) => {

    const rowStyle = {
        border: 'solid',
        borderRadius: 30,
        borderWidth: 2,
        margin: 5,
        padding: "1em 2em",
        width: "20em",
        cursor: "pointer"
    }

    return (
        <div style={rowStyle} onClick={() => toggleSearchParam(text)} >
            <Row>
                <Col span={20}>
                    {text}
                </Col>
                <Col span={4}>
                    <Checkbox value={text} onChange={() => null} ></Checkbox>
                </Col>
            </Row>
        </div>
    )
}

const ChoiceForm = ({inputItems, searchParams, setSearchParams}) => {

    const toggleSearchParam = (param) => {
        if (searchParams.find( e => e === param)) {
            setSearchParams(searchParams.filter( e => e !== param ))
        } else {
            setSearchParams(searchParams.concat([param]))
        }
    }

    const setAllSearchParams = (param) => {
        setSearchParams([...inputItems, param])
    }

    return (
        <Checkbox.Group value={searchParams}>
            {inputItems.map(e => {
                 return <ChoiceItem text={e} key={shortid.generate()} toggleSearchParam={ toggleSearchParam }/>
            })}
            <ChoiceItem text={"All of the above"} key={shortid.generate()} toggleSearchParam={ setAllSearchParams }/>
        </Checkbox.Group>
    )
}

const EpisodePicker = () => {

    const hostsQuery = useQuery(ALL_HOSTS)
    const gimmicksQuery = useQuery(ALL_GIMMICKS)
    const [getRandomEpisode, getRandomEpisodeResult] = useLazyQuery(GET_RANDOM_EPISODE,
        {
            fetchPolicy: "network-only"
        }
    )

    const [hostParams, setHostParams] = useState([])
    const [gimmickParams, setGimmickParams] = useState([])
    const [screenState, setScreenState] = useState('gimmick')
    const [isModalVisible, setIsModalVisible] = useState(false);

    if (hostsQuery.loading || gimmicksQuery.loading) {
        return null
    }

    const gimmicks = gimmicksQuery.data.gimmicks
    const hosts = hostsQuery.data.hosts



    const gimmickChoices = () => {
        return <ChoiceForm inputItems={gimmicks} searchParams={gimmickParams} setSearchParams={setGimmickParams}/>
    }

    const hostChoices = () => {
        return <ChoiceForm inputItems={hosts.map(h => h.name)} searchParams={hostParams} setSearchParams={setHostParams}/>
    }

    const next = () => {
        setScreenState('host')
    }

    const findEpisode = () => {
        const searchParams = {}
        if (hostParams.length > 0) {
            searchParams.hosts = hostParams
        }
        if (gimmickParams.length > 0) {
            searchParams.gimmicks = gimmickParams
        }

        getRandomEpisode( { variables: searchParams } )
        setIsModalVisible(true)
    }

      const handleCancel = () => {
        setIsModalVisible(false);
      };

    const inputChoices = () => {
        if (screenState === 'gimmick') {
            return gimmickChoices()
        } else if (screenState === 'host') {
            return hostChoices()
        } else {
            return null
        }
    }

    return (
        <div>
            <VideoViewer isModalVisible={isModalVisible} onCancel={handleCancel} episode={getRandomEpisodeResult} getNewEpisode={findEpisode}  />

            {inputChoices()}
            <div>
                <Space>
                    <Button onClick={findEpisode}>Find an Episode</Button>

                    <Button onClick={next}>Next</Button>
                </Space>
            </div>
        </div>

    )
}

export default EpisodePicker
