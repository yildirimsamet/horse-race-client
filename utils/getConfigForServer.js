import Cookies from 'cookies'

export const getConfigForServer = async (req, res) => {
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    }

    const cookies = new Cookies(req, res)
    const token = cookies.get('token')

    if (token) {
        config.headers['Authorization'] = token;
    }

    return config
}

export default getConfigForServer
