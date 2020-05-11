import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Message } from 'semantic-ui-react';
import { timeoutPromise } from '../../../../Lib/promiseHelper';
import { SearchGamesFieldProps } from '.';
import FormError from '../../../../UI.d/FormError';
import { IGDB_TIMEOUT } from '../../../../Lib/constants';

 export const SearchGamesField = (props: SearchGamesFieldProps) => {
     const {
        fetchingGames,
         setGames
     } = props;

    const [search, setSearch ] = useState<string>('');
    const [errors, setErrors] = useState<Array<FormError>>([]);

    const searchGames = async () => {
        try {
            fetchingGames();
            const timeout = timeoutPromise(IGDB_TIMEOUT);
            const games = await axios.get(`/api/games/search/${search}`);
            const response = await Promise.race<any>([timeout, games]);
            
            if(response.timeout) setErrors([{field: 'search', message: 'Search has timed out'}]);
            else if(response.data) {
                setGames(response.data);
            }
        }catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (e?: any) => {
        e.preventDefault();
        
        setErrors([]);
        const errors: FormError[] = [];
        if(!search) errors.push({field: 'search', message: 'Search value required'});

        if(errors.length > 0) {
            setErrors(errors);
            return;
        } else  {
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