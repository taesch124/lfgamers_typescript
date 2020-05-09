import React from 'react';
import {Loader} from 'semantic-ui-react';

const List = (props: any) => {

    return (
        <React.Fragment>
            {props.children.length > 0 ?
            props.children :
            <Loader />
            }
        </React.Fragment>
    )
}

export default List;