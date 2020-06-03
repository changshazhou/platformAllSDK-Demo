import EntityLogic from "../entity/EntityLogic";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AdViewItem extends EntityLogic {


    @property(cc.Sprite)
    public logo: cc.Sprite = null;
    @property(cc.Label)
    public title: cc.Label = null;
    @property(cc.Sprite)
    public animLogo: cc.Sprite = null;
    @property(cc.Sprite)
    public nameBg: cc.Sprite = null;
    @property()
    public changeView: boolean = false;


    constructor() {
        super();
    }
    public start() {

    }
    private logic: any;
    willShow(data) {
        super.willShow(data);
        if (!this.logic)
            this.logic = moosnow.control.newViewItem();
        this.logic.initProperty(this);
        this.logic.initItem();
        this.logic.willShow(data);
    }
    onShow() {
        if (this.logic)
            this.logic.onShow();
    }

    onHide() {
        if (this.logic)
            this.logic.onHide();
    }

    refreshImg(cell) {
        if (this.logic)
            this.logic.refreshImg(cell);
    }

}
