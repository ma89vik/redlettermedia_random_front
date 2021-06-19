import React, {useState} from 'react'
import { useQuery, useLazyQuery } from '@apollo/client';
import shortid from 'shortid';
import { Checkbox, Row, Col, Space, Button } from 'antd';

import { ALL_HOSTS, ALL_GIMMICKS, GET_RANDOM_EPISODE } from '../queries/episodeQuery'
import { VideoViewer } from './VideoViewer'


const FormItem = ({text, toggleSearchParam}) => {

    const rowStyle = {
        border: 'solid',
        borderRadius: 30,
        borderWidth: 2,
        margin: 5,
        padding: "10px 20px",
        width: "400px"
    }

    return (
        <div style={rowStyle} onClick={() => toggleSearchParam(text)} >
            <Row>
                <Col span={20}>
                    {text}
                </Col>
                <Col span={4}>
                    <Checkbox value={text} ></Checkbox>
                </Col>

            </Row>

        </div>
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


                <Checkbox.Group value={searchParams} onChange={onChange}>
                {episodeTypes.map(e => createChoice(e, toggleSearchParam))}
            </Checkbox.Group>

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
