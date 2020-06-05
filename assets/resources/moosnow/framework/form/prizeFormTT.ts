import UIForm from "../../framework/ui/UIForm";

const { ccclass, property } = cc._decorator;

@ccclass
export default class prizeFormTT extends UIForm {

    @property(cc.Node)
    prizeBg1: cc.Node = null;

    @property(cc.Node)
    prizeBg2: cc.Node = null;


    @property(cc.Node)
    btnCancel: cc.Node = null;

    @property(cc.Label)
    txtCoutdown: cc.Label = null;

    @property(cc.Node)
    btnVideo: cc.Node = null;

    @property(cc.Node)
    btnShare: cc.Node = null;

    @property(cc.Node)
    btnReceive: cc.Node = null;

    @property(cc.Node)
    checked: cc.Node = null;

    @property(cc.Node)
    unchecked: cc.Node = null;

    public isMask: boolean = true;

    private mChecked: boolean = false;

    willShow(data) {
        moosnow.control.prizeFormTT.initForm(this);
        moosnow.control.prizeFormTT.willShow(data);
    }

    willHide(data) {
        moosnow.control.prizeFormTT.willHide(data);
    }


}
