import react from 'react';
import { CHANGEYEAR_QUERY } from '../apicalls/queries';
import { useQuery } from "@apollo/client";

//onClick = {changeyear()} 

function Changeyearbutton () {
    const { changeyear }  = useQuery(CHANGEYEAR_QUERY);

    return(

        <button onClick = {changeyear} >
            change the year!
        </button>

    );
};
 

export default Changeyearbutton;
