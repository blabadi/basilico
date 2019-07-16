import { merge, get } from 'lodash'

const UserResolver = {
    Mutation: {
        createUser: async (obj, args, ctx, info) => {
            const user = get(args, "user", {});
            const name = user.firstname;
            console.log(`in create User ${name}`);
            return {
                firstname: name,
                lastname: user.lastname,
                id: 12314124
            }
        }
    }
};
export default merge(UserResolver)
