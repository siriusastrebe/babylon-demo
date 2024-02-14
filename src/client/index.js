import { io } from "socket.io-client";
import jsynchronous from 'jsynchronous/jsynchronous-client.js';

const socket = io();

console.log(jsynchronous);

jsynchronous.send = (data) => socket.emit('msg', data);
socket.on('msg', (data) => jsynchronous.onmessage(data));

const $ynced = jsynchronous('object');
$ynced.$on('changes', (event) => {
  console.log('change', event);
});

// init
const canvas = document.getElementById("renderCanvas"); // Getgg the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createScene = function () {
  const scene = new BABYLON.Scene(engine);

  BABYLON.MeshBuilder.CreateBox("box", {});

  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

  return scene;
};

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});