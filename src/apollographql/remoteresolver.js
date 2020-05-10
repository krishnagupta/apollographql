export default {
    Query: {
        async profile(root, { profileId }) {
            let response = await fetch(`https://reqres.in/api/users/${profileId}`);
            let data = await response.json()
            return data.data;
        }

    },

    Mutation: {
        async updateProfile(root, { data }) {
            let response = await fetch(`https://reqres.in/api/users`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return response;
        }

    }
}