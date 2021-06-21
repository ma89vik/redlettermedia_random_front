
import { Avatar, Tooltip } from 'antd';
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import shortid from 'shortid'

import * as icons from '../assets/images'


const HostAvatarGroup = ({hosts}) => {

  return (
    <Avatar.Group key={shortid.generate()}>
      {hosts.map( (host) => {
        const iconPath = `${host}Icon`
        console.log("iconPath", iconPath, icons[iconPath])
        return (
          <Tooltip title={host} placement="top">
            <Avatar src={icons[iconPath]} />
          </Tooltip>
        )
      })}
    </Avatar.Group>
  )
}

export default HostAvatarGroup
