export default class EntityLogic extends cc.Component {

    constructor() {
        super();
    }
    public poolName: string = "";
    onEnable() {
    }
    start() {

    }
    private mLogicData: any;
    /**
     * 父类缓存willShow，onShow传递到实体的逻辑数据
     */
    public get LogicData() {
        return this.mLogicData;
    }
    willShow(data?) {
        this.mLogicData = data;
        if (data) {
            if (data.x)
                this.node.x = data.x
            if (data.y)
                this.node.y = data.y
        }
    }
    onShow(data?) { }
    /**
     * 框架更新
     * @param {*} dt 
     */
    onFwUpdate(delta) { }
    willHide(data?) { }
    onHide(data?) { }
    /**
     * 碰撞回调
     */
    onCollision(other: EntityLogic) {

    }
    unuse() {
    }
    reuse() {
    }
    pause() {
    }
    resume() {
    }
    onDisable() {
    }
}