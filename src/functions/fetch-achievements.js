import path, {key} from '../apiPath';
import formatBackers from './format-backers';

export default function (showAll) {
    const config = {
        method: 'GET',
        headers: {
            'Authorization': key,
        }
    };

    return fetch (path + '/achievements', config)
        .then(response => response.json().then(content => ({ response, content}))).then(({ response, content }) => {
            if(!response.ok) {
                return Promise.reject(content);
            }

            return Promise.resolve(content);
        });
};