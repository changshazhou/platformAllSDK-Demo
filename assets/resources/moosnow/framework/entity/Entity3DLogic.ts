import { EntityData } from "./EntityData";
import { Utils3D } from "../../utils/Utils3D";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Entity3DLogic extends cc.Component {
    constructor() { super(); }

    // public static poolName: string = "this is 3d login pool name";
    // public static url: string = "this is 3d login static url";

    public url: string = "";
    public poolName: string = "";
    public collisionStay: boolean = false;
    // public get url() {
    //     return this.mUrl
    // }
    // public get poolName() {
    //     return this.mPoolName
    // }
    // public set poolName(value) {
    //     this.mUrl = value;
    // }

    private mLogicData: EntityData;
    /**
     * 父类缓存willShow，onShow传递到实体的逻辑数据
     */
    public get LogicData() {
        return this.mLogicData;
    }
    willShow(data?: EntityData) {
        let target = (this.node as cc.Node);
        if (data) {
            if (data.position) {
                Utils3D.position(target, data.position.x, data.position.y, data.position.z);
                // Utils3D.positionZ(target, data.position.z);
            }

            if (data.rotation)
                Utils3D.rotation(target, data.rotation.x, data.rotation.y, data.rotation.z);
            if (data.scale)
                Utils3D.scale(target, data.scale.x, data.scale.y, data.scale.z);
        }

        this.mLogicData = data;
    }
    onShow(data?: EntityData) {



    }
    /**
     * 框架更新
     * @param {*} dt 
     */
    onFwUpdate(dt?) { }
    willHide(data?) { }
    onHide(data?) { }
    /**
     * 碰撞回调
     */
    onCollision(other: Entity3DLogic) {

    }
    onDisable() {
    }
}