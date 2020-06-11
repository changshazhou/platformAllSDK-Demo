
export default class UIForm extends cc.Component {

    /**
     * 是否有渐入渐出效果
     */
    public isPopEffect: boolean = false;
    /**
     * 是否需要蒙层
     */
    public isMask: boolean = false;



    public fullView: boolean = true;
    protected formName: string = "";
    private maskName = "img_mask";
    constructor() {
        super();
        this.formName = "";
    }
    start() {
        if (this.isMask) {
            this.addMask();
        }
    }

    public addMask() {

        if (this.node.getChildByName(this.maskName)) {
            this.node.active = true;
            return;
        }

        let skin = "moosnow/framework/ui/img_mask.png";
        let mask = new cc.Node();
        let sprite = mask.addComponent(cc.Sprite);
        let widget = mask.addComponent(cc.Widget);
        widget.isAlignLeft = widget.isAlignTop = widget.isAlignRight = widget.isAlignBottom = true;
        widget.left = widget.top = widget.right = widget.bottom = 0;
        moosnow.resource.loadAsset(skin, cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(`文件不存在${skin} 请配置一个路径`)
                return;
            }
            sprite.spriteFrame = spriteFrame;
            sprite.type = cc.Sprite.Type.SLICED;
            sprite.spriteFrame.insetBottom = 1;
            sprite.spriteFrame.insetTop = 1;
            sprite.spriteFrame.insetLeft = 1;
            sprite.spriteFrame.insetRight = 1;
            mask.width = this.node.width
            mask.height = this.node.height
            this.node.addChild(mask);
            mask.name = this.maskName;
            mask.zIndex = -1
        })
        mask.on(cc.Node.EventType.TOUCH_START, this.onMaskMouseDown, this)
    }

    public removeMask() {
        if (this.node.getChildByName(this.maskName)) {
            this.node.active = false;
            return;
        }
    }

    private onMaskMouseDown(e: cc.Event.EventTouch) {
        e.stopPropagation();
    }
    /**
    * 隐藏UIForm
    */
    hide() {
        // MLF.UI.destroyUIForm(this.formName)
    }

    private mFormData: any;
    /**
     * 父类缓存willShow，onShow传递到实体的逻辑数据
     */
    public get FormData() {
        return this.mFormData;
    }
    willShow(data?) {
        this.mFormData = data;
    }

    onShow(data) {

    }

    willHide(data) {

    }

    onHide(data) {

    }

    onEnable() {
    }

    onDisable() {
    }

    hideAnim(cb) {
        cb();
    }
}
