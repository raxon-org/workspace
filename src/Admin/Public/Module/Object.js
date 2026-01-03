let object = {};
let explode = {};

explode.explode = (delimiter, string, limit) => {
    if (typeof delimiter === 'undefined' || typeof string === 'undefined'){
        return null;
    }
    if (delimiter === '' || delimiter === false || delimiter === null){
        return false;
    }
    if (typeof delimiter === 'function' || typeof delimiter === 'object' || typeof string === 'function' || typeof string ==='object') {
        return {
            0: ''
        };
    }
    if (delimiter === true){
        delimiter = '1';
    }
    delimiter += '';
    string += '';
    var s = string.split(delimiter);
    if (typeof limit === 'undefined'){
        return s;
    }
    if (limit === 0){
        limit = 1;
    }
    if (limit > 0) {
        if (limit >= s.length){
            return s;
        }
        return s.slice(0, limit - 1)
            .concat([s.slice(limit - 1)
                .join(delimiter)
            ]);
    }
    if (-limit >= s.length){
        return [];
    }
    s.splice(s.length + limit);
    return s;
}

explode.multi = (delimiter, string, limit) => {
    var result = [];
    var index;
    for(index =0; index < delimiter.length; index++){
        var delim = delimiter[index];
        if(typeof limit != 'undefined' && is.set(limit[index])){
            var tmp = explode.explode(delim. string. limit[index]);
        } else {
            var tmp = explode.explode(delim, string);
        }
        if(tmp.length === 1){
            continue;
        }
        var i;
        for(i = 0; i < tmp.length; i++){
            var value = tmp[i];
            result.push(value);
        }
    }
    if(is.empty(result)){
        result.push(string);
    }
    return result;
}

object.set= (attributeList, value, element, result) => {
    if(typeof result == 'undefined'){
        result = 'child';
    }
    if(typeof result == 'string' && result !== 'child'){
        if(result === 'root'){
            result = object;
        } else {
            result = object.get(result, object);
        }
    }
    if(typeof attributeList == 'string'){
        attributeList = explode.multi(['.', ':', '->'], attributeList);
    }
    if(is.array(attributeList)){
        attributeList = object.horizontal(attributeList);
    }
    if(!is.empty(attributeList)){
        var index;
        for(index in attributeList){
            var attribute = attributeList[index];
            if(is.set(element[index]) && typeof element[index] == 'object'){
                if(is.empty(attribute) && typeof value == 'object'){
                    var key;
                    for(key in value){
                        var value_value = value[key];
                        element[index][key] = value_value;
                    }
                    return element[index];
                }
                return object.set(attribute, value, element[index], result);
            }
            else if(typeof attribute == 'object'){
                element[index] = {};
                return object.set(attribute, value, element[index], result);
            } else {
                element[index] = value;
            }
        }
    }
    if(result === 'child'){
        return value;
    }
    return result;
};

object.delete = (attributeList, element, parent, key) => {
    if(typeof attributeList == 'string'){
        attributeList = explode.multi(['.', ':', '->'], attributeList);
    }
    if(is.array(attributeList)){
        attributeList = object.horizontal(attributeList);
    }
    if(!is.empty(attributeList)){
        var index;
        for(index in attributeList){
            var attribute = attributeList[index];
            if(is.set(element[index])){
                return object.delete(attribute, element[index], element, index);
            } else {
                return false;
            }
        }
    } else {
        delete parent[key];
        return true;
    }
}

object.horizontal = (verticalArray, value, result) => {
    if(is.empty(result)){
        result = 'object';
    }
    if(is.empty(verticalArray)){
        return false;
    }
    var element = {};
    var last = verticalArray.pop();
    var key;
    for(key in verticalArray){
        var attribute = verticalArray[key];
        if(typeof deep == 'undefined'){ //is_set...
            element[attribute] = {};
            var deep = element[attribute];
        } else {
            deep[attribute] = {};
            deep = deep[attribute];
        }
    }
    if(typeof deep == 'undefined'){
        element[last] = value;
    } else {
        deep[last] = value;
    }
    return element;

}

object.get = (attributeList, element) => {
    if(is.empty(element)){
        return null;
    }
    if(typeof attributeList == 'string'){
        attributeList = explode.multi(['.', ':', '->'], attributeList);
        var key;
        for(key in attributeList){
            if(is.empty(attributeList[key])){
                delete attributeList[key];
            }
        }
    }
    if(is.array(attributeList)){
        attributeList = object.horizontal(attributeList);
    }
    if(is.empty(attributeList)){
        return element;
    }
    var key;
    for (key in attributeList){
        if(is.empty(key)){
            continue;
        }
        var attribute = attributeList[key];
        if(is.set(element[key])){
            return object.get(attributeList[key], element[key]);
        }
    }
    return null;
}

object.has = (attributeList, element) => {
    if(is.empty(element)){
        return false;
    }
    if(typeof attributeList == 'string'){
        attributeList = explode.multi(['.', ':', '->'], attributeList);
        var key;
        for(key in attributeList){
            if(is.empty(attributeList[key])){
                delete attributeList[key];
            }
        }
    }
    if(is.array(attributeList)){
        attributeList = object.horizontal(attributeList);
    }
    if(is.empty(attributeList)){
        return true;
    }
    var key;
    for (key in attributeList){
        if(is.empty(key)){
            continue;
        }
        var attribute = attributeList[key];
        if(is.set(element[key])){
            return object.has(attributeList[key], element[key]);
        }
    }
    return false;
}

export {explode, object}