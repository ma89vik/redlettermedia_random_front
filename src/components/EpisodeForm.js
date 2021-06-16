import React from 'react'

import { Checkbox, Row, Col, Button } from 'antd';

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}


const FormItem = ({text, searchValue}) => {

    const checkboxStyle = {
        color: "red",
    }

    const textStyle = {
        
    }

    const colStyle = {
         background: '#0092ff'
    }

    return (
        <Row justify="center" gutter={[16, 40]}  >
            <Col span={3} >
                <div style={colStyle} >
                {text}
                </div>
            </Col>
            <Col span={2}>
                <Checkbox style={checkboxStyle} value={searchValue}></Checkbox>
            </Col>
        </Row>
    )
}

const episodeTypes = [
    {searchValue:"botw", text: "Best of the Worst"},
    {searchValue:"wotw", text: "Wheel of the Worst"},
    {searchValue:"plinketto", text: "Plinketto"},
    {searchValue:"blackSpine", text: "Black Spine"},
]

const panelMembers = [
    {text: "Mike", searchValue: "mike" },
    {text: "Jay", searchValue: "jay" },
    {text: "Rich", searchValue: "rich" },
    {text: "Jack", searchValue: "jack" },
    {text: "Canadians", searchValue: "canadians"},
    {text: "Wizard", searchValue: "wizard" }
]


const EpisodePicker = () => {

    const createChoice = (text, searchValue) => {
        return <FormItem text={text} searchValue={searchValue} />
    }


    return (
        <div>
            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                {episodeTypes.map(e => createChoice(e.text, e.searchValue) )}
            </Checkbox.Group>
            <Row justify="center">
                <Col span={2}>            
                    <Button>Find an Episode</Button>
                </Col>
                <Col span={2}>            
                    <Button>Next</Button>
                </Col>
                
            </Row>
        </div>

    )
}

export default EpisodePicker
