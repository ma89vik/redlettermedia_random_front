import { gql } from '@apollo/client'

export const ALL_HOSTS = gql`
query {
  hosts  {
    name
    episodeCount
  }
}
`

export const ALL_GIMMICKS = gql`
query {
  gimmicks
}
`

export const GET_RANDOM_EPISODE = gql`
query findRandomEpisode($gimmicks: [String!]){
  randomEpisode(gimmicks: $gimmicks) {
      title
      link
  }
}
`
