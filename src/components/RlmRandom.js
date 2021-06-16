// Copyright (c) 2021 Marius Vikhammer
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import EpisodePicker from "./EpisodeForm"

const RlmRandom = () => {

    const style = {
        float: "center",
        backgroundColor: "blue"
    }

    return (
        <div className={style}>
            <h2>Choose your episode</h2>
            <EpisodePicker />   
        </div>
    )
}

export default RlmRandom