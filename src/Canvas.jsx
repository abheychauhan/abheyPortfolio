import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { div } from "three/tsl";

gsap.registerPlugin(ScrollTrigger);

function Canvas() {
  const canvasRef = useRef();
  const modelRef = useRef();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const isMobile = window.innerWidth < 600;


  useEffect(() => {
    // Loading manager
    const manager = new THREE.LoadingManager();
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const percent = (itemsLoaded / itemsTotal) * 100;
      setProgress(Math.round(percent));
    };
    manager.onLoad = () => setLoading(false);

    const textureLoader = new THREE.TextureLoader(manager);
    const gltfLoader = new GLTFLoader(manager);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#ff861a");

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const initialCameraPos = new THREE.Vector3(11.47, 0, 11.04);
    camera.position.copy(initialCameraPos);
    scene.add(camera);

    // Lights
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(90, 80, 50);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(4096, 4096);
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 500;
    dirLight.shadow.camera.left = -50;
    dirLight.shadow.camera.right = 50;
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.camera.bottom = -50;
    dirLight.shadow.radius = 12;
    scene.add(dirLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    // Ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(300, 300),
      new THREE.ShadowMaterial({ opacity: 0.23 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -18;
    ground.receiveShadow = true;
    scene.add(ground);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 2;
    controls.maxDistance = 100;

    // Detect mobile
    controls.enabled = !isMobile;
    canvas.style.touchAction = isMobile ? "pan-y" : "none";

    // Camera start position for gsap reset
    const startCameraPos = camera.position.clone();
    controls.addEventListener("start", () => startCameraPos.copy(camera.position));
    controls.addEventListener("end", () => {
      gsap.to(camera.position, {
        x: startCameraPos.x,
        y: startCameraPos.y,
        z: startCameraPos.z,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => controls.update(),
      });
    });

    // Responsive camera & model
    const setResponsiveCameraAndModel = () => {
      if (!modelRef.current) return;
      const width = window.innerWidth;
      if (width < 600) {
        camera.position.set(15, 5, 20);
        modelRef.current.position.set(1, -5, 0);
        modelRef.current.scale.set(0.4, 0.4, 0.4);
      } else if (width < 1024) {
        camera.position.set(11.47, 0, 11.04);
        modelRef.current.position.set(1, -13, 0);
        modelRef.current.scale.set(0.7, 0.7, 0.7);
      } else {
        camera.position.set(11.47, 0, 11.04);
        modelRef.current.position.set(0, -17, 0);
        modelRef.current.scale.set(0.9, 0.9, 0.9);
      }
    };

    // Load model
    gltfLoader.load("/ibm_3278_terminal/scene.gltf", (gltf) => {
      const model = gltf.scene;
      modelRef.current = model;

      setResponsiveCameraAndModel();
      modelRef.current.rotation.y = -0.8;

      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.name === "ibm_3278_1") {
            child.visible = false;
            const screenTexture = textureLoader.load("/profileImage.png");
            const screenPlane = new THREE.Mesh(
              new THREE.PlaneGeometry(4.4, 4.3),
              new THREE.MeshPhysicalMaterial({
                map: screenTexture,
                emissive: new THREE.Color(0xffffff),
                emissiveMap: screenTexture,
                emissiveIntensity: 0.8,
                roughness: 0.2,
                metalness: 0.0,
                clearcoat: 1.0,
                clearcoatRoughness: 0.05,
                transparent: true,
                side: THREE.DoubleSide,
              })
            );
            screenPlane.position.set(1.55, 0, 5.5);
            screenPlane.rotation.y = Math.PI * 0.5;
            screenPlane.rotation.x = Math.PI * 0.5;
            screenPlane.scale.setScalar(1.2);
            child.parent.add(screenPlane);
          }
        }
      });

      scene.add(model);

     if(!isMobile){
            // GSAP scroll animation
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".wrap",
          start: "top top",
          end: "+=1000",
          scrub: 1.2,
          anticipatePin: 1,
          pin: !isMobile, // pin only on desktop
        },
      });

      timeline.to(camera.position, {
        x: 30,
        y: 15,
        z: 60,
        ease: "power1.inOut",
        duration: 30,
      });
      timeline.to(
        model.rotation,
        { y: 4.8, ease: "power1.inOut", duration: 30 },
        1
      );
      timeline.to(modelRef.current.position, { x: 10, y: 6, z: -10, duration: 30 });
   
     }
      });

    // Resize
    window.addEventListener("resize", () => {
      const isMobile = window.innerWidth < 600;
      controls.enabled = !isMobile;
      canvas.style.touchAction = isMobile ? "pan-y" : "none";
      setResponsiveCameraAndModel();

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      ScrollTrigger.refresh();
      if(!isMobile){
        window.location.reload()
      }
    });

    // Render loop
    const renderLoop = () => {
      requestAnimationFrame(renderLoop);
      controls.update();
      renderer.render(scene, camera);
    };
    renderLoop();
  }, []);

  return (
    <div id="home">
      <div style={{ width: "100vw", height: "250vh" }}>
        {loading && (
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#ff861a] text-white z-[99]">
            <p className="text-xl font-bold">Loading... {progress}%</p>
            <div className="w-64 h-2 bg-white/30 rounded mt-4">
              <div
                className="h-full bg-white rounded"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
{isMobile && (
  <div id="about"  className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[1] text-[#ff861a] bg-zinc-200 rounded-xl w-fit flex items-center justify-center p-2">
    <h1 className="text-sm mr-1">scroll</h1>
    <h1><i className="ri-arrow-down-line text-xl"></i></h1>
  </div>
)}

        <canvas
          ref={canvasRef}
          className="canvas fixed block w-[100%] h-[250%]"
        />
        <div className="wrap z-[-1] w-[100%] h-[100%]"></div>
      </div>
    </div>
  );
}

export default Canvas;
