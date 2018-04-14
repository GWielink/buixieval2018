import path, {key} from '../apiPath';

export default function () {
    const config = {
        method: 'GET',
        headers: {
            'Authorization': key,
        }
    };

    return fetch (path + '/stream_key', config)
        .then(response => response.json().then(content => ({ response, content}))).then(({ response, content }) => {
            if(!response.ok) {
                return Promise.reject(content);
            }

            return Promise.resolve(content);
        });
}






