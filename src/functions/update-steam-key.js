import path, {key} from '../apiPath';

export default function (stream_key) {
    const config = {
        method: 'POST',
        headers: {
            'Authorization': key,
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({key: stream_key})
    };

    return fetch (path + '/stream_key', config)
        .then(() => {
            return Promise.resolve();
        })
        .catch(() => {
            return Promise.reject();
        });
}