import EntityLogic from "./EntityLogic";
import CocosAdViewItem from "../../../../moosnowSdk/ui/cocos/CocosAdViewItem";

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


    @property
    public changeView: boolean = false;


    constructor() {
        super();
    }
    private mLogic: CocosAdViewItem = null;
    public willShow(data) {
        super.willShow(data);
        if (!this.mLogic) {
            this.mLogic = moosnow.control.newViewItem()
            this.mLogic.initForm(this);
        }
        this.mLogic.willShow(data);
    }

    public onShow() {
        this.mLogic.onShow();
    }

    public onHide() {
        this.mLogic.onHide();
    }
    public refreshImg(cell) {
        if (this.mLogic)
            this.mLogic.refreshImg(cell);
    }
}

