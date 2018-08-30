const width = 1024, height = 600;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

var keyboard = {};
var player = {height: 1.8, speed: 0.2, turnSpeed: Math.PI * 0.02};

function create(){
    camera.position.set(0, player.height, -5)
    camera.lookAt(new THREE.Vector3(0, player.height, 0));

    // SkyBox
    var imagePrefix = "skybox/";
    var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
    var imageSuffix = ".png";
    
    var materialArray = [];
    for (var i = 0; i < 6; i++)
    materialArray.push( new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
    side: THREE.BackSide
    }));
    
    var skyGeometry = new THREE.CubeGeometry( 500, 500, 500 );
    var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
    var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
    skyBox.rotation.x += Math.PI / 2;
    skyBox.receiveShadow = true;
	skyBox.castShadow = true;
    scene.add( skyBox );

    // Box
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshPhongMaterial({color:0xff4444, wireframe: false})
    );
    box.position.y += 0.5; 
    box.receiveShadow = true;
	box.castShadow = true;
    scene.add(box);
    
    // Cylinder
    const cylinder = new THREE.Mesh(
        new THREE.ConeGeometry(1, 1, 10),
        new THREE.MeshPhongMaterial({color:0xff4444, wireframe: false})
    );
    cylinder.position.y += 0.5;
    cylinder.position.x += 2;
    cylinder.receiveShadow = true;
    cylinder.castShadow = true;
    scene.add(cylinder);

    // Floor
    const meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry( 10, 10, 10, 10 ),
        new THREE.MeshPhongMaterial( {color: 0xffffff} )
    );
    meshFloor.rotation.x -= Math.PI / 2;
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    light = new THREE.PointLight(0xffffff, 0.8, 18);
    light.position.set(-3, 6, -3);
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 25;
    scene.add(light);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    // Shadow settings
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;

    document.body.appendChild(renderer.domElement);

    render();
}

function render(){
    requestAnimationFrame(render);

    if(keyboard[87]){ camera.position.x -= Math.sin(camera.rotation.y) * player.speed; camera.position.z -= -Math.cos(camera.rotation.y) * player.speed; }
	if(keyboard[83]){ camera.position.x += Math.sin(camera.rotation.y) * player.speed; camera.position.z += -Math.cos(camera.rotation.y) * player.speed; }
	if(keyboard[65]){ camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed; camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed; }
	if(keyboard[68]){ camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed; camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed; }
	if(keyboard[37]){ camera.rotation.y -= player.turnSpeed; }
	if(keyboard[39]){ camera.rotation.y += player.turnSpeed; }

    renderer.render(scene, camera);
}

function keyDown(event){ keyboard[event.keyCode] = true; }
function keyUp(event){ keyboard[event.keyCode] = false; }

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = create;