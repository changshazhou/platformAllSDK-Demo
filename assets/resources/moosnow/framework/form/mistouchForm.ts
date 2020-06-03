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

    public isMask: boolean = true;

    willShow(data) {
        moosnow.control.mistouchForm.initProperty(this);
        moosnow.control.mistouchForm.willShow(data);
    }
    willHide(data) {
        moosnow.control.mistouchForm.willHide();

    }

    update() {
        moosnow.control.mistouchForm.update();
    }

}
