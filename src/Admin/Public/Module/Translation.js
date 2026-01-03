import { object } from "/Module/Object.js";
let translation = {};

translation.data = {
    data : {
        default : {
            language : "en"
        }
    },
    set : (attribute, value) => {
        if(typeof attribute === 'object'){
            for(let attr in attribute){
                if(typeof attribute[attr] === 'object'){
                    for(let language in attribute[attr]){
                        if(typeof attribute[attr][language] === 'object'){
                            for(let key in attribute[attr][language]){
                                object.set(attr + '.' + language + '.' + key, attribute[attr][language][key], translation.data.data);
                            }
                        } else {
                            object.set(attr + '.' + language, attribute[attr][language], translation.data.data);
                        }
                    }
                } else {
                    object.set(attr, attribute[attr], translation.data.data);
                }
            }
        } else {
            object.set(attribute, value, translation.data.data);
        }
    },
    get : (attribute) => {
        return object.get(attribute, translation.data.data);
    },
    delete : (attribute) => {
        return object.delete(attribute, translation.data.data);
    }
};

translation.import = (data) => {
    translation.data.set(data);
}

const language = (language) => {
    if(!is.empty(language)){
        translation.data.set('language', language);
    }
    return translation.data.get('language');
}

const default_language = (language) => {
    if (!is.empty(language)) {
        translation.data.set('default.language', language);
    }
    return translation.data.get('default.language');
}

const __ = (attribute, lang) =>{
    if(is.empty(lang)){
        lang = language();
    }
    let result = translation.data.get('translation.' + lang + '.' + attribute);
    if(result === null){
        result = translation.data.get('translation.' + default_language() + '.' + attribute);
    }
    if(result === null){
        result = attribute;
    }
    return result;
}

export {
    __,
    default_language,
    language,
    translation
};