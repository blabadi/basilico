import { merge, get } from 'lodash'
import { User } from '../../models';
import graphql, { GraphQLObjectType, GraphQLString } from 'graphql';

const saveResolver = async (obj: any,args: {[key:string]: any}, ctx: any,  info: any) => {
    console.log(`${obj}, ${args}, ${ctx}, ${info}`);
};

const resolveCreateUser = async (obj: any,args: {[key:string]: any}, ctx: any,  info: any) => {
    const user = get(args, "user", {});
    const name = `${user.firstname} ${user.lastname}`;
    console.log(`in create User ${name}`);
    return {
        firstname: user.firstname,
        lastname: user.lastname,
        id: "12314124"
    }
}



  export default merge({});
