"use client";

// import * as BABYLON from "@babylonjs/core";
import { Engine, Scene, ArcRotateCamera, TransformNode, Color4, Color3, Vector3, HemisphericLight, CubeTexture, SceneLoader, Quaternion, Axis, PBRMaterial } from '@babylonjs/core';
import React, { useEffect, useRef } from "react";
import "@babylonjs/loaders";

const BabylonViewer = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const engineRef = useRef<Engine | null>(null);
    const sceneRef = useRef<Scene | null>(null);
    const rootRef = useRef<TransformNode | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;

        // 🏎️ **Khởi tạo Babylon Engine**
        const engine = new Engine(canvasRef.current, true, {
            disableWebGL2Support: true, // ⚠ nếu không cần WebGL2
            preserveDrawingBuffer: true,
            stencil: true,
        });
        engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
        engineRef.current = engine;

        const scene = new Scene(engine);
        sceneRef.current = scene;
        scene.clearColor = new Color4(0, 0, 0, 0);

        // 📸 **Tạo Camera**
        const camera = new ArcRotateCamera(
            "camera",
            Math.PI / 4,
            Math.PI / 2,
            3.5,
            new Vector3(0, 1, 0),
            scene
        );
        camera.attachControl(canvasRef.current, true);
        camera.lowerRadiusLimit = 3.5;
        camera.upperRadiusLimit = 20;
        camera.panningSensibility = 0;

        // 👇 Gán lại sau khi attachControl (vì Babylon sẽ tự đổi nó thành 1)
        // ✅ SEO default
        canvas.setAttribute("tabindex", "-1");

        // 💡 **Thêm ánh sáng**
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        light.intensity = 1.2;

        // 🚀 **Tải HDR & EnvironmentTexture song song**
        console.log("🔄 Đang load HDR...");
        const envTexture = CubeTexture.CreateFromPrefilteredData(
            "https://assets.babylonjs.com/environments/environmentSpecular.env",
            scene
        );

        // ⏳ **Chờ cả HDR và EnvironmentTexture load xong**
        Promise.all([
            new Promise((resolve) => envTexture.onLoadObservable.addOnce(() => resolve("✅ CubeTexture Loaded!"))),
        ]).then((messages) => {
            console.log(...messages);
            console.log("✅ HDR đã load xong, bắt đầu load robot...");

            scene.environmentTexture = envTexture;

            // 📌 **Tải mô hình GLB**
            SceneLoader.ImportMesh("", "/models/", "robot.glb", scene, (meshes) => {
                if (meshes.length === 0) return;

                if (meshes.length > 0) {
                    console.log("✅ Robot đã load thành công!");

                    if (rootRef.current) rootRef.current.dispose();

                    const root = new TransformNode("root", scene);
                    rootRef.current = root;
                    meshes.forEach((mesh) => mesh.setParent(root));

                    // 🏗️ **Tính toán kích thước Bounding Box**
                    let min = Vector3.Zero();
                    let max = Vector3.Zero();
                    meshes.forEach((mesh) => {
                        if (mesh.getBoundingInfo) {
                            const bbox = mesh.getBoundingInfo().boundingBox;
                            min = Vector3.Minimize(min, bbox.minimumWorld);
                            max = Vector3.Maximize(max, bbox.maximumWorld);
                        }
                    });

                    // 🎯 **Căn chỉnh kích thước mô hình**
                    const size = max.subtract(min);
                    const center = min.add(size.scale(0.5));
                    const scaleFactor = 2 / Math.max(size.x, size.y, size.z);
                    root.scaling = new Vector3(scaleFactor, scaleFactor, scaleFactor);
                    root.position = new Vector3(-center.x * scaleFactor, -min.y * scaleFactor, -center.z * scaleFactor);
                    root.rotationQuaternion = Quaternion.RotationAxis(Axis.Y, Math.PI / 2);

                    // 🌟 **Thêm hiệu ứng phản chiếu vật liệu**
                    scene.blockMaterialDirtyMechanism = true; // 🚀 Giảm số lần cập nhật vật liệu

                    // 🌟 OPTION 2
                    meshes.forEach((mesh) => {
                        if (mesh.material) {
                            const pbr = mesh.material as PBRMaterial;

                            // 🌟 Kích hoạt phản chiếu môi trường
                            pbr.reflectionTexture = scene.environmentTexture;

                            // 📌 Lấy tên vật liệu
                            const materialName = mesh.material.name.toLowerCase();

                            console.log('materialName materialName:', materialName);

                            switch (true) {
                                case materialName.includes("lambert4"): // 🔹 Các đường viền trên lưng
                                    pbr.albedoColor = new Color3(0.5, 1, 0);
                                    pbr.metallic = 0.15;  // Tăng nhẹ độ kim loại
                                    pbr.roughness = 0.9;  // Giảm độ phản chiếu để trông tự nhiên hơn

                                    break;

                                case materialName.includes("metalshiny"): // 🔹 Phần cổ (xám bạc bóng)
                                    pbr.albedoColor = new Color3(0.2, 0.2, 0.2);
                                    pbr.metallic = 1;
                                    pbr.roughness = 0.02; // Giảm roughness để tăng độ bóng mượt
                                    pbr.clearCoat.isEnabled = true;
                                    pbr.clearCoat.roughness = 0.05;
                                    pbr.clearCoat.intensity = 0.5;
                                    break;

                                case materialName.includes("rubber"): // 🔹 Bàn chân (xám đậm)
                                    pbr.albedoColor = new Color3(0.05, 0.05, 0.05);
                                    pbr.metallic = 0.2;
                                    pbr.roughness = 0.6; // Giảm độ bóng để mô phỏng cao su tốt hơn

                                    break;

                                case materialName.includes("metal"): // 🔹 Phần thân gần cổ (xám kim loại)
                                    pbr.albedoColor = new Color3(0.08, 0.08, 0.08);
                                    pbr.metallic = 0.5;  // Tăng độ kim loại để tạo cảm giác cứng cáp hơn
                                    pbr.roughness = 0.3; // Giảm độ nhám để phản chiếu nhẹ hơn
                                    break;

                                case materialName.includes("lambert1"): // 🔹 Thân chính chứa cả chân
                                    pbr.albedoColor = new Color3(0.65, 0.65, 0.65);
                                    pbr.metallic = 0.1;
                                    pbr.roughness = 0.65;
                                    pbr.clearCoat.isEnabled = true;
                                    pbr.clearCoat.roughness = 0.85; // Giữ nguyên độ mờ nhưng làm cho bóng sáng hơn
                                    pbr.clearCoat.intensity = 0.3;
                                    break;

                                case materialName.includes("pasted_eyes"): // 🔹 Mắt robot (vàng phát sáng)
                                    pbr.emissiveColor = new Color3(1, 1, 0); // Chuyển sang màu vàng sáng hơn
                                    pbr.emissiveIntensity = 10; // Tăng độ sáng hơn nữa để rõ ràng

                                    console.log("🔆 Đã chỉnh màu mắt:", materialName);
                                    break;

                                case materialName.includes("blackglass"): // 🔹 Mặt kính (đen bóng)
                                    pbr.albedoColor = new Color3(0.05, 0.05, 0.05);
                                    pbr.metallic = 1;
                                    pbr.roughness = 0.01; // Giữ nguyên độ mịn

                                    // 🚀 Tăng cường phản chiếu HDR
                                    // let hdrTexture = new BABYLON.HDRCubeTexture("/hdr/glass1.hdr", scene, 128);
                                    pbr.reflectionTexture = envTexture;
                                    pbr.reflectionTexture.level = 1; // Tăng độ phản chiếu để rõ ràng hơn
                                    break;
                            }
                        }
                    });

                    // 🔄 **Tối ưu hiệu suất**
                    scene.freezeActiveMeshes();
                }
            });
        });

        // 🏎️ **Tự động xoay mô hình nhẹ**
        scene.onBeforeRenderObservable.add(() => {
            camera.alpha += 0.004;
        });

        // 🎮 **Render loop**
        engine.runRenderLoop(() => scene.render());

        // 🔚 **Dọn dẹp khi component unmount**
        return () => {
            console.log("🧹 Cleaning up Babylon scene...");
            if (rootRef.current) rootRef.current.dispose();
            if (sceneRef.current) sceneRef.current.dispose();
            if (engineRef.current) engineRef.current.dispose();
            engineRef.current = null;
            sceneRef.current = null;
            rootRef.current = null;
        };
    }, []);

    return (
        <React.Fragment>
            <canvas ref={canvasRef} tabIndex={-1} className="w-full h-full flex justify-center items-center rounded-xl" />
        </React.Fragment>
    );
};

export default BabylonViewer;
