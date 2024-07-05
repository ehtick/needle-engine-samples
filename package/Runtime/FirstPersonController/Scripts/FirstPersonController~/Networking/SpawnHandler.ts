import { Behaviour, GameObject, Gizmos, RaycastOptions, delayForFrames, getParam, getTempQuaternion, getTempVector, serializable } from "@needle-tools/engine";
import { Vector3, Object3D, Ray, Layers } from "three";
import { FirstPersonController } from "../FirstPersonCharacter";
import { MobileControls } from "../MobileControls";

const debug = getParam("debugspawnhandler")

export class SpawnHandler extends Behaviour {

    //array of Object3D
    @serializable(Object3D)
    spawnPoints: Object3D[] = [];

    @serializable(MobileControls)
    mobileControls?: MobileControls;

    private downVector = new Vector3(0, -1, 0);

    async handlePlayerSpawn(obj: GameObject) {
        // HACK: delay for one frame since otherwise the newly created collider gets read back and overrides any value we set to the object
        await delayForFrames(1); 

        //shuffle spawnspots
        this.spawnPoints.sort(() => Math.random() - 0.5);

        const options = new RaycastOptions();
        options.layerMask = new Layers();
        options.layerMask.enableAll();
        options.ray = new Ray(new Vector3(), this.downVector.clone());
        options.maxDistance = 2;

        // Choose a random spawn point that is not occupied
        let spot: Object3D | undefined;

        for (let i = 0; i < this.spawnPoints.length; i++) {
            const element = this.spawnPoints[i];

            element.getWorldPosition(options.ray.origin);
            options.ray.origin.y += 3;

            options.ray.direction.copy(this.downVector);

            if (debug)
                Gizmos.DrawLine(options.ray.origin, options.ray.origin.clone().add(options.ray.direction.clone().multiplyScalar(options.maxDistance)), 0xff0000, 50, true);

            const result = this.context.physics.raycast(options);

            if (result.length == 0) {
                spot = element;
                break;
            }
        }

        // If there is no valid spawn point, set world 0,0,0
        if (spot && obj) {
            obj.worldPosition = spot.getWorldPosition(getTempVector());
            obj.worldQuaternion = spot.getWorldQuaternion(getTempQuaternion());
        }

        // hook touch controls to the spawned player
        const player = (obj as GameObject)?.getComponent(FirstPersonController);
        if (player && this.mobileControls) {
            this.mobileControls.onLook.addEventListener(v => player.look(v));
            this.mobileControls.onMove.addEventListener(v => player.move(v));
            this.mobileControls.onJump.addEventListener(() => player.jump());
        }
    }
}