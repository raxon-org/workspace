import { object } from "/Module/Object.js";

let exception = {};

exception.data = {
    data : {},
    set : (attribute, value) => {
        if(typeof attribute === 'object'){
            for(let attr in attribute){
                object.set(attr, attribute[attr], exception.data.data);
            }
        } else {
            object.set(attribute, value, exception.data.data);
        }
    },
    has : (attribute) => {
        return object.has(attribute, exception.data.data);
    },
    get : (attribute) => {
        return object.get(attribute, exception.data.data);
    },
    delete : (attribute) => {
        return object.delete(attribute, exception.data.data);
    }
};

exception.authorization = (data) => {
    if(data?.class === 'R3m\\Io\\Exception\\AuthorizationException'){
        return true;
    }
    return false;
}

export { exception }