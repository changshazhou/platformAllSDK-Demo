import UIForm from "../../framework/ui/UIForm";


const { ccclass, property } = cc._decorator;

@ccclass
export default class MistouchForm extends UIForm {

    @property(cc.ProgressBar)
    clickProgress: cc.ProgressBar = null;

    @property(cc.Node)
    btnBanner: cc.Node = null;

    @property(cc.Node)
    logo: cc.Node = null;


    @property(cc.Node)
    hand: cc.Node = null;

    @property(cc.SpriteFrame)
    pinch1: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    pinch2: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    pinch3: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    pinch4: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    pinch5: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    pinch6: cc.SpriteFrame = null;

    public isMask: boolean = true;

    willShow(data) {
        moosnow.control.mistouchFormQQ.initProperty(this);
        moosnow.control.mistouchFormQQ.willShow(data);
    }
    willHide(data) {
        moosnow.control.mistouchFormQQ.willHide();

    }

    update() {
        moosnow.control.mistouchFormQQ.update();
    }

}

