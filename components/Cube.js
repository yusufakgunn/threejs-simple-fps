/*
 * Create Cube
 * createCube([scaleX], [scaleY], [scaleZ], [ { color: 0xFFFFFFFF, wireframe: false } ] );
*/
function yarat(){
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0xFFFFFFFF, wireframe: false } )
    var cube = new THREE.Mesh( geometry, material );
    return(cube);
}
