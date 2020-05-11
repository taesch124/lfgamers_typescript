import * as React from 'react';
import { Icon } from 'semantic-ui-react';

export function FavoriteGameButton(props: any) {
    const onFavorite = (e: any) => {
        e.stopPropagation();
        console.log('favorite button clicked');
    }

    return (
        <Icon
            color="black"
            name="star outline"
            onClick={onFavorite}
        />
    )
}