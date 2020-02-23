import React, { useState } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import { Form, Button, Message } from 'semantic-ui-react';
import { setGames, fetchingGames } from './../../../Reducers/IGDB/igdbActions';
import { timeoutPromise } from '../../../Lib/promiseHelper';
import FormError from './../../../UI.d/FormError';

 const SearchGames = (props: any) => {
     const {
        fetchingGames,
         setGames
     } = props;

    const [search, setSearch ] = useState<string>('');
    const [errors, setErrors] = useState<Array<FormError>>([]);

    const searchGames = async () => {
        try {
            fetchingGames();
            const timeout = timeoutPromise(10000);
            const games = await axios.get(`/api/games/search/${search}`);
            const response = await Promise.race<any>([timeout, games]);
            
            if(response.timeout) setErrors([{field: 'search', message: 'Search has timed out'}]);
            else if(response.data) {
                console.log(response.data);
                console.log('setting searched games in redux');
                setGames(response.data);
            }
        }catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (e?: any) => {
        e.preventDefault();
        
        const errors: FormError[] = [];
        if(!search) errors.push({field: 'search', message: 'Search value required'});

        if(errors.length > 0) {
            setErrors(errors);
            return;
        } else  {
            console.log('searching games');
            searchGames();
        }
    }

    return (
        <>
            <Form size="large">
                <Form.Input 
                    value={search}
                    onChange={ e => setSearch(e.target.value)} 
                    placeholder="Search Games"
                    action
                >
                    <input />
                    <Button 
                    color="blue" 
                    size="large"
                    onClick={handleSubmit}
                    >
                        Search
                    </Button>
                </Form.Input>
                
            </Form>
            {errors.length > 0 ?
                errors.map((error: FormError, index: number)  => {
                    return (
                        <Message
                            error
                            attached="bottom"
                            key={index}
                            content={`${error.message}`}
                        />
                    )
                })
                
            :
                null
            }
        </>
    )
    
}

const mapDispatchToProps =  {setGames, fetchingGames};

export default connect( null , mapDispatchToProps)(SearchGames);