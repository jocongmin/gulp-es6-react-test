require("babel-polyfill");
let getData = () => {
    return 'kjhkjh'
}
let b = async function() {
    var bi = getData();
    return await bi;
}
b().then(v => {
    console.log(v);
})
