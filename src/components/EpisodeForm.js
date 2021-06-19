import React, {useState} from 'react'
import { useQuery, useLazyQuery } from '@apollo/client';
import shortid from 'shortid';
import { Checkbox, Row, Col, Button } from 'antd';

import { ALL_HOSTS, ALL_GIMMICKS, GET_RANDOM_EPISODE } from '../queries/episodeQuery'
import { VideoViewer } from './VideoViewer'


const FormItem = ({text, toggleSearchParam}) => {

    const rowStyle = {
        border: 'solid',
        borderRadius: 30,
        borderWidth: 2,
        margin: 5,
        padding: 5
    }

    return (
        <Row justify="center" style={rowStyle} onClick={() => toggleSearchParam(text)} >
            <Col span={20} >
                {text}
            </Col>
            <Col span={4}>
                <Checkbox value={text}></Checkbox>
            </Col>
        </Row>
    )
}

const EpisodePicker = () => {

    const hostsQuery = useQuery(ALL_HOSTS)
    const gimmicksQuery = useQuery(ALL_GIMMICKS)
    const [getRandomEpisode, getRandomEpisodeResult] = useLazyQuery(GET_RANDOM_EPISODE)

    const [searchParams, setSearchParams] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    if (gimmicksQuery.loading) {
        return null
    }

    console.log("getRandomEpisodeResult", getRandomEpisodeResult)

    const episodeTypes = gimmicksQuery.data.gimmicks

    console.log(episodeTypes)

    const createChoice = (text, toggleSearchParam) => {
        return <FormItem text={text} key={shortid.generate()} toggleSearchParam={toggleSearchParam}/>
    }

    const toggleSearchParam = (param) => {
        if (searchParams.find( e => e === param)) {
            setSearchParams(searchParams.filter( e => e !== param ))
        } else {
            setSearchParams(searchParams.concat([param]))
        }
    }

    const next = () => {
        console.log("NEXT PARAMS", searchParams)

    }

    const findEpisode = () => {
        console.log("FIND EPISODE", searchParams)
        getRandomEpisode({ variables: { gimmicks: searchParams } })
        setIsModalVisible(true)

    }

    function onChange(checkedValues) {
        console.log('checked = ', checkedValues);
        setSearchParams(checkedValues)


    }
    console.log("isModalVisible", isModalVisible)


    const handleOk = () => {
        setIsModalVisible(false);
      };

      const handleCancel = () => {
        setIsModalVisible(false);
      };


    return (
        <div>
            <VideoViewer isModalVisible={isModalVisible} onOk={handleOk} onCancel={handleCancel} episode={getRandomEpisodeResult} />

            <Row>
                <Col span={6} offset={9}>
                <Checkbox.Group style={{ width: '100%'}} value={searchParams} onChange={onChange}>
                {episodeTypes.map(e => createChoice(e, toggleSearchParam))}
            </Checkbox.Group>
                </Col>

            </Row>


            <Row>
                <Col span={1} offset={9}>
                    <Button onClick={findEpisode}>Find an Episode</Button>
                </Col>
                <Col span={1} offset={4}>
                    <Button onClick={next}>Next</Button>
                </Col>

            </Row>
        </div>

    )
}

export default EpisodePicker
