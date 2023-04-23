var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(80, WIDTH / HEIGHT);
camera.position.z = 4.5;
camera.position.x = -1.2;
camera.position.y = 2;

camera.rotation.set(0, -0.5, 0);
scene.add(camera);
//Aplicacion de luz 
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-1, 2, 4);
scene.add(light);

const color = [0x4404f6,0x4F9543];



var controls = new THREE.OrbitControls(camera, renderer.domElement);
//Se parametriza como variables globales l
//l: Lado del cubo 
//brazo: num de brazos

lado=1;
n = 2;
brazo = [];
alfa= Math.PI/4;

function elementos(x, y, z, color){
  const figura = new THREE.BoxGeometry(x, y, z);
  const material = new THREE.MeshPhongMaterial({color: color})
  return new THREE.Mesh(figura, material);

}

for(let i=0; i< n; i++){
    brazo[i] = elementos( lado/8, lado, lado/8, color[i]);
    scene.add(brazo[i]);
}
/**
 * rotacion: El brazo indicado va rotar al rededor de un eje que desee el usuario

 */
function rotation(bra, tb, tan, tal) {
  bra.rotation.x = tb;
  bra.rotation.y = tan;
  bra.rotation.z = tal;

}
/**
 traslacion: El brazo indicado va a trasladarse en la posicion que desee el usuario
 */
function traslacion(bra, b, an, al){
  bra.position.x = b;
  bra.position.y = an;
  bra.position.x = al;

}


const size = 150;
const divisions = 160;
//Creación de ejes
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

//Creacion de la grilla
const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

traslacion(brazo[0],0,lado/2,0);
traslacion(brazo[1],0, 3*lado/2,0);
rotation(brazo[1],0,0, Math.PI-alfa);

//Funcion para renderizar
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();