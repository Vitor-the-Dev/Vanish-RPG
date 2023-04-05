import { gql } from 'apollo-boost';


export const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    currentUser {
      id
      name
      discordtag
      email
    }
  }
`;

export const CHANGEYEAR_QUERY = gql`
  query callchangeyearQuery { 
    callchangeyear{
      nationsstr
    }
  }

`;