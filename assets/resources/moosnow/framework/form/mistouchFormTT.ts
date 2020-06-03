import UIForm from "../ui/UIForm";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MistouchFormTT extends UIForm {

    @property(cc.ProgressBar)
    clickProgress: cc.ProgressBar = null;

    @property(cc.Node)
    btnReceive: cc.Node = null;

    @property(cc.Node)
    btnConfirm: cc.Node = null;

    @property(cc.Sprite)
    checked: cc.Sprite = null;

    @property(cc.Sprite)
    unchecked: cc.Sprite = null;

    @property(cc.Node)
    step1: cc.Node = null;

    @property(cc.Node)
    step2: cc.Node = null;

    @property(cc.Node)
    logo: cc.Node = null;


    willShow(data) {
        moosnow.control.mistouchFormTT.initProperty(this);
        moosnow.control.mistouchFormTT.willShow(data);
    }
    willHide(data) {
        moosnow.control.mistouchFormTT.willHide();

    }

    update() {
        moosnow.control.mistouchFormTT.update();
    }

}
