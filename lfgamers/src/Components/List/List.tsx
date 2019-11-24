import React, {useState} from 'react';
import {Loader} from 'semantic-ui-react';

const List = (props: any) => {
    const [loading, setLoading] = useState<boolean>(false);

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