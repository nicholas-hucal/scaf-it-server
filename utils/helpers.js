exports.createComponentName = (name) => {
    return name.split('-').map(piece => exports.capitalize(piece)).join('');
}

exports.capitalize = string => {
    return string[0].toUpperCase() + string.slice(1);
}