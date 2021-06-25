
import { Avatar, Tooltip } from 'antd';
import shortid from 'shortid'

import * as icons from '../assets/images'


const HostAvatarGroup = ({hosts}) => {

  const HostAvatar = (host) => {
    const iconPath = `${host}Icon`
    console.log("iconPath", iconPath, icons[iconPath])

    if (iconPath in icons) {
      return (
        <Avatar gap="1" src={icons[iconPath]} />
      )
    } else {
      return (
        <Avatar >
          {host}
        </Avatar>
      )
    }
  }

  return (
    <Avatar.Group key={shortid.generate()}>
      {hosts.map( (host) => {
        return (
          <Tooltip title={host} placement="top" key={shortid.generate()}>
            {HostAvatar(host)}
          </Tooltip>
        )
      })}
    </Avatar.Group>
  )
}

export default HostAvatarGroup
