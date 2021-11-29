let token = `ef8085b0334e66f8ea5595def48ddc44a7ab51c3ed6abd9c`

export const server_calls = {
    get: async () => {
        const response = await fetch(`http://127.0.0.1:5000/api/characters`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });
        if(!response.ok){
            throw new Error('Failed to fetch data from server')
        }
        return await response.json()
    },
    create: async (data: any={}) => {
        const response = await fetch(`http://127.0.0.1:5000/api/characters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if(!response.ok){
            throw new Error('Failed to create hero')
        }
        return await response.json()
    },
    update: async (id:string, data: any={}) => {
        const response = await fetch(`http://127.0.0.1:5000/api/characters/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if(!response.ok){
            throw new Error('Failed to update hero')
        }
        return await response.json()
    },
    delete: async (id:string) => {
        const response = await fetch(`http://127.0.0.1:5000/api/characters/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
        });
        if(!response.ok){
            throw new Error('Failed to delete hero')
        }
        return await response.json()
    }
}