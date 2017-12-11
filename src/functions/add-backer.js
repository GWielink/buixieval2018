import path, {key} from '../apiPath';

export default function (data) {
    const config = {
        method: 'POST',
        headers: {
            'Authorization': key,
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data)
    };

    return fetch (path + '/add', config)
        .then(response => response.json().then(content => ({ response, content}))).then(({ response, content }) => {
            if(!response.ok) {
                return Promise.reject(content);
            }

            return Promise.resolve(content);
        });
}