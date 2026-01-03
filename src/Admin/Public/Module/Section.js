let getSection = (id) => {
    return select('section[id="' +  id +'"]');
}

let getSectionById = (id) => {
    return select('section[id="' +  id +'"]');
}

let getSectionByName = (name) => {
    return select('section[name="' +  name +'"]');
}

export {
    getSection,
    getSectionById,
    getSectionByName
};